import SmallHeroBanner from '../../components/SmallHeroBanner'
import MainLayout from '../../containers/MainLayout'
import { BlogPosts } from './posts'
import { sanityFetch } from '../../sanity/lib/live'
import { BLOG_POSTS_QUERY } from '../../sanity/lib/queries'
import { DEFAULT_SITE_SETTINGS } from '../../sanity/lib/defaults'

export default async function BlogPage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: BLOG_POSTS_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const settings = { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}) }
  const posts = data?.posts || []

  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          badge={settings.blogHeroBadge}
          title={settings.blogHeroTitle || 'Blog'}
          description={settings.blogHeroDescription || ''}
        />
      }
      pageMeta={{
        description:
          "I occasionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them",
        endpoint: '/blog',
      }}
    >
      <div className="pb-12">
        <BlogPosts posts={posts} />
      </div>
    </MainLayout>
  )
}
