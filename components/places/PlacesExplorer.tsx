'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import {
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Copy,
  ExternalLink,
  FolderHeart,
  Lock,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Search,
  ShieldOff,
  Sparkles,
  Star,
  Utensils,
  X,
} from 'lucide-react'
import { CardSpotlight } from '../ui/card-spotlight'
import LeafletMap, { type MapPin as LeafletPin } from './LeafletMap'
import type {
  CoverTheme,
  ListSortBy,
  PlaceItem,
  PlaceList,
  PlacePhoto,
} from '../../types/places'
import { cn } from '../../utils/cn'

const THEME_ACCENTS: Record<CoverTheme, string> = {
  amber:
    'text-amber-600 bg-amber-500/12 border-amber-500/25 dark:text-amber-300',
  cyan: 'text-sky-600 bg-sky-500/12 border-sky-500/25 dark:text-sky-300',
  violet:
    'text-purple-600 bg-purple-500/12 border-purple-500/25 dark:text-purple-300',
  emerald:
    'text-emerald-600 bg-emerald-500/12 border-emerald-500/25 dark:text-emerald-300',
  rose: 'text-rose-600 bg-rose-500/12 border-rose-500/25 dark:text-rose-300',
}

function sortPlaces(places: PlaceItem[], sortBy: ListSortBy): PlaceItem[] {
  const copy = [...places]
  if (sortBy === 'rating') {
    return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }
  if (sortBy === 'name') {
    return copy.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortBy === 'tag') {
    return copy.sort((a, b) => a.primaryTag.localeCompare(b.primaryTag))
  }
  return copy
}

export type RouteStatus = 'active' | 'paused' | 'not_found'

interface RouteState {
  slug?: string
  status: RouteStatus
  extraList?: PlaceList | null
}

interface PlacesContextValue {
  setRouteState: React.Dispatch<React.SetStateAction<RouteState>>
}

const PlacesContext = createContext<PlacesContextValue | null>(null)

export function PlacesRouteSync({
  slug,
  status = 'active',
  extraList = null,
}: {
  slug?: string
  status?: RouteStatus
  extraList?: PlaceList | null
}) {
  const ctx = useContext(PlacesContext)

  useEffect(() => {
    ctx?.setRouteState({ slug, status, extraList })
  }, [ctx, slug, status, extraList])

  return null
}

export default function PlacesExplorer({
  publicLists,
  children,
}: {
  publicLists: PlaceList[]
  children?: React.ReactNode
}) {
  const router = useRouter()
  const params = useParams<{ slug?: string }>()
  const urlSlug = typeof params?.slug === 'string' ? params.slug : undefined

  const [routeState, setRouteState] = useState<RouteState>({
    slug: urlSlug,
    status: 'active',
    extraList: null,
  })

  const [drawerOpen, setDrawerOpen] = useState(true)
  const [activeTag, setActiveTag] = useState<string>('all')
  const [showAllTags, setShowAllTags] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOverride, setSortOverride] = useState<ListSortBy | null>(null)
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null)
  const [focusCoords, setFocusCoords] = useState<{
    lat: number
    lng: number
    zoom?: number
  } | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{
    placeName: string
    images: PlacePhoto[]
    index: number
  } | null>(null)

  // Combine public lists + any unlisted list resolved on /places/[slug]
  const combinedLists = useMemo(() => {
    if (
      routeState.extraList &&
      !publicLists.some((l) => l.slug === routeState.extraList?.slug)
    ) {
      return [routeState.extraList, ...publicLists]
    }
    return publicLists
  }, [publicLists, routeState.extraList])

  const effectiveSlug = urlSlug || publicLists[0]?.slug || ''
  const [prevSlug, setPrevSlug] = useState(effectiveSlug)

  // Reset filters & selection synchronously whenever the active list slug changes
  if (effectiveSlug !== prevSlug) {
    setPrevSlug(effectiveSlug)
    setActiveTag('all')
    setShowAllTags(false)
    setSearchQuery('')
    setSortOverride(null)
    setSelectedPinId(null)
    setFocusCoords(null)
  }

  // Automatically sync bare /places URL to /places/[first-slug] so address bar always reflects the active list
  useEffect(() => {
    if (!urlSlug && publicLists[0]?.slug) {
      router.replace(`/places/${publicLists[0].slug}`, { scroll: false })
    }
  }, [urlSlug, publicLists, router])

  const activeList: PlaceList | null = useMemo(() => {
    if (!effectiveSlug) return combinedLists[0] || null
    return combinedLists.find((l) => l.slug === effectiveSlug) || null
  }, [combinedLists, effectiveSlug])

  const isStatusOverlay =
    Boolean(urlSlug) &&
    routeState.slug === urlSlug &&
    (routeState.status === 'paused' || routeState.status === 'not_found')

  const effectiveSort: ListSortBy =
    sortOverride || activeList?.sortBy || 'manual'

  const allTags = useMemo(() => {
    if (!activeList) return []
    const counts = new Map<string, number>()
    activeList.places.forEach((p) => {
      counts.set(p.primaryTag, (counts.get(p.primaryTag) || 0) + 1)
      p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1))
    })
    const featured = (activeList.customTags || []).filter((t) => counts.has(t))
    const featuredSet = new Set(featured)
    const rest = Array.from(counts.keys())
      .filter((t) => !featuredSet.has(t))
      .sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0))
    return [...featured, ...rest]
  }, [activeList])

  const visibleTags = useMemo(() => {
    if (showAllTags || allTags.length <= 10) return allTags
    const top = allTags.slice(0, 10)
    if (activeTag !== 'all' && !top.includes(activeTag)) {
      return [...top, activeTag]
    }
    return top
  }, [allTags, showAllTags, activeTag])

  const filteredPlaces = useMemo(() => {
    if (!activeList || isStatusOverlay) return []
    const q = searchQuery.trim().toLowerCase()
    const base = activeList.places.filter((p) => {
      const matchesTag =
        activeTag === 'all' ||
        p.primaryTag === activeTag ||
        p.tags.includes(activeTag)
      if (!matchesTag) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.cuisine && p.cuisine.toLowerCase().includes(q)) ||
        (p.notes && p.notes.toLowerCase().includes(q)) ||
        (p.recommendedDishes &&
          p.recommendedDishes.some((d) => d.toLowerCase().includes(q))) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
    return sortPlaces(base, effectiveSort)
  }, [activeList, isStatusOverlay, activeTag, searchQuery, effectiveSort])

  const mapPins: LeafletPin[] = useMemo(
    () =>
      filteredPlaces.map((p) => ({
        id: p.id,
        name: p.name,
        subtitle: p.subtitle,
        address: p.address,
        country: p.country,
        lat: p.lat,
        lng: p.lng,
        primaryTag: p.primaryTag,
        tags: p.tags,
        notes: p.notes,
        images: p.images,
        rating: p.rating,
        cuisine: p.cuisine,
        priceRange: p.priceRange,
        wouldGoAgain: p.wouldGoAgain,
        recommendedDishes: p.recommendedDishes,
        lastVisited: p.lastVisited,
        operatingStatus: p.operatingStatus,
        externalUrl: p.externalUrl,
      })),
    [filteredPlaces]
  )

  const diningCount =
    activeList?.places.filter(
      (p) => p.primaryTag === 'restaurant' || p.primaryTag === 'cafe'
    ).length ?? 0
  const cityCount =
    activeList?.places.filter((p) => p.primaryTag === 'city').length ?? 0
  const countryCount = useMemo(() => {
    if (!activeList) return 0
    return new Set(
      activeList.places.map((p) => p.country.trim()).filter(Boolean)
    ).size
  }, [activeList])

  const handleSelectPlace = (place: PlaceItem) => {
    setSelectedPinId(place.id)
    setFocusCoords({
      lat: place.lat,
      lng: place.lng,
      zoom: place.primaryTag === 'city' ? 11 : 15,
    })
  }

  const handleSwitchList = (list: PlaceList) => {
    if (list.slug === urlSlug) return
    router.push(`/places/${list.slug}`, { scroll: false })
  }

  const handleCopyShareLink = async (slug: string) => {
    if (typeof window === 'undefined') return
    const shareUrl = `${window.location.origin}/places/${slug}`
    await navigator.clipboard.writeText(shareUrl)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  const ctxVal = useMemo(() => ({ setRouteState }), [])

  return (
    <PlacesContext.Provider value={ctxVal}>
      {children}

      <div className="relative h-dvh w-screen overflow-hidden bg-slate-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        {/* FULL-PAGE INTERACTIVE LEAFLET WORLD MAP */}
        <div className="fixed inset-0 z-0 h-dvh w-screen">
          <LeafletMap
            pins={mapPins}
            fitBoundsKey={`${activeList?.slug || 'empty'}-${activeTag}`}
            drawerOpen={drawerOpen}
            ratingScale={activeList?.ratingScale ?? 5}
            selectedPinId={selectedPinId}
            focusCoords={focusCoords}
            onSelectPin={(pin) => {
              setSelectedPinId(pin ? pin.id : null)
              if (pin && typeof document !== 'undefined') {
                requestAnimationFrame(() => {
                  const cardEl = document.querySelector(
                    `[data-place-card="${CSS.escape(pin.id)}"]`
                  )
                  cardEl?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  })
                })
              }
            }}
            onOpenPhoto={(pin, index) => {
              if (pin.images && pin.images.length > 0) {
                setLightbox({
                  placeName: pin.name,
                  images: pin.images,
                  index,
                })
              }
            }}
          />
        </div>

        {/* COLLAPSED DRAWER RE-OPEN PILL */}
        {!drawerOpen && !isStatusOverlay && (
          <div className="pointer-events-none fixed left-4 top-20 z-30">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-neutral-200/85 bg-white/88 px-3.5 py-2 text-xs font-semibold text-neutral-800 shadow-lg backdrop-blur-xl transition hover:border-sky-500/40 dark:border-white/[0.12] dark:bg-neutral-950/85 dark:text-white"
            >
              <PanelLeftOpen className="h-4 w-4 text-sky-500" />
              <span>{activeList ? `${activeList.emoji} ${activeList.title}` : 'Show Lists'}</span>
            </button>
          </div>
        )}

        {/* PAUSED OR NOT FOUND OVERLAY */}
        {isStatusOverlay ? (
          <div className="pointer-events-auto fixed inset-0 z-30 flex items-center justify-center bg-white/40 p-6 backdrop-blur-md dark:bg-neutral-950/60">
            <div className="relative max-w-md overflow-hidden rounded-3xl border border-neutral-200/85 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-2xl dark:border-white/[0.12] dark:bg-neutral-900/90">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldOff className="h-6 w-6" />
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {routeState.status === 'paused'
                  ? 'Sharing Temporarily Paused'
                  : 'Places List Not Found'}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {routeState.status === 'paused'
                  ? 'Sharing has been temporarily paused for this list. Explore other public lists below.'
                  : "This list link may have changed or doesn't exist."}
              </p>
              {publicLists[0] && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/places/${publicLists[0].slug}`, {
                      scroll: false,
                    })
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-sky-500/25 transition hover:bg-sky-600"
                >
                  <FolderHeart className="h-3.5 w-3.5" />
                  Browse Public Lists
                </button>
              )}
            </div>
          </div>
        ) : (
          /* FLOATING LEFT GLASS DRAWER (styled like ericjiang.dev glass surfaces) */
          <AnimatePresence>
            {drawerOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ type: 'spring', bounce: 0.14, duration: 0.4 }}
                className="pointer-events-auto fixed bottom-4 left-3 top-20 z-30 flex w-[calc(100vw-1.5rem)] max-w-[435px] flex-col overflow-hidden rounded-3xl border border-neutral-200/85 bg-white/86 shadow-2xl shadow-black/[0.08] backdrop-blur-2xl sm:left-4 dark:border-white/[0.1] dark:bg-neutral-950/84 dark:shadow-black/65"
              >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

                {/* STICKY TOP HEADER: Top Bar + List Switcher + Active List Card + Search + Filter Tags */}
                <div className="shrink-0 border-b border-neutral-200/70 px-4 pt-4 pb-3 dark:border-white/[0.08]">
                  {/* Drawer Top Bar: Eyebrow + Collapse Button */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-sky-600 uppercase dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                      <span>Favourite Places</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      title="Hide panel to view full map"
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 bg-neutral-100/80 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 transition hover:border-sky-500/40 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:text-white"
                    >
                      <PanelLeftClose className="h-3.5 w-3.5 text-sky-500" />
                      <span>Hide</span>
                    </button>
                  </div>

                  {/* Horizontal List Switcher (updates /places/[slug] on click!) */}
                  {combinedLists.length > 1 && (
                    <div className="mb-3">
                      <div className="xplore-scroll flex gap-2 overflow-x-auto pb-1">
                        {combinedLists.map((list) => {
                          const isSelected = activeList?.slug === list.slug
                          const accent =
                            THEME_ACCENTS[list.coverTheme] || THEME_ACCENTS.amber
                          return (
                            <button
                              key={list.id}
                              type="button"
                              onClick={() => handleSwitchList(list)}
                              className={cn(
                                'flex min-w-[156px] shrink-0 flex-col items-start rounded-2xl border p-2.5 text-left transition-all duration-200',
                                isSelected
                                  ? 'border-sky-500/55 bg-sky-500/[0.08] shadow-sm ring-1 ring-sky-500/25 dark:border-sky-400/50 dark:bg-sky-400/[0.1]'
                                  : 'border-neutral-200/80 bg-white/70 hover:border-sky-500/35 dark:border-white/[0.08] dark:bg-neutral-900/60 dark:hover:border-white/20'
                              )}
                            >
                              <div className="flex w-full items-center justify-between gap-1.5">
                                <span
                                  className={cn(
                                    'inline-flex h-7 w-7 items-center justify-center rounded-lg border text-sm',
                                    accent
                                  )}
                                >
                                  {list.emoji}
                                </span>
                                <span className="rounded-full border border-neutral-200/80 bg-neutral-100/80 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                                  {list.placeCount} spots
                                </span>
                              </div>
                              <div className="mt-1.5 line-clamp-1 text-xs font-bold text-neutral-900 dark:text-white">
                                {list.title}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {activeList && (
                    <div className="space-y-3">
                      {/* Active List Header Card */}
                      <div className="rounded-2xl border border-neutral-200/80 bg-white/75 p-3.5 dark:border-white/[0.08] dark:bg-neutral-900/70">
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-2xl',
                              THEME_ACCENTS[activeList.coverTheme] ||
                                THEME_ACCENTS.amber
                            )}
                          >
                            {activeList.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                              <span>
                                Curated by{' '}
                                <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
                                  {activeList.ownerName}
                                </strong>
                              </span>
                              {activeList.unlisted && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/25 bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-300">
                                  <Lock className="h-2.5 w-2.5" />
                                  Unlisted
                                </span>
                              )}
                            </div>
                            <h1 className="truncate text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
                              {activeList.title}
                            </h1>
                            {activeList.description && (
                              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                                {activeList.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/60 pt-3 dark:border-white/10">
                          <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                            {diningCount} Eats &amp; Cafes
                            {cityCount > 0
                              ? ` · ${cityCount} ${cityCount === 1 ? 'City' : 'Cities'}`
                              : countryCount > 0
                                ? ` · ${countryCount} ${countryCount === 1 ? 'Region' : 'Countries'}`
                                : ''}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <select
                              value={effectiveSort}
                              onChange={(e) =>
                                setSortOverride(e.target.value as ListSortBy)
                              }
                              aria-label="Sort places"
                              className="rounded-full border border-neutral-200/80 bg-neutral-100/80 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 focus:border-sky-500/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                            >
                              <option value="manual">Sort: Featured</option>
                              <option value="rating">Sort: Rating</option>
                              <option value="tag">Sort: Category</option>
                              <option value="name">Sort: A–Z</option>
                            </select>

                            <button
                              type="button"
                              onClick={() =>
                                handleCopyShareLink(activeList.slug)
                              }
                              className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-sky-500/25 transition hover:bg-sky-600"
                            >
                              {copiedSlug === activeList.slug ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Share Link</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Search Within List */}
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Filter spots, cities, cuisines, or notes…"
                          className="w-full rounded-full border border-neutral-200/80 bg-white/80 py-1.5 pr-3.5 pl-9 text-xs text-neutral-900 placeholder-neutral-400 transition focus:border-sky-500/50 focus:outline-none dark:border-white/10 dark:bg-neutral-900/70 dark:text-white dark:placeholder-neutral-500"
                        />
                      </div>

                      {/* Tag Filter Pills (matching /media/wallpapers) */}
                      {allTags.length > 0 && (
                        <div
                          className={cn(
                            'flex flex-wrap gap-1.5',
                            showAllTags && 'xplore-scroll max-h-28 overflow-y-auto pr-0.5'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTag('all')}
                            className={cn(
                              'rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200',
                              activeTag === 'all'
                                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                                : 'border border-neutral-200/80 bg-white/75 text-neutral-600 hover:border-sky-500/40 hover:text-neutral-900 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:text-white'
                            )}
                          >
                            All ({activeList.places.length})
                          </button>
                          {visibleTags.map((tag) => {
                            const isSelected = activeTag === tag
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setActiveTag(tag)}
                                className={cn(
                                  'rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize transition-all duration-200',
                                  isSelected
                                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                                    : 'border border-neutral-200/80 bg-white/75 text-neutral-600 hover:border-sky-500/40 hover:text-neutral-900 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:text-white'
                                )}
                              >
                                {tag}
                              </button>
                            )
                          })}
                          {allTags.length > 10 && (
                            <button
                              type="button"
                              onClick={() => setShowAllTags((v) => !v)}
                              className="rounded-full border border-dashed border-neutral-300/90 bg-transparent px-2.5 py-1 text-[11px] font-semibold text-neutral-500 transition hover:border-sky-500/40 hover:text-neutral-800 dark:border-white/15 dark:text-neutral-400 dark:hover:text-white"
                            >
                              {showAllTags
                                ? 'Less'
                                : `+${allTags.length - visibleTags.length} more`}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* SCROLLABLE PLACES LIST */}
                <div className="xplore-scroll min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-4">
                  {!activeList ? (
                    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-8 text-center dark:border-white/[0.08] dark:bg-neutral-900/60">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        No place lists published yet.
                      </p>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        Create your first Places List in Sanity Studio.
                      </p>
                    </div>
                  ) : filteredPlaces.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-neutral-300/80 p-6 text-center dark:border-white/15">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        No places match this filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTag('all')
                          setSearchQuery('')
                        }}
                        className="mt-2.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 hover:border-sky-500/40 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {filteredPlaces.map((place) => {
                        const isSelected = place.id === selectedPinId
                        const isCompact = activeList.cardStyle === 'compact'

                        return (
                          <div key={place.id} data-place-card={place.id}>
                            <CardSpotlight
                              onClick={() => handleSelectPlace(place)}
                              className={cn(
                                'cursor-pointer transition-all duration-200',
                                isCompact ? 'p-3' : 'p-4',
                                isSelected &&
                                  'border-sky-500/60 ring-1 ring-sky-500/30 dark:border-sky-400/60 dark:ring-sky-400/25'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2.5">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span
                                      className={cn(
                                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                                        place.primaryTag === 'restaurant'
                                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
                                          : place.primaryTag === 'cafe'
                                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                            : place.primaryTag === 'city'
                                              ? 'bg-sky-500/10 text-sky-600 dark:text-sky-300'
                                              : 'bg-purple-500/10 text-purple-600 dark:text-purple-300'
                                      )}
                                    >
                                      {place.primaryTag === 'restaurant' ? (
                                        <Utensils className="h-2.5 w-2.5" />
                                      ) : place.primaryTag === 'cafe' ? (
                                        <Coffee className="h-2.5 w-2.5" />
                                      ) : place.primaryTag === 'city' ? (
                                        <Building2 className="h-2.5 w-2.5" />
                                      ) : (
                                        <MapPin className="h-2.5 w-2.5" />
                                      )}
                                      {place.primaryTag}
                                    </span>

                                    {typeof place.rating === 'number' && (
                                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-500">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        {activeList.ratingScale === 10 ||
                                        place.rating > 5
                                          ? `${place.rating}/10`
                                          : place.rating}
                                      </span>
                                    )}

                                    {place.priceRange && (
                                      <span className="rounded-full border border-neutral-200/80 bg-neutral-100/80 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                                        {place.priceRange}
                                      </span>
                                    )}

                                    {place.operatingStatus &&
                                      place.operatingStatus !== 'open' && (
                                        <span
                                          className={cn(
                                            'rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide',
                                            place.operatingStatus ===
                                              'permanently_closed'
                                              ? 'border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                                              : 'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                                          )}
                                        >
                                          {place.operatingStatus ===
                                          'permanently_closed'
                                            ? 'Closed'
                                            : 'Temp. Closed'}
                                        </span>
                                      )}
                                  </div>

                                  <h3 className="mt-1 truncate text-sm font-bold text-neutral-900 dark:text-white">
                                    {place.name}
                                  </h3>
                                  <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">
                                    {place.subtitle}
                                  </p>
                                </div>

                                {place.externalUrl && (
                                  <a
                                    href={place.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    title="Open in Google Maps"
                                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-100/80 text-neutral-500 transition hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:text-sky-400"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>

                              {!isCompact &&
                                place.images &&
                                place.images.length > 0 && (
                                  <div
                                    className={cn(
                                      'mt-2.5 gap-1.5',
                                      place.images.length === 1
                                        ? 'block'
                                        : 'xplore-scroll flex overflow-x-auto pb-0.5'
                                    )}
                                  >
                                    {place.images.map((img, imgIdx) => {
                                      const thumbSrc = img.url.includes(
                                        'cdn.sanity.io'
                                      )
                                        ? `${img.url}?w=640&auto=format&fit=crop`
                                        : img.url
                                      return (
                                        <button
                                          key={`${img.url}-${imgIdx}`}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setLightbox({
                                              placeName: place.name,
                                              images: place.images!,
                                              index: imgIdx,
                                            })
                                          }}
                                          className={cn(
                                            'group relative overflow-hidden rounded-xl border border-neutral-200/70 bg-neutral-200/50 dark:border-white/10 dark:bg-white/5',
                                            place.images!.length === 1
                                              ? 'block h-36 w-full'
                                              : 'h-28 w-40 shrink-0'
                                          )}
                                        >
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={thumbSrc}
                                            alt={
                                              img.alt ||
                                              `${place.name} photo ${imgIdx + 1}`
                                            }
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                          />
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}

                              {!isCompact && place.notes && (
                                <p className="mt-2.5 whitespace-pre-line rounded-xl border border-neutral-200/60 bg-neutral-100/70 px-2.5 py-1.5 text-xs leading-relaxed text-neutral-700 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-neutral-300">
                                  “{place.notes}”
                                </p>
                              )}

                              {/* Additional Restaurant / Dining Metadata */}
                              {!isCompact &&
                                (place.cuisine ||
                                  place.wouldGoAgain ||
                                  place.lastVisited ||
                                  (place.recommendedDishes &&
                                    place.recommendedDishes.length > 0)) && (
                                  <div className="mt-2.5 space-y-1.5 border-t border-neutral-200/60 pt-2 dark:border-white/[0.07]">
                                    {(place.cuisine ||
                                      place.wouldGoAgain ||
                                      place.lastVisited) && (
                                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                        {place.cuisine && (
                                          <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200/80 bg-neutral-100/70 px-1.5 py-0.5 font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
                                            <Utensils className="h-2.5 w-2.5 text-amber-500" />
                                            {place.cuisine}
                                          </span>
                                        )}

                                        {place.wouldGoAgain && (
                                          <span
                                            className={cn(
                                              'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-semibold',
                                              place.wouldGoAgain === 'yes'
                                                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                                : place.wouldGoAgain === 'maybe'
                                                  ? 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                                                  : 'border-neutral-300/80 bg-neutral-100/70 text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400'
                                            )}
                                          >
                                            <RotateCcw className="h-2.5 w-2.5" />
                                            {place.wouldGoAgain === 'yes'
                                              ? 'Would go again'
                                              : place.wouldGoAgain === 'maybe'
                                                ? 'Maybe again'
                                                : 'Once was enough'}
                                          </span>
                                        )}

                                        {place.lastVisited && (
                                          <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200/70 bg-neutral-100/50 px-1.5 py-0.5 text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400">
                                            <Calendar className="h-2.5 w-2.5" />
                                            {place.lastVisited.replace(/-/g, '/')}
                                          </span>
                                        )}
                                      </div>
                                    )}

                                    {place.recommendedDishes &&
                                      place.recommendedDishes.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1 text-[11px]">
                                          <span className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400">
                                            <Sparkles className="h-2.5 w-2.5" />
                                            Order:
                                          </span>
                                          {place.recommendedDishes.map((dish) => (
                                            <span
                                              key={dish}
                                              className="rounded-md border border-sky-500/20 bg-sky-500/[0.08] px-1.5 py-0.5 font-medium text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200"
                                            >
                                              {dish}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                  </div>
                                )}

                              {!isCompact && place.tags.length > 0 && (
                                <div className="mt-2.5 flex flex-wrap gap-1">
                                  {place.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="rounded-md border border-neutral-200/80 bg-neutral-100/80 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
                                    >
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </CardSpotlight>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        )}

        {/* FULL-SCREEN PHOTO LIGHTBOX */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-[90dvh] max-w-4xl flex-col items-center"
              >
                <div className="mb-3 flex w-full items-center justify-between gap-4 text-white">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">
                      {lightbox.placeName}
                    </div>
                    {(lightbox.images[lightbox.index].alt ||
                      lightbox.images.length > 1) && (
                      <div className="truncate text-xs text-neutral-300">
                        {[
                          lightbox.images[lightbox.index].alt,
                          lightbox.images.length > 1
                            ? `Photo ${lightbox.index + 1} of ${lightbox.images.length}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative flex items-center justify-center">
                  {lightbox.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev
                            ? {
                                ...prev,
                                index:
                                  (prev.index - 1 + prev.images.length) %
                                  prev.images.length,
                              }
                            : null
                        )
                      }
                      className="absolute left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      lightbox.images[lightbox.index].url.includes(
                        'cdn.sanity.io'
                      )
                        ? `${lightbox.images[lightbox.index].url}?w=1600&auto=format`
                        : lightbox.images[lightbox.index].url
                    }
                    alt={
                      lightbox.images[lightbox.index].alt || lightbox.placeName
                    }
                    className="max-h-[78dvh] max-w-[90vw] rounded-2xl border border-white/15 object-contain shadow-2xl"
                  />

                  {lightbox.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev
                            ? {
                                ...prev,
                                index: (prev.index + 1) % prev.images.length,
                              }
                            : null
                        )
                      }
                      className="absolute right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PlacesContext.Provider>
  )
}
