import React from 'react'
import { ImageField, KeyTextField } from '@prismicio/types'
import DownloadImageButton from '../../components/buttons/DownloadImageButton'
import {
  showModal,
  useImagePreviewDispatch,
} from '../../contexts/ImagePreviewContext'

interface SingleImageProps {
  slice: {
    primary: {
      image: ImageField
      description: KeyTextField
    }
  }
}

const SingleImage = ({ slice }: React.PropsWithChildren<SingleImageProps>) => {
  const dispatch = useImagePreviewDispatch()

  const { image, description } = slice.primary
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      {image && image.url && (
        <div
          className="cursor-zoom-in overflow-hidden rounded-xl"
          onClick={() => {
            showModal(dispatch, image)
          }}
        >
          <img
            src={image.url}
            alt={image.alt || description || ''}
            className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      )}
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
        {description && (
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {description}
          </div>
        )}
        <div className="ml-auto">
          <DownloadImageButton image={image} />
        </div>
      </figcaption>
    </figure>
  )
}

export default SingleImage
