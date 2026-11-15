export type PrimaryTag = 'restaurant' | 'city' | 'cafe' | 'place'

export type ListSortBy = 'manual' | 'rating' | 'name' | 'tag'
export type ListCardStyle = 'detailed' | 'compact'
export type CoverTheme = 'amber' | 'cyan' | 'violet' | 'emerald' | 'rose'

export interface PlaceCandidate {
  externalId: string
  name: string
  subtitle: string
  address: string
  country: string
  lat: number
  lng: number
  primaryTag: PrimaryTag
  tags: string[]
  cuisine?: string
  externalUrl?: string
}

export type WouldGoAgain = 'yes' | 'maybe' | 'no'
export type OperatingStatus =
  | 'open'
  | 'temporarily_closed'
  | 'permanently_closed'
export type PriceRange = '$' | '$$' | '$$$' | '$$$$'

export interface PlacePhoto {
  url: string
  alt?: string
}

export interface PlaceItem {
  id: string
  name: string
  subtitle: string
  address: string
  country: string
  lat: number
  lng: number
  primaryTag: PrimaryTag
  tags: string[]
  notes?: string
  images?: PlacePhoto[]
  rating?: number
  cuisine?: string
  priceRange?: PriceRange
  wouldGoAgain?: WouldGoAgain
  recommendedDishes?: string[]
  lastVisited?: string
  operatingStatus?: OperatingStatus
  externalUrl?: string
}

export interface PlaceList {
  id: string
  slug: string
  ownerName: string
  title: string
  description: string
  emoji: string
  coverTheme: CoverTheme
  customTags: string[]
  sortBy: ListSortBy
  cardStyle: ListCardStyle
  ratingScale: 5 | 10
  places: PlaceItem[]
  placeCount: number
  unlisted: boolean
  sharingPaused: boolean
  hideNotesOnShare: boolean
  updatedAt?: string
}
