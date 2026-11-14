'use client'

import React from 'react'
import { stegaClean } from 'next-sanity'
import ReactBeforeSliderComponent from 'react-before-after-slider-component'
import 'react-before-after-slider-component/dist/build.css'

import DownloadImageButton from '../buttons/DownloadImageButton'
import SanityPortableText from '../SanityPortableText'
import {
  showModal,
  useImagePreviewDispatch,
} from '../../contexts/ImagePreviewContext'
import { SanityAlbumSlice } from '../../sanity/lib/queries'

export default function SanitySlices({
  slices,
}: {
  slices?: SanityAlbumSlice[] | null
}) {
  const dispatch = useImagePreviewDispatch()

  if (!slices || slices.length === 0) return null

  return (
    <>
      {slices.map((slice, idx) => {
        const key = slice._key || String(idx)

        switch (slice._type) {
          case 'singleImageSlice': {
            const imgUrl = stegaClean(slice.image?.url)
            return (
              <figure
                key={key}
                className="my-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                {imgUrl && slice.image && (
                  <div
                    className="cursor-zoom-in overflow-hidden rounded-xl"
                    onClick={() => showModal(dispatch, slice.image!)}
                  >
                    <img
                      src={imgUrl}
                      alt={
                        stegaClean(slice.image.alt) ||
                        stegaClean(slice.description) ||
                        ''
                      }
                      className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                )}
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                  {slice.description && (
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {slice.description}
                    </div>
                  )}
                  {slice.image && (
                    <div className="ml-auto">
                      <DownloadImageButton image={slice.image} />
                    </div>
                  )}
                </figcaption>
              </figure>
            )
          }

          case 'imageGroupSlice': {
            return (
              <div key={key} className="my-8">
                {slice.title && (
                  <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                    {slice.title}
                  </h2>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(slice.images || []).map((img, i) => {
                    const imgUrl = stegaClean(img?.url)
                    if (!imgUrl) return null
                    const span = (i + 1) % 3 === 0 ? 'sm:col-span-2' : ''
                    return (
                      <div
                        key={i}
                        className={`group cursor-zoom-in overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-white/10 ${span}`}
                        onClick={() => showModal(dispatch, img)}
                      >
                        <img
                          src={imgUrl}
                          alt={stegaClean(img?.alt) || ''}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          case 'beforeAfterSlice': {
            const beforeUrl = stegaClean(slice.beforeImage?.url)
            const afterUrl = stegaClean(slice.afterImage?.url)
            return (
              <div
                key={key}
                className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 dark:border-white/10 dark:bg-white/[0.03]"
              >
                {slice.title && (
                  <h2 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">
                    {slice.title}
                  </h2>
                )}
                <div className="w-full overflow-hidden rounded-xl">
                  {beforeUrl && afterUrl && (
                    <ReactBeforeSliderComponent
                      firstImage={{
                        alt: stegaClean(slice.beforeImage?.alt) || '',
                        imageUrl: beforeUrl,
                      }}
                      secondImage={{
                        alt: stegaClean(slice.afterImage?.alt) || '',
                        imageUrl: afterUrl,
                      }}
                      className="w-full"
                    />
                  )}
                </div>
                {afterUrl && slice.afterImage && (
                  <div className="mt-3 flex w-full justify-end">
                    <DownloadImageButton image={slice.afterImage} />
                  </div>
                )}
              </div>
            )
          }

          case 'imageWithTextSlice': {
            const pos = stegaClean(slice.position)
            const imgUrl = stegaClean(slice.image?.url)
            return (
              <section key={key} className="mt-3 flex flex-wrap gap-4">
                {(pos === null || pos === undefined || pos === 'left') &&
                  imgUrl && (
                    <div className="flex-2 overflow-hidden rounded-2xl">
                      <img
                        src={imgUrl}
                        alt={stegaClean(slice.image?.alt) || ''}
                        className="rounded-2xl"
                      />
                    </div>
                  )}
                <div className="min-w-[300px] flex-1 px-2 py-2">
                  <SanityPortableText value={slice.text} />
                </div>
                {pos === 'right' && imgUrl && (
                  <div className="min-w-[300px] flex-1 overflow-hidden rounded-2xl">
                    <img
                      src={imgUrl}
                      alt={stegaClean(slice.image?.alt) || ''}
                      className="rounded-2xl"
                    />
                  </div>
                )}
              </section>
            )
          }

          case 'richTextSlice':
            return (
              <div key={key} className="w-full">
                <SanityPortableText value={slice.text} />
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}
