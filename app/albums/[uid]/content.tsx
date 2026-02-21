'use client'

import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '../../../config/prismic'
import MainLayout from '../../../containers/MainLayout'
import NotFoundPage from '../../not-found'
import AlbumContent from './albumcontent'
import SmallHeroBanner from '../../../components/SmallHeroBanner'

export default function Content() {
  const uid = useParams().uid as string
  if (!uid || uid.length === 0) return <NotFoundPage />

  const album = createClient().getByUID('album', uid)
  if (!album) return <NotFoundPage />

  const endpoint = `/album/${uid}`

  return (
    <Suspense
      fallback={
        <MainLayout
          pageTitle="Album"
          pageMeta={{
            endpoint,
            description: '',
            imageUrl: `https://ericjiang.dev/api/static?album=${uid}`,
          }}
          customHero={
            <SmallHeroBanner
              title="Albums"
              description="I take photos in my spare time."
            />
          }
        >
          <div>Loading...</div>
        </MainLayout>
      }
    >
      <AlbumContent data={album} />
    </Suspense>
  )
}
