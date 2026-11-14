import React from 'react'
import { stegaClean } from 'next-sanity'
import { ArrowDownTrayIcon as DownloadIcon } from '@heroicons/react/24/solid'
import { SanityImageValue } from '../../../sanity/lib/queries'

interface DownloadImageButtonProps {
  image: SanityImageValue
}

const DownloadImageButton = ({
  image,
}: React.PropsWithChildren<DownloadImageButtonProps>) => {
  const cleanUrl = stegaClean(image?.url)
  if (!cleanUrl) {
    return null
  }
  return (
    <a
      href={cleanUrl.replace('?auto=compress,format', '')}
      target="_blank"
      rel="noreferrer noopener"
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-3 py-2 text-sm leading-4 font-medium text-white shadow-xs hover:bg-sky-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
    >
      <DownloadIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />
      Download Image
    </a>
  )
}

export default DownloadImageButton
