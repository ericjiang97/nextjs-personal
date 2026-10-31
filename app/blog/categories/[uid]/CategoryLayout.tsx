import { PrismicDocument } from '@prismicio/types'
import React, { Suspense, use } from 'react'
import MainLayout from '../../../../containers/MainLayout'
import SmallHeroBanner from '../../../../components/SmallHeroBanner'
import { createClient } from '../../../../config/prismic'
import { filter } from '@prismicio/client'
import { BlogPosts } from '../../posts'

declare interface CategoryLayoutProps {
  category: Promise<PrismicDocument>
}

export default function CategoryLayout({
  category,
}: React.PropsWithChildren<CategoryLayoutProps>) {
  const categoryData = use(category)

  const categoryName = categoryData.data.category_name
  const title = `Blog - ${categoryName}`

  const posts = createClient().getAllByType('blog-post', {
    filters: [filter.at('my.blog-post.category', categoryData.id)],
    orderings: {
      field: 'document.last_publication_date',
      direction: 'desc',
    },
  })

  return (
    <MainLayout
      pageTitle={title}
      customHero={
        <SmallHeroBanner
          badge="Category Archive"
          title={categoryName}
          description={`Articles and thoughts filed under ${categoryName}.`}
        />
      }
      pageMeta={{
        description: title,
        endpoint: `/blog/categories/${categoryData.uid}`,
      }}
    >
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl border border-neutral-200/80 bg-neutral-100/70 p-6 dark:border-white/10 dark:bg-neutral-900/50"
              />
            ))}
          </div>
        }
      >
        <BlogPosts posts={posts} />
      </Suspense>
    </MainLayout>
  )
}
