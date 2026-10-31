import SmallHeroBanner from '../../components/SmallHeroBanner'
import { createClient } from '../../config/prismic'
import MainLayout from '../../containers/MainLayout'
import AlbumsList from './albums_list'
import { Suspense } from 'react'

export default function AlbumHomePage() {
  const albums = createClient().getAllByType('album', {
    orderings: {
      field: 'document.date',
      direction: 'desc',
    },
  })

  return (
    <MainLayout
      customHero={
        <SmallHeroBanner
          badge="Photography Stories"
          title="Albums"
          description="I take photos in my spare time — explore curated collections from my travels and adventures."
        />
      }
      pageTitle="Albums"
      pageMeta={{ description: 'Photography Albums', endpoint: '/albums' }}
    >
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl border border-neutral-200/80 bg-neutral-100/70 dark:border-white/10 dark:bg-neutral-900/50"
              />
            ))}
          </div>
        }
      >
        <AlbumsList data={albums} />
      </Suspense>
    </MainLayout>
  )
}
