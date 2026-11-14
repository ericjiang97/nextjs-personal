import SmallHeroBanner from '../../components/SmallHeroBanner'
import MainLayout from '../../containers/MainLayout'
import AlbumsList from './albums_list'
import { sanityFetch } from '../../sanity/lib/live'
import { ALBUMS_PAGE_QUERY } from '../../sanity/lib/queries'
import { DEFAULT_SITE_SETTINGS } from '../../sanity/lib/defaults'

export default async function AlbumHomePage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: ALBUMS_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const settings = { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}) }
  const albums = data?.albums || []

  return (
    <MainLayout
      customHero={
        <SmallHeroBanner
          badge={settings.albumsHeroBadge}
          title={settings.albumsHeroTitle || 'Albums'}
          description={settings.albumsHeroDescription || ''}
        />
      }
      pageTitle="Albums"
      pageMeta={{ description: 'Photography Albums', endpoint: '/albums' }}
    >
      <AlbumsList albums={albums} />
    </MainLayout>
  )
}
