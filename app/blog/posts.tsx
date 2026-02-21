'use client'

import { PrismicDocument } from '@prismicio/client'
import { use } from 'react'
import BlogCard from '../../components/cards/BlogCard'

export function BlogPosts({ posts }: { posts: Promise<PrismicDocument[]> }) {
  const allPosts = use(posts)

  return (
    <div className="flex flex-col gap-4 pt-10">
      {allPosts.map((post: PrismicDocument) => {
        return <BlogCard post={post} key={post.uid} />
      })}
    </div>
  )
}
