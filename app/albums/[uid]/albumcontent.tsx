'use client'

import { PrismicDocument } from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import { PrismicText, SliceZone } from '@prismicio/react'
import moment from 'moment'
import React, { use } from 'react'
import ImagePreviewDialog from '../../../components/dialogs/ImagePreviewDialog'
import MainLayout from '../../../containers/MainLayout'
import { components } from '../../../slices'
import NotFoundPage from '../../not-found'
import { ImagePreviewContextProvider } from '../../../contexts/ImagePreviewContext'

declare interface AlbumPageProps {
  data: Promise<PrismicDocument>
}

const AlbumContent = ({ data }: React.PropsWithChildren<AlbumPageProps>) => {
  const album = use(data)

  if (!album) return <NotFoundPage></NotFoundPage>
  const { uid } = album
  if (!uid) return <NotFoundPage></NotFoundPage>

  const endpoint = `/album/${uid}`
  const firstPosted = moment(album.first_publication_date)
  const lastUpdated = moment(album.last_publication_date)

  const isDateSame = firstPosted.isSameOrBefore(lastUpdated)

  return (
    <MainLayout
      pageTitle={`Album`}
      pageMeta={{
        endpoint,
      }}
    >
      <ImagePreviewContextProvider>
        <div className="relative overflow-hidden bg-white py-16">
          <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-prose grid-cols-1 divide-y-2 divide-none text-lg">
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-gray-500">
                {!isDateSame
                  ? `Posted on: ${firstPosted.format('DD MMMM YYYY')}`
                  : `Last Updated: ${lastUpdated.format('DD MMMM YYYY')}`}
              </span>
              <h1>
                <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  <PrismicText field={album.data.title} />
                </span>
              </h1>
            </div>

            <div className="mx-auto mt-4 flex w-full max-w-4xl flex-col">
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
