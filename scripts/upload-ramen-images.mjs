import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) {
      process.env[key] = val
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vl1kxcdg'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19'

async function resolveSanityClient() {
  const explicitToken =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
  if (explicitToken) {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      token: explicitToken,
      useCdn: false,
    })
  }

  try {
    const { getCliClient } = await import('sanity/cli')
    const cliClient = getCliClient({ apiVersion, projectId, dataset })
    if (cliClient.config().token) {
      return cliClient
    }
  } catch {
    // ignore
  }

  console.error(
    'Missing Sanity write credentials! Run via: npx sanity exec scripts/upload-ramen-images.mjs --with-user-token'
  )
  process.exit(1)
}

function extractHexPlaceId(url) {
  if (!url) return null
  const m = url.match(/!1s(0x[0-9a-fA-F]+:0x[0-9a-fA-F]+)/)
  return m ? m[1].toLowerCase() : null
}

async function main() {
  const scratchDir =
    process.env.NOTION_SCRATCH_DIR ||
    path.resolve(process.cwd(), 'scripts/data/notion-scratch')
  const imagesJsonPath = path.join(scratchDir, 'notion-ramen-images.json')
  const resolvedJsonPath = path.join(scratchDir, 'notion-ramen-resolved.json')
  const dataPath = path.resolve(
    process.cwd(),
    'scripts/data/imported-places.json'
  )

  const notionImageRows = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'))
  const notionResolvedRows = JSON.parse(
    fs.readFileSync(resolvedJsonPath, 'utf8')
  )
  const listDocs = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  const client = await resolveSanityClient()

  // Map Notion id -> hex placeId from resolvedUrl
  const placeIdByNotionId = new Map()
  for (const r of notionResolvedRows) {
    const pid = extractHexPlaceId(r.resolvedUrl)
    if (pid) {
      placeIdByNotionId.set(String(r.id), pid)
    }
  }

  const ramenDoc = listDocs.find(
    (d) => d._id === 'placeList-erics-ramen-review'
  )
  const taiwanDoc = listDocs.find(
    (d) => d._id === 'placeList-erics-good-eats-taiwan'
  )

  if (!ramenDoc) {
    throw new Error('Could not find placeList-erics-ramen-review in imported-places.json')
  }

  let totalUploaded = 0
  let ramenSpotsUpdated = 0
  let taiwanSpotsSynced = 0

  for (const row of notionImageRows) {
    if (!Array.isArray(row.images) || row.images.length === 0) continue

    const idStr = String(row.id)
    const targetKey = `ramen-${idStr}`
    const ramenItem = ramenDoc.places.find((p) => p._key === targetKey)
    if (!ramenItem) {
      console.warn(`  ! Warning: no placeItem found for ${targetKey} (${row.name})`)
      continue
    }

    const sanityImages = []
    for (let i = 0; i < row.images.length; i++) {
      const img = row.images[i]
      console.log(
        `  ↓ Downloading [${row.name}] image ${i + 1}/${row.images.length}...`
      )
      const res = await fetch(img.signedUrl)
      if (!res.ok) {
        throw new Error(
          `Failed to download image for ${row.name} (HTTP ${res.status})`
        )
      }
      const contentType = res.headers.get('content-type') || 'image/jpeg'
      const ext = contentType.includes('png')
        ? 'png'
        : contentType.includes('webp')
          ? 'webp'
          : 'jpg'
      const filename = `ramen-${idStr}-${i + 1}.${ext}`
      const buffer = Buffer.from(await res.arrayBuffer())

      console.log(
        `  ↑ Uploading ${filename} (${(buffer.length / 1024).toFixed(1)} KB) to Sanity...`
      )
      const asset = await client.assets.upload('image', buffer, {
        filename,
        contentType,
      })

      sanityImages.push({
        _key: `img-${idStr}-${i + 1}`,
        _type: 'image',
        ...(img.caption && img.caption.trim()
          ? { alt: img.caption.trim() }
          : {}),
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      })
      totalUploaded++
    }

    ramenItem.images = sanityImages
    ramenSpotsUpdated++

    // Also sync to matching spot in Eric's Good Eats in Taiwan if present
    const hexPid = placeIdByNotionId.get(idStr)
    if (hexPid && taiwanDoc) {
      for (const twItem of taiwanDoc.places) {
        const twPid = extractHexPlaceId(twItem.externalUrl)
        if (twPid && twPid === hexPid) {
          twItem.images = sanityImages.map((im) => ({
            ...im,
            _key: `tw-${im._key}`,
          }))
          taiwanSpotsSynced++
          console.log(
            `  ⇄ Synced ${sanityImages.length} photo(s) to Taiwan list item "${twItem.name}"`
          )
        }
      }
    }
  }

  // Persist updated imported-places.json so future imports keep asset _refs
  fs.writeFileSync(dataPath, JSON.stringify(listDocs, null, 2) + '\n', 'utf8')
  console.log(`\nSaved updated ${dataPath}`)

  // Push updated documents to Sanity
  for (const doc of listDocs) {
    await client.createOrReplace(doc)
    console.log(
      `  ✓ Updated ${doc.emoji} ${doc.title} (/places/${doc.slug.current})`
    )
  }

  console.log(
    `\nDone! Uploaded ${totalUploaded} images across ${ramenSpotsUpdated} ramen spots (and synced to ${taiwanSpotsSynced} matching Taiwan list spots).`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
