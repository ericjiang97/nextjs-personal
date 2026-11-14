import React from 'react'
import { stegaClean } from 'next-sanity'

interface YoutubeEmbedProps {
  youtubeUrl: string
}

const YoutubeEmbed = ({
  youtubeUrl,
}: React.PropsWithChildren<YoutubeEmbedProps>) => {
  const rawUrl = stegaClean(youtubeUrl) || ''
  let youtubeId = ''
  try {
    const url = new URL(rawUrl)
    if (url.searchParams.get('v')) {
      youtubeId = url.searchParams.get('v') || ''
    } else {
      const parts = url.pathname.split('/').filter(Boolean)
      youtubeId = parts[parts.length - 1] || ''
    }
  } catch {
    const youtubeUrlComponents = rawUrl.split('/')
    youtubeId = youtubeUrlComponents[youtubeUrlComponents.length - 1]
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-black shadow-lg dark:border-white/10">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute inset-0 h-full w-full"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YoutubeEmbed
