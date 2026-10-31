import React from 'react'

interface YoutubeEmbedProps {
  youtubeUrl: string
}

const YoutubeEmbed = ({
  youtubeUrl,
}: React.PropsWithChildren<YoutubeEmbedProps>) => {
  let youtubeId = ''
  try {
    const url = new URL(youtubeUrl)
    if (url.searchParams.get('v')) {
      youtubeId = url.searchParams.get('v') || ''
    } else {
      const parts = url.pathname.split('/').filter(Boolean)
      youtubeId = parts[parts.length - 1] || ''
    }
  } catch {
    const youtubeUrlComponents = youtubeUrl.split('/')
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
