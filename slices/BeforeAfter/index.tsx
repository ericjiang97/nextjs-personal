import React from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component'
import 'react-before-after-slider-component/dist/build.css'

import { ImageField, KeyTextField } from '@prismicio/types'
import DownloadImageButton from '../../components/buttons/DownloadImageButton'

interface BeforeAfterSlice {
  slice: {
    primary: {
      before_image: ImageField
      after_image: ImageField
      title: KeyTextField
    }
  }
}

const BeforeAfter = ({ slice }: React.PropsWithChildren<BeforeAfterSlice>) => {
  const { before_image, after_image, title } = slice.primary
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      {title && (
        <h2 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">
          {title}
        </h2>
      )}
      <div className="w-full overflow-hidden rounded-xl">
        {before_image.url && after_image.url && (
          <ReactBeforeSliderComponent
            firstImage={{
              alt: before_image.alt || '',
              imageUrl: before_image.url,
            }}
            secondImage={{
              alt: after_image.alt || '',
              imageUrl: after_image.url,
            }}
            className="w-full"
          />
        )}
      </div>
      {after_image.url && (
        <div className="mt-3 flex w-full justify-end">
          <DownloadImageButton image={after_image} />
        </div>
      )}
    </div>
  )
}

export default BeforeAfter
