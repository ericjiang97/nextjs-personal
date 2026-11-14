'use client'

import React from 'react'
import { stegaClean } from 'next-sanity'
import moment from 'moment'
import { IconArrowUpRight, IconCalendar } from '@tabler/icons-react'
import { CardSpotlight } from '../../components/ui/card-spotlight'
import { SanityAlbum } from '../../sanity/lib/queries'

export interface AlbumsListProps {
  albums: SanityAlbum[]
}

export default function AlbumsList({
  albums,
}: React.PropsWithChildren<AlbumsListProps>) {
  if (!albums || albums.length === 0) {
    return (
      <div className="pb-16">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white/60 py-16 text-center backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/50">
          <p className="text-lg font-bold text-neutral-900 dark:text-white">
            No photo albums published yet
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {albums.map((album) => {
          const cleanSlug = stegaClean(album.slug)
          const firstPosted = moment(
            stegaClean(album.publishedAt || album._createdAt)
          )
          const lastUpdated = moment(
            stegaClean(
              album.updatedAt || album._updatedAt || album.publishedAt
            )
          )
          const isDateSame = firstPosted.isSameOrBefore(lastUpdated)
          const coverUrl = stegaClean(album.featuredImage?.url)

          return (
            <CardSpotlight
              key={album._id || cleanSlug}
              className="group flex flex-col justify-between overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                {coverUrl && (
                  <a
                    href={`/albums/${cleanSlug}`}
                    className="relative mb-5 block h-64 w-full overflow-hidden rounded-xl border border-neutral-200/60 dark:border-white/10"
                  >
                    <img
                      src={coverUrl}
                      alt={stegaClean(album.featuredImage?.alt) || ''}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                )}

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    <IconCalendar className="h-3.5 w-3.5 text-sky-500" />
                    {!isDateSame
                      ? `Posted: ${firstPosted.format('DD MMMM YYYY')}`
                      : `Updated: ${lastUpdated.format('DD MMMM YYYY')}`}
                  </span>
                </div>

                <a href={`/albums/${cleanSlug}`} className="mt-2 block">
                  <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                    {album.title}
                  </h3>
                </a>
              </div>

              <div className="mt-5">
                <a
                  href={`/albums/${cleanSlug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400"
                >
                  <span>View Album</span>
                  <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </CardSpotlight>
          )
        })}
      </div>
    </div>
  )
}
