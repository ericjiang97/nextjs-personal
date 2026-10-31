'use client'

import React, { useState, useMemo } from 'react'
import SmallHeroBanner from '../../../components/SmallHeroBanner'
import MainLayout from '../../../containers/MainLayout'
import { wallpapers } from '../../../data/wallpapers'
import { FocusCards, FocusCardItem } from '../../../components/ui/focus-cards'
import { cn } from '../../../utils/cn'

const FILTERS = ['all', 'desktop', 'mobile', 'japan', 'nature', 'china'] as const

const WallpapersPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const cards: FocusCardItem[] = useMemo(() => {
    return wallpapers
      .filter((w) => {
        if (activeFilter === 'all') return true
        if (activeFilter === 'desktop' || activeFilter === 'mobile') {
          return w.type === activeFilter
        }
        return w.tags?.some((t) => t.toLowerCase().includes(activeFilter))
      })
      .map((wallpaper) => {
        const { slug } = wallpaper
        const publicRootDir = '/downloads/wallpapers'
        const previewUri = `${publicRootDir}/${slug}/${
          wallpaper.previewFileName ?? 'preview.webp'
        }`
        const downloadUri = `${publicRootDir}/${slug}/${slug}.${
          wallpaper.extension ?? 'jpg'
        }`

        return {
          title: wallpaper.title,
          src: previewUri,
          href: downloadUri,
          tags: wallpaper.tags,
          type: wallpaper.type,
        }
      })
  }, [activeFilter])

  return (
    <MainLayout
      pageTitle="Media - Wallpapers"
      customHero={
        <SmallHeroBanner
          badge="4K • 5K • 6K Display P3"
          title="Wallpapers"
          description="Photos edited and colour-calibrated as wallpapers for Mac & high-DPI displays. Hover any card to focus, or click to download full-resolution P3 images."
        />
      }
      pageMeta={{
        description:
          'Some of my photos edited and optimised as wallpapers, optimised for Mac & Other Displays. Includes support for 4K, 5K & 6K displays, in addition to P3 color profiles for more vibrant colors.',
        endpoint: '/media/wallpapers',
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => {
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

        {/* Aceternity Focus Cards Gallery */}
        <FocusCards cards={cards} />
      </div>
    </MainLayout>
  )
}

export default WallpapersPage
