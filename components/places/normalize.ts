import { stegaClean } from 'next-sanity'
import type { SanityPlaceItem, SanityPlaceList } from '../../sanity/lib/queries'
import type {
  CoverTheme,
  ListCardStyle,
  ListSortBy,
  OperatingStatus,
  PlaceItem,
  PlaceList,
  PlacePhoto,
  PriceRange,
  PrimaryTag,
  WouldGoAgain,
} from '../../types/places'

const VALID_THEMES = new Set<CoverTheme>([
  'amber',
  'cyan',
  'violet',
  'emerald',
  'rose',
])
const VALID_SORTS = new Set<ListSortBy>(['manual', 'rating', 'name', 'tag'])
const VALID_STYLES = new Set<ListCardStyle>(['detailed', 'compact'])
const VALID_TAGS = new Set<PrimaryTag>(['restaurant', 'city', 'cafe', 'place'])
const VALID_REVISIT = new Set<WouldGoAgain>(['yes', 'maybe', 'no'])
const VALID_STATUS = new Set<OperatingStatus>([
  'open',
  'temporarily_closed',
  'permanently_closed',
])
const VALID_PRICE = new Set<PriceRange>(['$', '$$', '$$$', '$$$$'])

function normalizePlaceItem(
  raw: SanityPlaceItem,
  idx: number,
  hideNotes: boolean
): PlaceItem | null {
  if (
    typeof raw?.lat !== 'number' ||
    typeof raw?.lng !== 'number' ||
    Number.isNaN(raw.lat) ||
    Number.isNaN(raw.lng)
  ) {
    return null
  }

  const cleanPrimary = stegaClean(raw.primaryTag) as PrimaryTag
  const primaryTag: PrimaryTag = VALID_TAGS.has(cleanPrimary)
    ? cleanPrimary
    : 'place'

  const cleanName = stegaClean(raw.name) || ''
  const cleanAddress = stegaClean(raw.address) || cleanName
  const cleanCountry = stegaClean(raw.country) || ''
  const mapsQuery = encodeURIComponent(
    [cleanName, cleanAddress || cleanCountry].filter(Boolean).join(', ')
  )
  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const cleanExternalUrl = stegaClean(raw.externalUrl)

  const cleanRevisit = stegaClean(raw.wouldGoAgain) as WouldGoAgain
  const wouldGoAgain = VALID_REVISIT.has(cleanRevisit)
    ? cleanRevisit
    : undefined

  const cleanStatus = stegaClean(raw.operatingStatus) as OperatingStatus
  const operatingStatus = VALID_STATUS.has(cleanStatus)
    ? cleanStatus
    : undefined

  const cleanPrice = stegaClean(raw.priceRange) as PriceRange
  const priceRange = VALID_PRICE.has(cleanPrice) ? cleanPrice : undefined

  const recommendedDishes = Array.isArray(raw.recommendedDishes)
    ? raw.recommendedDishes.map((d) => stegaClean(d)).filter(Boolean)
    : undefined

  const cleanLastVisited = stegaClean(raw.lastVisited) || undefined

  const images: PlacePhoto[] = Array.isArray(raw.images)
    ? raw.images
        .map((img) => {
          const url = stegaClean(img?.url)
          if (!url) return null
          const alt = stegaClean(img?.alt) || undefined
          return { url, ...(alt ? { alt } : {}) }
        })
        .filter((img): img is PlacePhoto => img !== null)
    : []

  return {
    id: stegaClean(raw._key) || `place-${idx}-${cleanName}`,
    name: raw.name || 'Untitled Place',
    subtitle: raw.subtitle || raw.address || raw.country || 'Featured location',
    address: raw.address || raw.name || '',
    country: raw.country || '',
    lat: raw.lat,
    lng: raw.lng,
    primaryTag,
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((t) => stegaClean(t)).filter(Boolean)
      : [],
    notes: hideNotes ? undefined : raw.notes || undefined,
    ...(images.length > 0 ? { images } : {}),
    rating: typeof raw.rating === 'number' ? raw.rating : undefined,
    cuisine: raw.cuisine || undefined,
    priceRange,
    wouldGoAgain,
    recommendedDishes:
      recommendedDishes && recommendedDishes.length > 0
        ? recommendedDishes
        : undefined,
    lastVisited: cleanLastVisited,
    operatingStatus,
    externalUrl: cleanExternalUrl || fallbackMapsUrl,
  }
}

export function normalizePlaceList(raw: SanityPlaceList): PlaceList {
  const hideNotes = Boolean(raw.hideNotesOnShare)
  const places = (raw.places || [])
    .map((p, idx) => normalizePlaceItem(p, idx, hideNotes))
    .filter((p): p is PlaceItem => p !== null)

  const cleanTheme = stegaClean(raw.coverTheme) as CoverTheme
  const coverTheme: CoverTheme = VALID_THEMES.has(cleanTheme)
    ? cleanTheme
    : 'amber'

  const cleanSort = stegaClean(raw.sortBy) as ListSortBy
  const sortBy: ListSortBy = VALID_SORTS.has(cleanSort) ? cleanSort : 'manual'

  const cleanStyle = stegaClean(raw.cardStyle) as ListCardStyle
  const cardStyle: ListCardStyle = VALID_STYLES.has(cleanStyle)
    ? cleanStyle
    : 'detailed'

  const ratingScale: 5 | 10 =
    raw.ratingScale === 10 || places.some((p) => (p.rating ?? 0) > 5) ? 10 : 5

  return {
    id: stegaClean(raw._id),
    slug: stegaClean(raw.slug),
    ownerName: raw.ownerName || 'Eric Jiang',
    title: raw.title || 'Favourite Places',
    description: raw.description || '',
    emoji: stegaClean(raw.emoji) || '🍜',
    coverTheme,
    customTags: Array.isArray(raw.customTags)
      ? raw.customTags.map((t) => stegaClean(t)).filter(Boolean)
      : [],
    sortBy,
    cardStyle,
    ratingScale,
    places,
    placeCount: places.length,
    unlisted: Boolean(raw.unlisted),
    sharingPaused: Boolean(raw.sharingPaused),
    hideNotesOnShare: hideNotes,
    updatedAt: stegaClean(raw._updatedAt),
  }
}
