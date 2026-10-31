import React from 'react'
import { SliceComponentType } from '@prismicio/react'
import { ImageField } from '@prismicio/types'
import {
  showModal,
  useImagePreviewDispatch,
} from '../../contexts/ImagePreviewContext'

const ImageGroup: SliceComponentType = ({ slice }) => {
  const dispatch = useImagePreviewDispatch()
  const { title } = slice.primary

  return (
    <div className="my-8">
      {title && (
        <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {slice.items.map((item: { image: ImageField }, i: number) => {
          const span = (i + 1) % 3 === 0 ? 'sm:col-span-2' : ''
          if (!item.image.url) return null

          return (
            <div
              className={`group cursor-zoom-in overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-white/10 ${span}`}
              key={i}
              onClick={() => {
                showModal(dispatch, item.image)
              }}
            >
              <img
                src={item.image.url}
                alt={item.image.alt || ''}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGroup
