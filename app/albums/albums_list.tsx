'use client'

import { use } from 'react'
import moment from 'moment'
import * as prismicH from '@prismicio/helpers'
import { PrismicDocument } from '@prismicio/client'
import { IconArrowUpRight, IconCalendar } from '@tabler/icons-react'
import { CardSpotlight } from '../../components/ui/card-spotlight'

export declare interface AlbumsListProps {
  data: Promise<PrismicDocument[]>
}

export default function AlbumsList({
  data,
}: React.PropsWithChildren<AlbumsListProps>) {
  const albums: PrismicDocument[] = use(data)

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {albums.map((album: PrismicDocument) => {
          const { first_publication_date, last_publication_date, data } = album
          const firstPosted = moment(first_publication_date)
          const lastUpdated = moment(last_publication_date)
          const isDateSame = firstPosted.isSameOrBefore(lastUpdated)

          return (
            <CardSpotlight
              key={album.uid}
              className="group flex flex-col justify-between overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                {data.featured_image?.url && (
                  <a
                    href={`/albums/${album.uid}`}
                    className="relative mb-5 block h-64 w-full overflow-hidden rounded-xl border border-neutral-200/60 dark:border-white/10"
                  >
                    <img
                      src={data.featured_image.url}
                      alt={data.featured_image.alt || ''}
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

                <a href={`/albums/${album.uid}`} className="mt-2 block">
                  <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                    {prismicH.asText(data.title)}
                  </h3>
                </a>
              </div>

              <div className="mt-5">
                <a
                  href={`/albums/${album.uid}`}
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
