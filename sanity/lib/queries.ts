import { defineQuery } from 'next-sanity'

export interface SanityImageValue {
  url?: string | null
  alt?: string | null
  asset?: {
    _ref?: string
    url?: string
  }
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
}

export interface SanityBlogPost {
  _id: string
  title: string
  slug: string
  author?: string | null
  publishedAt?: string | null
  _createdAt?: string
  _updatedAt?: string
  preview?: boolean | null
  summary?: string | null
  category?: SanityCategory | null
  banner?: SanityImageValue | null
  body?: any[] | null
  plainBody?: string
}

export interface SanityAlbumSlice {
  _key: string
  _type:
    | 'singleImageSlice'
    | 'imageGroupSlice'
    | 'beforeAfterSlice'
    | 'imageWithTextSlice'
    | 'richTextSlice'
  title?: string | null
  description?: string | null
  position?: 'left' | 'right' | null
  image?: SanityImageValue | null
  images?: SanityImageValue[] | null
  beforeImage?: SanityImageValue | null
  afterImage?: SanityImageValue | null
  text?: any[] | null
}

export interface SanityAlbum {
  _id: string
  title: string
  slug: string
  publishedAt?: string | null
  updatedAt?: string | null
  _createdAt?: string
  _updatedAt?: string
  description?: any[] | null
  featuredImage?: SanityImageValue | null
  slices?: SanityAlbumSlice[] | null
}

export interface SanityProject {
  _id: string
  name: string
  description: string
  url: string
  repoUrl?: string | null
  status?: 'current' | 'previous' | string | null
  imageUrl?: string | null
  screenshotUrl?: string | null
  order?: number | null
}

export interface SanityExperiencePosition {
  _key?: string
  title: string
  startDate: string
  endDate?: string | null
  description?: string[] | null
}

export interface SanityExperience {
  _id: string
  company: string
  companyUrl?: string | null
  order?: number | null
  positions: SanityExperiencePosition[]
}

export interface SanityTalk {
  _id: string
  title: string
  slug?: string | null
  org?: string | null
  date?: string | null
  talkDate?: string | null
  url?: string | null
  upcoming?: boolean | null
  order?: number | null
}

export interface SanityWallpaper {
  _id: string
  title: string
  slug: string
  wallpaperSlug?: string | null
  type: 'desktop' | 'mobile' | string
  tags?: string[] | null
  extension?: 'png' | 'jpg' | string | null
  previewFileName?: string | null
  previewImageUrl?: string | null
  fullResFileUrl?: string | null
  order?: number | null
}

export interface SanityHomePage {
  _id?: string
  heroBadge?: string
  heroGreeting?: string
  heroName?: string
  heroRoleVerb?: string
  flipWords?: string[]
  heroRoleSuffix?: string
  heroHighlight?: string
  heroBio?: string
  terminalHost?: string
  terminalLines?: Array<{
    _key?: string
    cmd: string
    out: string
    color?: string
  }>
  floatingBadge?: string
  cardName?: string
  cardSubtitle?: string
  cardCompanyBadge?: string
  cardImageUrl?: string | null
  cardOverlayBadge?: string
  githubUrl?: string
  linkedinUrl?: string
  photosUrl?: string
  resumeUrl?: string
  stats?: Array<{
    _key?: string
    value: string
    label: string
    icon?: string
  }>
  bentoEyebrow?: string
  bentoHeading?: string
  googleCardTitle?: string
  googleCardDescription?: string
  googleRoleStages?: Array<{
    _key?: string
    role: string
    year: string
  }>
  wallpapersCardTitle?: string
  wallpapersCardDescription?: string
  talksCardTitle?: string
  talksCardDescription?: string
  talksCardBadge?: string
  talksCardQuote?: string
  projectsEyebrow?: string
  projectsHeading?: string
  talksSectionEyebrow?: string
  talksSectionHeading?: string
}

export interface SanityAboutPage {
  _id?: string
  heroBadge?: string
  heroTitle?: string
  heroDescription?: string
  metaDescription?: string
  bioEyebrow?: string
  bioLeadText?: string
  bioCompanyName?: string
  bioCompanyUrl?: string
  bioTrailingText?: string
  resumeUrl?: string
  resumeButtonLabel?: string
  contactEmail?: string
  quickFactsEyebrow?: string
  quickFactsTitle?: string
  quickFacts?: Array<{
    _key?: string
    label: string
    value: string
    highlight?: boolean
  }>
  experienceEyebrow?: string
  experienceTitle?: string
}

export interface SanitySiteSettings {
  _id?: string
  siteTitle?: string
  copyrightOwner?: string
  blogHeroBadge?: string
  blogHeroTitle?: string
  blogHeroDescription?: string
  projectsHeroBadge?: string
  projectsHeroTitle?: string
  projectsHeroDescription?: string
  albumsHeroBadge?: string
  albumsHeroTitle?: string
  albumsHeroDescription?: string
  placesHeroBadge?: string
  placesHeroTitle?: string
  placesHeroDescription?: string
  mediaHeroBadge?: string
  mediaHeroTitle?: string
  mediaHeroDescription?: string
  mediaCards?: Array<{
    _key?: string
    title: string
    href: string
    external?: boolean
    icon?: string
    badge?: string
    accent?: string
    description?: string
  }>
  wallpapersHeroBadge?: string
  wallpapersHeroTitle?: string
  wallpapersHeroDescription?: string
  wallpaperFilters?: string[]
}

export function portableTextToPlainText(blocks?: any[] | null): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block._type === 'codeBlock' && block.code) {
        return block.code
      }
      if (block._type !== 'block' || !Array.isArray(block.children)) {
        return ''
      }
      return block.children.map((child: any) => child.text || '').join('')
    })
    .filter(Boolean)
    .join('\n\n')
}

export const HOME_PAGE_QUERY = defineQuery(`{
  "home": *[_type == "homePage" && _id == "homePage"][0]{
    ...,
    "cardImageUrl": cardImage.asset->url
  },
  "latestPosts": *[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _createdAt,
    _updatedAt,
    summary,
    "category": category->{ _id, title, "slug": slug.current },
    "banner": select(defined(banner.asset) => { "url": banner.asset->url, "alt": banner.alt }, null),
    body
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){
    _id,
    name,
    description,
    url,
    repoUrl,
    status,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    "screenshotUrl": coalesce(screenshot.asset->url, screenshotUrl),
    order
  },
  "talks": *[_type == "talk" && upcoming != true] | order(order asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    org,
    date,
    talkDate,
    url,
    upcoming,
    order
  }
}`)

export const ABOUT_PAGE_QUERY = defineQuery(`{
  "about": *[_type == "aboutPage" && _id == "aboutPage"][0],
  "experiences": *[_type == "experience"] | order(order asc, _createdAt asc){
    _id,
    company,
    companyUrl,
    order,
    positions[]{
      _key,
      title,
      startDate,
      endDate,
      description
    }
  }
}`)

export const PROJECTS_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    projectsHeroBadge,
    projectsHeroTitle,
    projectsHeroDescription
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){
    _id,
    name,
    description,
    url,
    repoUrl,
    status,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    "screenshotUrl": coalesce(screenshot.asset->url, screenshotUrl),
    order
  }
}`)

export const MEDIA_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    mediaHeroBadge,
    mediaHeroTitle,
    mediaHeroDescription,
    mediaCards
  },
  "talks": *[_type == "talk"] | order(order asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    org,
    date,
    talkDate,
    url,
    upcoming,
    order
  }
}`)

export const WALLPAPERS_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    wallpapersHeroBadge,
    wallpapersHeroTitle,
    wallpapersHeroDescription,
    wallpaperFilters
  },
  "wallpapers": *[_type == "wallpaper"] | order(order asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    wallpaperSlug,
    type,
    tags,
    extension,
    previewFileName,
    "previewImageUrl": previewImage.asset->url,
    "fullResFileUrl": fullResFile.asset->url,
    order
  }
}`)

export const BLOG_POSTS_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    blogHeroBadge,
    blogHeroTitle,
    blogHeroDescription
  },
  "posts": *[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    _createdAt,
    _updatedAt,
    summary,
    "category": category->{ _id, title, "slug": slug.current },
    "banner": select(defined(banner.asset) => { "url": banner.asset->url, "alt": banner.alt }, null),
    body
  }
}`)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  author,
  publishedAt,
  _createdAt,
  _updatedAt,
  summary,
  "category": category->{ _id, title, "slug": slug.current },
  "banner": select(defined(banner.asset) => { "url": banner.asset->url, "alt": banner.alt }, null),
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    },
    _type == "beforeAfterSlice" => {
      ...,
      "beforeImage": select(defined(beforeImage.asset) => { "url": beforeImage.asset->url, "alt": beforeImage.alt }, null),
      "afterImage": select(defined(afterImage.asset) => { "url": afterImage.asset->url, "alt": afterImage.alt }, null)
    }
  }
}`)

export const BLOG_SLUGS_QUERY = defineQuery(`*[_type == "blogPost" && defined(slug.current)]{
  "uid": slug.current
}`)

export const CATEGORY_PAGE_QUERY = defineQuery(`{
  "category": *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current
  },
  "posts": *[_type == "blogPost" && category->slug.current == $slug] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _createdAt,
    _updatedAt,
    summary,
    "category": category->{ _id, title, "slug": slug.current },
    "banner": select(defined(banner.asset) => { "url": banner.asset->url, "alt": banner.alt }, null),
    body
  }
}`)

export const CATEGORY_SLUGS_QUERY = defineQuery(`*[_type == "category" && defined(slug.current)]{
  "uid": slug.current
}`)

export const ALBUMS_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    albumsHeroBadge,
    albumsHeroTitle,
    albumsHeroDescription
  },
  "albums": *[_type == "album"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    _createdAt,
    _updatedAt,
    "featuredImage": select(defined(featuredImage.asset) => { "url": featuredImage.asset->url, "alt": featuredImage.alt }, null)
  }
}`)

export const ALBUM_BY_SLUG_QUERY = defineQuery(`*[_type == "album" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  _createdAt,
  _updatedAt,
  description,
  "featuredImage": select(defined(featuredImage.asset) => { "url": featuredImage.asset->url, "alt": featuredImage.alt }, null),
  slices[]{
    _key,
    _type,
    title,
    description,
    position,
    text,
    "image": select(defined(image.asset) => { "url": image.asset->url, "alt": image.alt }, null),
    "images": images[]{ "url": asset->url, "alt": alt },
    "beforeImage": select(defined(beforeImage.asset) => { "url": beforeImage.asset->url, "alt": beforeImage.alt }, null),
    "afterImage": select(defined(afterImage.asset) => { "url": afterImage.asset->url, "alt": afterImage.alt }, null)
  }
}`)

export const ALBUM_SLUGS_QUERY = defineQuery(`*[_type == "album" && defined(slug.current)]{
  "uid": slug.current
}`)

export const OG_BLOG_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  publishedAt,
  _createdAt
}`)

export const OG_TALK_QUERY = defineQuery(`*[_type == "talk" && slug.current == $slug][0]{
  title,
  date,
  talkDate
}`)

export interface SanityPlaceItem {
  _key?: string
  name: string
  subtitle?: string | null
  primaryTag?: 'restaurant' | 'city' | 'cafe' | 'place' | string | null
  address?: string | null
  country?: string | null
  lat: number
  lng: number
  rating?: number | null
  cuisine?: string | null
  priceRange?: string | null
  wouldGoAgain?: 'yes' | 'maybe' | 'no' | string | null
  recommendedDishes?: string[] | null
  lastVisited?: string | null
  operatingStatus?:
    | 'open'
    | 'temporarily_closed'
    | 'permanently_closed'
    | string
    | null
  tags?: string[] | null
  notes?: string | null
  images?: Array<{
    _key?: string
    url?: string | null
    alt?: string | null
  }> | null
  externalUrl?: string | null
}

export interface SanityPlaceList {
  _id: string
  title: string
  slug: string
  emoji?: string | null
  description?: string | null
  ownerName?: string | null
  coverTheme?: 'amber' | 'cyan' | 'violet' | 'emerald' | 'rose' | string | null
  sortBy?: 'manual' | 'rating' | 'name' | 'tag' | string | null
  cardStyle?: 'detailed' | 'compact' | string | null
  ratingScale?: number | null
  customTags?: string[] | null
  unlisted?: boolean | null
  sharingPaused?: boolean | null
  hideNotesOnShare?: boolean | null
  order?: number | null
  _updatedAt?: string
  places?: SanityPlaceItem[] | null
}

export const PUBLIC_PLACE_LISTS_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    placesHeroBadge,
    placesHeroTitle,
    placesHeroDescription
  },
  "totalCount": count(*[_type == "placeList"]),
  "lists": *[_type == "placeList" && unlisted != true && sharingPaused != true] | order(coalesce(order, 999) asc, _updatedAt desc){
    _id,
    title,
    "slug": slug.current,
    emoji,
    description,
    ownerName,
    coverTheme,
    sortBy,
    cardStyle,
    ratingScale,
    customTags,
    unlisted,
    sharingPaused,
    hideNotesOnShare,
    order,
    _updatedAt,
    places[]{
      _key,
      name,
      subtitle,
      primaryTag,
      address,
      country,
      lat,
      lng,
      rating,
      cuisine,
      priceRange,
      wouldGoAgain,
      recommendedDishes,
      lastVisited,
      operatingStatus,
      tags,
      notes,
      "images": images[]{
        _key,
        "url": asset->url,
        alt
      },
      externalUrl
    }
  }
}`)

export const PLACE_LIST_BY_SLUG_QUERY = defineQuery(`{
  "totalCount": count(*[_type == "placeList"]),
  "list": *[_type == "placeList" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    emoji,
    description,
    ownerName,
    coverTheme,
    sortBy,
    cardStyle,
    ratingScale,
    customTags,
    unlisted,
    sharingPaused,
    hideNotesOnShare,
    order,
    _updatedAt,
    places[]{
      _key,
      name,
      subtitle,
      primaryTag,
      address,
      country,
      lat,
      lng,
      rating,
      cuisine,
      priceRange,
      wouldGoAgain,
      recommendedDishes,
      lastVisited,
      operatingStatus,
      tags,
      notes,
      "images": images[]{
        _key,
        "url": asset->url,
        alt
      },
      externalUrl
    }
  }
}`)

export const PLACE_LIST_SLUGS_QUERY = defineQuery(`*[_type == "placeList" && defined(slug.current)]{
  "slug": slug.current
}`)
