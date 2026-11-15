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

  console.error(`
Missing Sanity write credentials!

Run ONE of the following:
  Option A (uses your browser login):
    npx sanity login
    npm run seed:places:cli

  Option B (using an Editor API token in .env.local):
    Add SANITY_API_WRITE_TOKEN=<your_editor_token> to .env.local, then run:
    npm run seed:places
`)
  process.exit(1)
}

const STARTER_DOCS = [
  {
    _id: 'placeList-japan-cities-eats',
    _type: 'placeList',
    title: 'Japan Cities & Late-Night Eats',
    slug: { _type: 'slug', current: 'japan-cities-late-night-eats' },
    emoji: '🍜',
    description:
      'Favourite ramen counters, historic markets, and neighbourhoods across Tokyo & Kyoto.',
    ownerName: 'Eric Jiang',
    coverTheme: 'amber',
    sortBy: 'manual',
    cardStyle: 'detailed',
    customTags: ['restaurant', 'city', 'ramen', 'late-night', 'temples'],
    unlisted: false,
    sharingPaused: false,
    hideNotesOnShare: false,
    order: 1,
    places: [
      {
        _key: 'p-tokyo',
        _type: 'placeItem',
        name: 'Tokyo',
        subtitle: 'Capital metropolis · Kanto, Japan',
        address: 'Tokyo, Japan',
        country: 'Japan',
        lat: 35.6764,
        lng: 139.65,
        primaryTag: 'city',
        tags: ['city', 'food-capital', 'basecamp'],
        notes: 'Stay near Shibuya or Shinjuku for easy Yamanote line access.',
        rating: 5,
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Tokyo%2C%20Japan',
      },
      {
        _key: 'p-ichiran',
        _type: 'placeItem',
        name: 'Ichiran Shibuya',
        subtitle: 'Tonkotsu Ramen · Shibuya, Tokyo',
        address: '1-22-7 Jinnan, Shibuya-ku, Tokyo',
        country: 'Japan',
        lat: 35.6612,
        lng: 139.701,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'ramen', 'late-night'],
        notes: 'Order extra garlic + medium richness! Open late after flights.',
        rating: 5,
        cuisine: 'Japanese Ramen',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Ichiran%20Shibuya%2C%20Tokyo',
      },
      {
        _key: 'p-gyukatsu',
        _type: 'placeItem',
        name: 'Gyukatsu Motomura Shinjuku',
        subtitle: 'Crispy Beef Cutlet · Shinjuku, Tokyo',
        address: '3-32-2 Shinjuku, Tokyo',
        country: 'Japan',
        lat: 35.6901,
        lng: 139.7032,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'wagyu', 'must-try'],
        notes: 'Sear each slice to perfection on the personal stone grill.',
        rating: 5,
        cuisine: 'Japanese Katsu',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Gyukatsu%20Motomura%20Shinjuku',
      },
      {
        _key: 'p-kyoto',
        _type: 'placeItem',
        name: 'Kyoto',
        subtitle: 'Historic cultural heart · Kansai, Japan',
        address: 'Kyoto Prefecture, Japan',
        country: 'Japan',
        lat: 35.0116,
        lng: 135.7681,
        primaryTag: 'city',
        tags: ['city', 'temples', 'walkable'],
        notes:
          '2h15m Shinkansen ride from Tokyo Station. Early mornings in Gion & Kiyomizu-dera!',
        rating: 5,
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Kyoto%2C%20Japan',
      },
      {
        _key: 'p-nishiki',
        _type: 'placeItem',
        name: 'Nishiki Warai',
        subtitle: 'Okonomiyaki & Teppan · Nishiki Market, Kyoto',
        address: 'Nishikikoji-dori, Nakagyo Ward, Kyoto',
        country: 'Japan',
        lat: 35.005,
        lng: 135.7649,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'street-food', 'market'],
        notes: 'Great table grilling for groups right inside Nishiki Market.',
        rating: 4,
        cuisine: 'Okonomiyaki',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Nishiki%20Warai%20Kyoto',
      },
    ],
  },
  {
    _id: 'placeList-melbourne-coffee-eats',
    _type: 'placeList',
    title: 'Melbourne Coffee & Laneway Gems',
    slug: { _type: 'slug', current: 'melbourne-coffee-laneways' },
    emoji: '☕',
    description:
      'Essential specialty espresso bars, bakeries, and late-night CBD dining back home in Melbourne.',
    ownerName: 'Eric Jiang',
    coverTheme: 'violet',
    sortBy: 'manual',
    cardStyle: 'detailed',
    customTags: ['cafe', 'restaurant', 'coffee', 'pastry', 'melbourne'],
    unlisted: false,
    sharingPaused: false,
    hideNotesOnShare: false,
    order: 2,
    places: [
      {
        _key: 'p-patricia',
        _type: 'placeItem',
        name: 'Patricia Coffee Brewers',
        subtitle: 'Standing-Room Espresso Bar · Melbourne CBD',
        address: 'Rear of 493-495 Little Bourke St, Melbourne VIC',
        country: 'Australia',
        lat: -37.8142,
        lng: 144.9589,
        primaryTag: 'cafe',
        tags: ['cafe', 'coffee', 'laneway', 'melbourne'],
        notes:
          'Order the magic or filter flight — tucked down Little Bourke & Little William.',
        rating: 5,
        cuisine: 'Specialty Coffee',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Patricia%20Coffee%20Brewers%20Melbourne',
      },
      {
        _key: 'p-lune',
        _type: 'placeItem',
        name: 'Lune Croissanterie Fitzroy',
        subtitle: 'Architectural Pastries · Fitzroy, Melbourne',
        address: '119 Rose St, Fitzroy VIC 3065',
        country: 'Australia',
        lat: -37.7959,
        lng: 144.9781,
        primaryTag: 'cafe',
        tags: ['cafe', 'pastry', 'bakery', 'must-try'],
        notes:
          'Classic beurre croissant or almond croissant fresh out of the oven.',
        rating: 5,
        cuisine: 'Artisanal Viennoiserie',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Lune%20Croissanterie%20Fitzroy',
      },
      {
        _key: 'p-chin-chin',
        _type: 'placeItem',
        name: 'Chin Chin',
        subtitle: 'Modern Southeast Asian · Flinders Lane, Melbourne',
        address: '125 Flinders Ln, Melbourne VIC 3000',
        country: 'Australia',
        lat: -37.8156,
        lng: 144.9703,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'laneway', 'dinner', 'lively'],
        notes: 'Kingfish sashimi and caramelised sticky pork are staples.',
        rating: 4,
        cuisine: 'Southeast Asian',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Chin%20Chin%20Flinders%20Lane%20Melbourne',
      },
    ],
  },
  {
    _id: 'placeList-euro-summer',
    _type: 'placeList',
    title: 'European Sun & Bistro Trail',
    slug: { _type: 'slug', current: 'european-sun-bistro-trail' },
    emoji: '🌊',
    description:
      'Sun-drenched coastal cities, historic brasseries, and seafood spots worth flying for.',
    ownerName: 'Eric Jiang',
    coverTheme: 'cyan',
    sortBy: 'manual',
    cardStyle: 'detailed',
    customTags: ['restaurant', 'city', 'seafood', 'bistro', 'sunset'],
    unlisted: false,
    sharingPaused: false,
    hideNotesOnShare: false,
    order: 3,
    places: [
      {
        _key: 'p-lisbon',
        _type: 'placeItem',
        name: 'Lisbon',
        subtitle: 'Coastal hillside capital · Portugal',
        address: 'Lisbon, Portugal',
        country: 'Portugal',
        lat: 38.7223,
        lng: -9.1393,
        primaryTag: 'city',
        tags: ['city', 'coastal', 'sunset'],
        notes: 'Catch sunset at Miradouro de Santa Catarina.',
        rating: 5,
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Lisbon%2C%20Portugal',
      },
      {
        _key: 'p-ramiro',
        _type: 'placeItem',
        name: 'Cervejaria Ramiro',
        subtitle: 'Iconic Seafood · Intendente, Lisbon',
        address: 'Av. Almirante Reis 1, Lisbon',
        country: 'Portugal',
        lat: 38.7209,
        lng: -9.1355,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'seafood', 'must-try'],
        notes:
          'Finish dinner with the prego (garlic steak sandwich) for dessert!',
        rating: 5,
        cuisine: 'Portuguese Seafood',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Cervejaria%20Ramiro%20Lisbon',
      },
      {
        _key: 'p-paris',
        _type: 'placeItem',
        name: 'Paris',
        subtitle: 'Île-de-France · France',
        address: 'Paris, France',
        country: 'France',
        lat: 48.8566,
        lng: 2.3522,
        primaryTag: 'city',
        tags: ['city', 'museums', 'weekend-trip'],
        notes: 'Canal Saint-Martin picnic in the evening.',
        rating: 5,
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Paris%2C%20France',
      },
      {
        _key: 'p-chartier',
        _type: 'placeItem',
        name: 'Bouillon Chartier Grands Boulevards',
        subtitle: 'Belle Époque Brasserie · 9th Arr., Paris',
        address: '7 Rue du Faubourg Montmartre, Paris',
        country: 'France',
        lat: 48.8719,
        lng: 2.3431,
        primaryTag: 'restaurant',
        tags: ['restaurant', 'bistro', 'classic'],
        notes:
          '1896 dining hall where waiters write your bill on the paper tablecloth.',
        rating: 4,
        cuisine: 'French Brasserie',
        externalUrl:
          'https://www.google.com/maps/search/?api=1&query=Bouillon%20Chartier%20Grands%20Boulevards%20Paris',
      },
    ],
  },
]

async function main() {
  const client = await resolveSanityClient()
  console.log(`Seeding ${STARTER_DOCS.length} starter place lists into Sanity (${projectId}/${dataset})...`)
  for (const doc of STARTER_DOCS) {
    await client.createIfNotExists(doc)
    console.log(`  ✓ ${doc.emoji} ${doc.title} (/places/${doc.slug.current})`)
  }
  console.log('Done! Open /studio -> Favourite Places Lists to edit or add lists.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
