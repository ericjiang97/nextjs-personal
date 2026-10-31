'use client'
import React from 'react'
import Link from 'next/link'
import { IconArrowUpRight, IconRss } from '@tabler/icons-react'

import { IPrismicDocumentRecord } from '../../types'
import BlogCard from '../cards/BlogCard'

interface BlogHeroProps {
  posts: IPrismicDocumentRecord[]
}

const BlogHero = ({ posts }: React.PropsWithChildren<BlogHeroProps>) => {
  if (!posts || posts.length === 0) return null

  return (
    <section className="relative w-full">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
            Articles &amp; Deep Dives
          </span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Latest from the Blog
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/blog/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:border-amber-500/40 hover:text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-amber-400"
          >
            <IconRss className="h-3.5 w-3.5 text-amber-500" />
            <span>RSS</span>
          </a>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400"
          >
            <span>View all {posts.length} articles</span>
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.uid} post={post} />
        ))}
      </div>
    </section>
  )
}

export default BlogHero
