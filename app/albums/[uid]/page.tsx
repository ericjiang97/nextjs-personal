import NotFoundPage from '../../not-found'
import AlbumContent from './albumcontent'
import { sanityFetch } from '../../../sanity/lib/live'
import { client } from '../../../sanity/lib/client'
import {
  ALBUM_BY_SLUG_QUERY,
  ALBUM_SLUGS_QUERY,
  SanityAlbum,
} from '../../../sanity/lib/queries'

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params
  if (!uid) return <NotFoundPage />

  let album: SanityAlbum | null = null
  try {
    const res = await sanityFetch({
      query: ALBUM_BY_SLUG_QUERY,
      params: { slug: uid },
    })
    album = res.data as SanityAlbum | null
  } catch {
    album = null
  }

  if (!album) return <NotFoundPage />

  return <AlbumContent album={album} />
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(ALBUM_SLUGS_QUERY, {}, { stega: false })
    return (slugs || []).filter((s: any) => s?.uid)
  } catch {
    return []
  }
}
