'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../providers/ThemeProvider'
import type * as LeafletNS from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Building2,
  Calendar,
  Coffee,
  Compass,
  Crosshair,
  ExternalLink,
  Layers,
  Loader2,
  MapPin as MapPinIcon,
  Maximize2,
  RotateCcw,
  Sparkles,
  Star,
  Utensils,
  X,
} from 'lucide-react'
import type {
  OperatingStatus,
  PlacePhoto,
  PriceRange,
  PrimaryTag,
  WouldGoAgain,
} from '../../types/places'
import { cn } from '../../utils/cn'

export interface MapPin {
  id: string
  name: string
  subtitle: string
  address?: string
  country?: string
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

interface LeafletMapProps {
  pins: MapPin[]
  fitBoundsKey?: string
  drawerOpen?: boolean
  ratingScale?: 5 | 10
  selectedPinId?: string | null
  focusCoords?: { lat: number; lng: number; zoom?: number } | null
  onSelectPin?: (pin: MapPin | null) => void
  onOpenPhoto?: (pin: MapPin, index: number) => void
  className?: string
}

type MapStyleId = 'auto' | 'light' | 'dark' | 'osm'

const TILE_CONFIGS: Record<
  Exclude<MapStyleId, 'auto'>,
  { label: string; url: string; attribution: string; darkFilter?: boolean }
> = {
  light: {
    label: 'Light',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; OpenStreetMap contributors',
  },
  dark: {
    label: 'Dark',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; OpenStreetMap contributors',
    darkFilter: true,
  },
  osm: {
    label: 'OSM',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}

function createPinHtml(primaryTag: PrimaryTag, isSelected: boolean): string {
  const palette =
    primaryTag === 'restaurant'
      ? {
          bg: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          ring: 'rgba(245, 158, 11, 0.65)',
          glyph: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
        }
      : primaryTag === 'cafe'
        ? {
            bg: 'linear-gradient(135deg, #10b981, #0d9488)',
            ring: 'rgba(16, 185, 129, 0.65)',
            glyph: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
          }
        : primaryTag === 'city'
          ? {
              bg: 'linear-gradient(135deg, #0ea5e9, #4f46e5)',
              ring: 'rgba(14, 165, 233, 0.65)',
              glyph: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
            }
          : {
              bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              ring: 'rgba(139, 92, 246, 0.65)',
              glyph: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
            }

  const size = isSelected ? 42 : 34
  return `
    <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
      ${
        isSelected
          ? `<span style="position:absolute;inset:-8px;border-radius:9999px;background:${palette.ring};filter:blur(7px);"></span>`
          : ''
      }
      <div style="
        position:relative;
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${palette.bg};
        border:2.5px solid rgba(255,255,255,0.95);
        box-shadow:0 8px 22px rgba(15,23,42,0.42);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        ${palette.glyph}
      </div>
    </div>
  `
}

export default function LeafletMap({
  pins,
  fitBoundsKey,
  drawerOpen = true,
  ratingScale = 5,
  selectedPinId,
  focusCoords,
  onSelectPin,
  onOpenPhoto,
  className,
}: LeafletMapProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const leafletModRef = useRef<typeof LeafletNS | null>(null)
  const mapRef = useRef<LeafletNS.Map | null>(null)
  const tileLayerRef = useRef<LeafletNS.TileLayer | null>(null)
  const activeTileUrlRef = useRef<string | null>(null)
  const markersLayerRef = useRef<LeafletNS.LayerGroup | null>(null)
  const lastFittedKeyRef = useRef<string | null>(null)
  const onSelectPinRef = useRef(onSelectPin)

  const [mapReady, setMapReady] = useState(false)
  const [mapStylePref, setMapStylePref] = useState<MapStyleId>('auto')
  const [locating, setLocating] = useState(false)

  const effectiveStyle: Exclude<MapStyleId, 'auto'> =
    mapStylePref === 'auto'
      ? resolvedTheme === 'dark'
        ? 'dark'
        : 'light'
      : mapStylePref

  useEffect(() => {
    onSelectPinRef.current = onSelectPin
  }, [onSelectPin])

  const selectedPin = pins.find((p) => p.id === selectedPinId) || null

  const computeTopLeftPadding = (): [number, number] => {
    const isDesktop =
      typeof window !== 'undefined' && window.innerWidth >= 768
    return isDesktop && drawerOpen ? [465, 92] : [48, 92]
  }

  useEffect(() => {
    let cancelled = false
    let resizeObserver: ResizeObserver | null = null

    async function setupMap() {
      const mod = await import('leaflet')
      const L = ((mod as unknown as { default?: typeof LeafletNS }).default ??
        mod) as typeof LeafletNS

      if (cancelled || !containerRef.current) return

      const el = containerRef.current as HTMLDivElement & {
        _leaflet_id?: number | null
      }
      if (el._leaflet_id) {
        el._leaflet_id = null
      }

      const initialCenter: [number, number] =
        pins.length > 0 ? [pins[0].lat, pins[0].lng] : [35.6764, 139.65]

      const map = L.map(el, {
        center: initialCenter,
        zoom: pins.length > 0 ? 11 : 4,
        zoomControl: false,
        preferCanvas: true,
      })

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      const cfg = TILE_CONFIGS[effectiveStyle]
      const tileLayer = L.tileLayer(cfg.url, {
        attribution: cfg.attribution,
        maxZoom: 19,
      }).addTo(map)

      const markersGroup = L.layerGroup().addTo(map)

      leafletModRef.current = L
      mapRef.current = map
      tileLayerRef.current = tileLayer
      activeTileUrlRef.current = cfg.url
      markersLayerRef.current = markersGroup

      requestAnimationFrame(() => {
        if (!cancelled) {
          map.invalidateSize()
          setMapReady(true)
        }
      })

      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize()
      })
      resizeObserver.observe(el)
    }

    setupMap()

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      tileLayerRef.current = null
      activeTileUrlRef.current = null
      markersLayerRef.current = null
      leafletModRef.current = null
      lastFittedKeyRef.current = null
      setMapReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Switch basemap tiles only when the underlying tile URL changes (keeps Light <-> Dark theme toggle instant!)
  useEffect(() => {
    const L = leafletModRef.current
    const map = mapRef.current
    if (!mapReady || !L || !map) return

    const cfg = TILE_CONFIGS[effectiveStyle]
    if (activeTileUrlRef.current === cfg.url && tileLayerRef.current) {
      return
    }

    if (tileLayerRef.current) {
      tileLayerRef.current.remove()
    }
    const nextLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: 19,
    }).addTo(map)
    tileLayerRef.current = nextLayer
    activeTileUrlRef.current = cfg.url
  }, [effectiveStyle, mapReady])

  // Render pins & smoothly frame bounds when active list changes
  useEffect(() => {
    const L = leafletModRef.current
    const group = markersLayerRef.current
    if (!mapReady || !L || !group) return

    group.clearLayers()

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId
      const size = isSelected ? 42 : 34
      const icon = L.divIcon({
        className: 'xplore-custom-pin',
        html: createPinHtml(pin.primaryTag, isSelected),
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const marker = L.marker([pin.lat, pin.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      })

      const safeName = pin.name.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      marker.bindTooltip(
        `<div style="font-weight:600;font-size:12px;">${safeName}</div><div style="font-size:10px;opacity:0.75;">#${pin.primaryTag}</div>`,
        {
          direction: 'top',
          offset: [0, -18],
          opacity: 0.96,
        }
      )

      marker.on('click', () => {
        onSelectPinRef.current?.(pin)
      })

      marker.addTo(group)
    })

    const key = fitBoundsKey || 'default'
    const isFirstFit = lastFittedKeyRef.current === null
    if (lastFittedKeyRef.current !== key && pins.length > 0 && mapRef.current) {
      lastFittedKeyRef.current = key
      const paddingTopLeft = computeTopLeftPadding()
      if (pins.length === 1) {
        if (isFirstFit) {
          mapRef.current.setView([pins[0].lat, pins[0].lng], 12)
        } else {
          mapRef.current.flyTo([pins[0].lat, pins[0].lng], 12, { duration: 0.9 })
        }
      } else {
        const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]))
        if (isFirstFit) {
          mapRef.current.fitBounds(bounds, {
            paddingTopLeft,
            paddingBottomRight: [60, 60],
            maxZoom: 13,
          })
        } else {
          mapRef.current.flyToBounds(bounds, {
            paddingTopLeft,
            paddingBottomRight: [60, 60],
            maxZoom: 13,
            duration: 1.0,
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins, selectedPinId, mapReady, fitBoundsKey])

  // Smooth flyTo when user selects a place
  useEffect(() => {
    const map = mapRef.current
    if (!mapReady || !map || !focusCoords) return
    map.flyTo([focusCoords.lat, focusCoords.lng], focusCoords.zoom ?? 14, {
      duration: 0.95,
    })
  }, [focusCoords, mapReady])

  const handleFitBounds = () => {
    const L = leafletModRef.current
    const map = mapRef.current
    if (!L || !map || pins.length === 0) return
    if (pins.length === 1) {
      map.flyTo([pins[0].lat, pins[0].lng], 13, { duration: 0.9 })
      return
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]))
    map.flyToBounds(bounds, {
      paddingTopLeft: computeTopLeftPadding(),
      paddingBottomRight: [60, 60],
      maxZoom: 14,
      duration: 0.9,
    })
  }

  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapRef.current) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        const { latitude, longitude } = pos.coords
        mapRef.current?.flyTo([latitude, longitude], 14, { duration: 1.1 })
      },
      () => {
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const cycleMapStyle = () => {
    setMapStylePref((prev) => {
      if (prev === 'auto') return effectiveStyle === 'dark' ? 'light' : 'dark'
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'osm'
      return 'auto'
    })
  }

  const styleLabel =
    mapStylePref === 'auto'
      ? `Theme (${TILE_CONFIGS[effectiveStyle].label})`
      : TILE_CONFIGS[effectiveStyle].label

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-slate-100 dark:bg-neutral-950',
        TILE_CONFIGS[effectiveStyle].darkFilter && 'xplore-map-dark',
        className
      )}
    >
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {!mapReady && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/75 text-neutral-600 backdrop-blur-sm dark:bg-neutral-950/75 dark:text-neutral-300">
          <Compass className="h-7 w-7 animate-spin text-sky-500" />
          <span className="text-xs font-semibold tracking-wide">
            Loading Interactive Map…
          </span>
        </div>
      )}

      {/* Floating Top-Right Map Controls (positioned cleanly below floating NavBar) */}
      <div className="pointer-events-none absolute right-4 top-20 z-[450] flex items-center gap-1.5">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-neutral-200/85 bg-white/88 p-1 shadow-lg shadow-black/[0.06] backdrop-blur-xl dark:border-white/[0.12] dark:bg-neutral-950/85">
          <button
            type="button"
            onClick={handleFitBounds}
            title="Frame all visible pins"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            <Maximize2 className="h-3.5 w-3.5 text-sky-500" />
            <span>Fit Pins</span>
          </button>

          <button
            type="button"
            onClick={handleLocateMe}
            disabled={locating}
            title="Fly to my current location"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-50 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            {locating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-500" />
            ) : (
              <Crosshair className="h-3.5 w-3.5 text-emerald-500" />
            )}
            <span className="hidden sm:inline">Near Me</span>
          </button>

          <button
            type="button"
            onClick={cycleMapStyle}
            title="Cycle map style (Auto Theme / Light / Dark / OSM)"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-100/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-sky-500/40 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-sky-400/40"
          >
            <Layers className="h-3.5 w-3.5 text-sky-500" />
            <span>{styleLabel}</span>
          </button>
        </div>
      </div>

      {/* Selected Pin Floating Card (Bottom-Right, clear of left drawer & zoom controls) */}
      {selectedPin && (
        <div className="pointer-events-auto absolute bottom-5 right-14 z-[450] w-[calc(100vw-4.5rem)] max-w-sm rounded-3xl border border-neutral-200/85 bg-white/94 p-4 text-neutral-900 shadow-2xl backdrop-blur-2xl dark:border-white/[0.12] dark:bg-neutral-950/92 dark:text-neutral-100">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                    selectedPin.primaryTag === 'restaurant'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300'
                      : selectedPin.primaryTag === 'cafe'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300'
                        : selectedPin.primaryTag === 'city'
                          ? 'bg-sky-500/15 text-sky-600 dark:text-sky-300'
                          : 'bg-purple-500/15 text-purple-600 dark:text-purple-300'
                  )}
                >
                  {selectedPin.primaryTag === 'restaurant' ? (
                    <Utensils className="h-2.5 w-2.5" />
                  ) : selectedPin.primaryTag === 'cafe' ? (
                    <Coffee className="h-2.5 w-2.5" />
                  ) : selectedPin.primaryTag === 'city' ? (
                    <Building2 className="h-2.5 w-2.5" />
                  ) : (
                    <MapPinIcon className="h-2.5 w-2.5" />
                  )}
                  {selectedPin.primaryTag}
                </span>

                {typeof selectedPin.rating === 'number' && (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {ratingScale === 10 || selectedPin.rating > 5
                      ? `${selectedPin.rating}/10`
                      : selectedPin.rating}
                  </span>
                )}

                {selectedPin.operatingStatus &&
                  selectedPin.operatingStatus !== 'open' && (
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide',
                        selectedPin.operatingStatus === 'permanently_closed'
                          ? 'border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                          : 'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                      )}
                    >
                      {selectedPin.operatingStatus === 'permanently_closed'
                        ? 'Closed'
                        : 'Temp. Closed'}
                    </span>
                  )}

                {selectedPin.country && (
                  <span className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                    {selectedPin.country}
                  </span>
                )}
              </div>
              <h4 className="mt-1 truncate text-base font-bold text-neutral-900 dark:text-white">
                {selectedPin.name}
              </h4>
              <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">
                {selectedPin.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPin?.(null)}
              className="rounded-full p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {selectedPin.images && selectedPin.images.length > 0 && (
            <div
              className={cn(
                'mt-2.5 gap-1.5',
                selectedPin.images.length === 1
                  ? 'block'
                  : 'xplore-scroll flex overflow-x-auto pb-0.5'
              )}
            >
              {selectedPin.images.map((img, idx) => {
                const thumbSrc = img.url.includes('cdn.sanity.io')
                  ? `${img.url}?w=640&auto=format&fit=crop`
                  : img.url
                return (
                  <button
                    key={`${img.url}-${idx}`}
                    type="button"
                    onClick={() => onOpenPhoto?.(selectedPin, idx)}
                    className={cn(
                      'group relative overflow-hidden rounded-xl border border-neutral-200/70 bg-neutral-200/50 dark:border-white/10 dark:bg-white/5',
                      selectedPin.images!.length === 1
                        ? 'block h-32 w-full'
                        : 'h-24 w-36 shrink-0'
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbSrc}
                      alt={img.alt || `${selectedPin.name} photo ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>
                )
              })}
            </div>
          )}

          {selectedPin.notes && (
            <p className="mt-2.5 max-h-36 overflow-y-auto whitespace-pre-line rounded-xl border border-neutral-200/70 bg-neutral-100/80 px-3 py-2 text-xs text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              “{selectedPin.notes}”
            </p>
          )}

          {(selectedPin.cuisine ||
            selectedPin.wouldGoAgain ||
            selectedPin.lastVisited ||
            (selectedPin.recommendedDishes &&
              selectedPin.recommendedDishes.length > 0)) && (
            <div className="mt-2.5 space-y-1.5 border-t border-neutral-200/60 pt-2 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                {selectedPin.cuisine && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200/80 bg-neutral-100/70 px-1.5 py-0.5 font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                    <Utensils className="h-2.5 w-2.5 text-amber-500" />
                    {selectedPin.cuisine}
                  </span>
                )}
                {selectedPin.wouldGoAgain && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-semibold',
                      selectedPin.wouldGoAgain === 'yes'
                        ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : selectedPin.wouldGoAgain === 'maybe'
                          ? 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          : 'border-neutral-300/80 bg-neutral-100/70 text-neutral-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-400'
                    )}
                  >
                    <RotateCcw className="h-2.5 w-2.5" />
                    {selectedPin.wouldGoAgain === 'yes'
                      ? 'Would go again'
                      : selectedPin.wouldGoAgain === 'maybe'
                        ? 'Maybe again'
                        : 'Once was enough'}
                  </span>
                )}
                {selectedPin.lastVisited && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200/70 bg-neutral-100/50 px-1.5 py-0.5 text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400">
                    <Calendar className="h-2.5 w-2.5" />
                    {selectedPin.lastVisited.replace(/-/g, '/')}
                  </span>
                )}
              </div>

              {selectedPin.recommendedDishes &&
                selectedPin.recommendedDishes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 text-[11px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400">
                      <Sparkles className="h-2.5 w-2.5" />
                      Order:
                    </span>
                    {selectedPin.recommendedDishes.map((dish) => (
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

          {selectedPin.externalUrl && (
            <div className="mt-3 flex items-center justify-between border-t border-neutral-200/60 pt-2.5 dark:border-white/10">
              <span className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                {selectedPin.address}
              </span>
              <a
                href={selectedPin.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400"
              >
                <span>Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
