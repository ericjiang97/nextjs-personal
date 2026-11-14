'use client'

import moment from 'moment'
import React from 'react'
import { stegaClean } from 'next-sanity'
import ImagePreviewDialog from '../../../components/dialogs/ImagePreviewDialog'
import MainLayout from '../../../containers/MainLayout'
import NotFoundPage from '../../not-found'
import { ImagePreviewContextProvider } from '../../../contexts/ImagePreviewContext'
import { Spotlight } from '../../../components/ui/spotlight'
import SanitySlices from '../../../components/SanitySlices'
import SanityPortableText from '../../../components/SanityPortableText'
import { SanityAlbum } from '../../../sanity/lib/queries'

interface AlbumPageProps {
  album: SanityAlbum
}

const AlbumContent = ({ album }: React.PropsWithChildren<AlbumPageProps>) => {
  if (!album) return <NotFoundPage />
  const cleanSlug = stegaClean(album.slug)
  if (!cleanSlug) return <NotFoundPage />

  const endpoint = `/albums/${cleanSlug}`
  const firstPosted = moment(stegaClean(album.publishedAt || album._createdAt))
  const lastUpdated = moment(
    stegaClean(album.updatedAt || album._updatedAt || album.publishedAt)
  )

  const isDateSame = firstPosted.isSameOrBefore(lastUpdated)

  return (
    <MainLayout
      pageTitle={`Album - ${stegaClean(album.title)}`}
      pageMeta={{
        endpoint,
      }}
    >
      <ImagePreviewContextProvider>
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 px-4 py-12 shadow-sm backdrop-blur-md sm:px-8 dark:border-white/[0.08] dark:bg-neutral-900/70">
          <Spotlight className="-top-32 left-0" fill="#38bdf8" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-sky-600 uppercase dark:text-sky-300">
                {!isDateSame
                  ? `Posted on: ${firstPosted.format('DD MMMM YYYY')}`
                  : `Last Updated: ${lastUpdated.format('DD MMMM YYYY')}`}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
                {album.title}
              </h1>
              {album.description && album.description.length > 0 && (
                <div className="mt-4 text-neutral-600 dark:text-neutral-300">
                  <SanityPortableText value={album.description} />
                </div>
              )}
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col">
              <SanitySlices slices={album.slices} />
            </div>
          </div>
        </div>
        <ImagePreviewDialog />
      </ImagePreviewContextProvider>
    </MainLayout>
  )
}

export default AlbumContent
