'use client'

import React, { useState, useMemo } from 'react'
import { stegaClean } from 'next-sanity'
import SmallHeroBanner from '../../../components/SmallHeroBanner'
import MainLayout from '../../../containers/MainLayout'
import { FocusCards, FocusCardItem } from '../../../components/ui/focus-cards'
import { cn } from '../../../utils/cn'
import {
  SanitySiteSettings,
  SanityWallpaper,
} from '../../../sanity/lib/queries'
import { DEFAULT_SITE_SETTINGS } from '../../../sanity/lib/defaults'

export default function WallpapersClient({
  settings,
  wallpapers,
}: {
  settings: SanitySiteSettings
  wallpapers: SanityWallpaper[]
}) {
  const filters =
    settings.wallpaperFilters && settings.wallpaperFilters.length > 0
      ? settings.wallpaperFilters.map((f) => stegaClean(f))
      : DEFAULT_SITE_SETTINGS.wallpaperFilters!

  const [activeFilter, setActiveFilter] = useState<string>('all')

  const cards: FocusCardItem[] = useMemo(() => {
    return wallpapers
      .filter((w) => {
        const cleanType = stegaClean(w.type)
        if (activeFilter === 'all') return true
        if (activeFilter === 'desktop' || activeFilter === 'mobile') {
          return cleanType === activeFilter
        }
        return w.tags?.some((t) =>
          stegaClean(t).toLowerCase().includes(activeFilter)
        )
      })
      .map((wallpaper) => {
        const cleanSlug = stegaClean(wallpaper.slug)
        const cleanType = (stegaClean(wallpaper.type) || 'desktop') as
          | 'desktop'
          | 'mobile'
        const publicRootDir = '/downloads/wallpapers'
        const previewUri =
          stegaClean(wallpaper.previewImageUrl) ||
          `${publicRootDir}/${cleanSlug}/${
            stegaClean(wallpaper.previewFileName) || 'preview.webp'
          }`
        const downloadUri =
          stegaClean(wallpaper.fullResFileUrl) ||
          `${publicRootDir}/${cleanSlug}/${cleanSlug}.${
            stegaClean(wallpaper.extension) || 'jpg'
          }`

        return {
          title: wallpaper.title,
          src: previewUri,
          href: downloadUri,
          tags: wallpaper.tags || [],
          type: cleanType,
        }
      })
  }, [activeFilter, wallpapers])

  return (
    <MainLayout
      pageTitle="Media - Wallpapers"
      customHero={
        <SmallHeroBanner
          badge={settings.wallpapersHeroBadge}
          title={settings.wallpapersHeroTitle || 'Wallpapers'}
          description={settings.wallpapersHeroDescription || ''}
        />
      }
      pageMeta={{
        description:
          'Some of my photos edited and optimised as wallpapers, optimised for Mac & Other Displays. Includes support for 4K, 5K & 6K displays, in addition to P3 color profiles for more vibrant colors.',
        endpoint: '/media/wallpapers',
      }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const isSelected = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide capitalize transition-all duration-200',
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'border border-neutral-200/80 bg-white/80 text-neutral-600 hover:border-sky-500/40 hover:text-neutral-900 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:text-white'
                )}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <FocusCards cards={cards} />
      </div>
    </MainLayout>
  )
}
