'use client'

import { PrismicDocument } from '@prismicio/client'
import { PrismicText, SliceZone } from '@prismicio/react'
import moment from 'moment'
import React, { use } from 'react'
import ImagePreviewDialog from '../../../components/dialogs/ImagePreviewDialog'
import MainLayout from '../../../containers/MainLayout'
import { components } from '../../../slices'
import NotFoundPage from '../../not-found'
import { ImagePreviewContextProvider } from '../../../contexts/ImagePreviewContext'
import { Spotlight } from '../../../components/ui/spotlight'

declare interface AlbumPageProps {
  data: Promise<PrismicDocument>
}

const AlbumContent = ({ data }: React.PropsWithChildren<AlbumPageProps>) => {
  const album = use(data)

  if (!album) return <NotFoundPage />
  const { uid } = album
  if (!uid) return <NotFoundPage />

  const endpoint = `/album/${uid}`
  const firstPosted = moment(album.first_publication_date)
  const lastUpdated = moment(album.last_publication_date)

  const isDateSame = firstPosted.isSameOrBefore(lastUpdated)

  return (
    <MainLayout
      pageTitle="Album"
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
                <PrismicText field={album.data.title} />
              </h1>
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col">
              <SliceZone components={components} slices={album.data.body} />
            </div>
          </div>
        </div>
        <ImagePreviewDialog />
      </ImagePreviewContextProvider>
    </MainLayout>
  )
}

export default AlbumContent
