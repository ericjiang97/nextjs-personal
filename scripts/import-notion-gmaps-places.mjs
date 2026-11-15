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
    'Missing Sanity write credentials! Run via: npx sanity exec scripts/import-notion-gmaps-places.mjs --with-user-token'
  )
  process.exit(1)
}

const dataPath = path.resolve(
  process.cwd(),
  'scripts/data/imported-places.json'
)
const LIST_DOCS = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

async function main() {
  const client = await resolveSanityClient()
  console.log(
    `Importing ${LIST_DOCS.length} curated place lists into Sanity (${projectId}/${dataset})...`
  )
  for (const doc of LIST_DOCS) {
    await client.createOrReplace(doc)
    console.log(
      `  ✓ ${doc.emoji} ${doc.title} (/places/${doc.slug.current}) — ${doc.places.length} places`
    )
  }
  console.log('Import complete!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
