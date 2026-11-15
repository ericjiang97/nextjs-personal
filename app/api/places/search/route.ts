import { NextRequest, NextResponse } from 'next/server'
import { PlaceCandidate, PrimaryTag } from '../../../../types/places'

interface PhotonFeature {
  properties: {
    osm_type?: string
    osm_id?: number
    osm_key?: string
    osm_value?: string
    type?: string
    name?: string
    housenumber?: string
    street?: string
    district?: string
    locality?: string
    city?: string
    state?: string
    country?: string
  }
  geometry: {
    coordinates: [number, number]
  }
}

const CAFE_VALUES = new Set(['cafe', 'bakery', 'ice_cream', 'pastry', 'coffee'])

const RESTAURANT_VALUES = new Set([
  'restaurant',
  'fast_food',
  'bar',
  'pub',
  'biergarten',
  'food_court',
  'bistro',
  'confectionery',
  'deli',
])

const CITY_VALUES = new Set([
  'city',
  'town',
  'municipality',
  'borough',
  'suburb',
  'village',
  'island',
  'county',
  'state',
])

function classifyFeature(
  props: PhotonFeature['properties'],
  requestedCategory: string
): { primaryTag: PrimaryTag; tags: string[]; cuisine?: string } {
  const osmVal = (props.osm_value || '').toLowerCase()
  const osmKey = (props.osm_key || '').toLowerCase()
  const featType = (props.type || '').toLowerCase()

  if (
    requestedCategory === 'cafe' ||
    CAFE_VALUES.has(osmVal) ||
    (osmKey === 'shop' && (osmVal === 'bakery' || osmVal === 'pastry' || osmVal === 'coffee'))
  ) {
    const tags = ['cafe']
    if (osmVal && osmVal !== 'cafe') tags.push(osmVal.replace(/_/g, '-'))
    return {
      primaryTag: 'cafe',
      tags,
      cuisine: osmVal ? osmVal.replace(/_/g, ' ') : 'Cafe & Bakery',
    }
  }

  if (
    requestedCategory === 'restaurant' ||
    RESTAURANT_VALUES.has(osmVal) ||
    (osmKey === 'shop' && osmVal === 'deli')
  ) {
    const tags = ['restaurant']
    if (osmVal && osmVal !== 'restaurant') {
      tags.push(osmVal.replace(/_/g, '-'))
    }
    return {
      primaryTag: 'restaurant',
      tags,
      cuisine: osmVal ? osmVal.replace(/_/g, ' ') : 'Dining',
    }
  }

  if (
    requestedCategory === 'city' ||
    CITY_VALUES.has(osmVal) ||
    CITY_VALUES.has(featType) ||
    osmKey === 'place' ||
    osmKey === 'boundary'
  ) {
    const tags = ['city']
    if (osmVal && osmVal !== 'city' && osmVal !== 'administrative') {
      tags.push(osmVal.replace(/_/g, '-'))
    }
    return { primaryTag: 'city', tags }
  }

  const tags = ['place']
  if (osmVal) tags.push(osmVal.replace(/_/g, '-'))
  return { primaryTag: 'place', tags }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  const category = (searchParams.get('category') || 'all').toLowerCase()

  if (!q) {
    return NextResponse.json({ results: [] })
  }

  try {
    const url = new URL('https://photon.komoot.io/api/')
    url.searchParams.set('q', q)
    url.searchParams.set('lang', 'en')
    url.searchParams.set('limit', '10')

    if (category === 'restaurant') {
      ;[
        'amenity:restaurant',
        'amenity:cafe',
        'amenity:fast_food',
        'amenity:bar',
        'amenity:food_court',
        'shop:bakery',
      ].forEach((tag) => url.searchParams.append('osm_tag', tag))
    } else if (category === 'city') {
      ;[
        'place:city',
        'place:town',
        'place:municipality',
        'place:village',
        'place:island',
      ].forEach((tag) => url.searchParams.append('osm_tag', tag))
    }

    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'EricJiangPersonalPlaces/1.0',
        Accept: 'application/json',
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      throw new Error(`Photon API returned ${res.status}`)
    }

    const data = (await res.json()) as { features?: PhotonFeature[] }
    const seen = new Set<string>()
    const results: PlaceCandidate[] = []

    for (const feature of data.features || []) {
      const props = feature.properties || {}
      const coords = feature.geometry?.coordinates
      if (!props.name || !coords || coords.length < 2) continue

      const [lonVal, latVal] = coords
      const { primaryTag, tags, cuisine } = classifyFeature(props, category)

      const streetPart = [props.housenumber, props.street]
        .filter(Boolean)
        .join(' ')
      const areaPart = [props.district || props.locality, props.city, props.state]
        .filter(
          (v, i, arr) => Boolean(v) && v !== props.name && arr.indexOf(v) === i
        )
        .slice(0, 2)
        .join(', ')
      const country = props.country || ''

      const subtitleParts = [
        (primaryTag === 'restaurant' || primaryTag === 'cafe') && cuisine
          ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1)
          : null,
        areaPart || country,
      ].filter(Boolean)

      const addressParts = [streetPart, areaPart, country].filter(Boolean)
      const externalId = `osm-${props.osm_type || 'X'}-${
        props.osm_id || `${latVal.toFixed(4)}-${lonVal.toFixed(4)}`
      }`

      const dedupeKey = `${props.name.toLowerCase()}-${latVal.toFixed(2)}-${lonVal.toFixed(2)}`
      if (seen.has(dedupeKey)) continue
      seen.add(dedupeKey)

      if (country) {
        const countrySlug = country.toLowerCase().replace(/\s+/g, '-')
        if (!tags.includes(countrySlug) && tags.length < 4) {
          tags.push(countrySlug)
        }
      }

      const latRounded = Number(latVal.toFixed(6))
      const lngRounded = Number(lonVal.toFixed(6))
      const addressStr = addressParts.join(', ') || props.name
      const mapsQuery = encodeURIComponent(`${props.name}, ${addressStr}`)

      results.push({
        externalId,
        name: props.name,
        subtitle: subtitleParts.join(' · ') || country || 'Featured location',
        address: addressStr,
        country,
        lat: latRounded,
        lng: lngRounded,
        primaryTag,
        tags,
        cuisine,
        externalUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
      })
    }

    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
