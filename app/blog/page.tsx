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
          badge="Articles & Thoughts"
          title="Blog"
          description="I occasionally write on my blog about tech, projects, food, reviews (and photography & travel)... so here's some of them."
        />
      }
      pageMeta={{
        description:
          "I occasionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them",
        endpoint: '/blog',
      }}
    >
      <div className="pb-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-2xl border border-neutral-200/80 bg-neutral-100/70 p-6 dark:border-white/10 dark:bg-neutral-900/50"
                />
              ))}
            </div>
          }
        >
          <BlogPosts posts={page} />
        </Suspense>
      </div>
    </MainLayout>
  )
}

export default BlogPage
