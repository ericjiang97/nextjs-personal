import { PrismicDocument } from '@prismicio/client'
import { Suspense } from 'react'
import SmallHeroBanner from '../../components/SmallHeroBanner'
import { createClient } from '../../config/prismic'
import MainLayout from '../../containers/MainLayout'
import { BlogPosts } from './posts'

function BlogPage() {
  const page: Promise<PrismicDocument[]> = createClient().getAllByType(
    'blog-post',
    {
      orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
      },
    }
  )

  return (
    <MainLayout
      pageTitle="Blog"
      customHero={
        <SmallHeroBanner
          title="Blog"
          description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
        />
      }
      pageMeta={{
        description:
          "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them",
        endpoint: '/blog',
      }}
    >
      <div className="px-4 pt-0 pb-20 sm:px-6 lg:px-4 lg:pt-0 lg:pb-28">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
            <BlogPosts posts={page} />
          </div>
        </Suspense>
      </div>
    </MainLayout>
  )
}

export default BlogPage
