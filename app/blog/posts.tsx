'use client'

import { PrismicDocument } from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import React, { use, useMemo, useState } from 'react'
import getReadingTime from 'reading-time'
import {
  IconRss,
  IconSearch,
  IconSortDescending,
  IconX,
} from '@tabler/icons-react'

import BlogCard from '../../components/cards/BlogCard'
import { cn } from '../../utils/cn'

type SortOption = 'newest' | 'oldest' | 'shortest'

export function BlogPosts({ posts }: { posts: Promise<PrismicDocument[]> }) {
  const allPosts = use(posts)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const list = allPosts.filter((post) => {
      if (!q) return true
      const title = (prismicH.asText(post.data.title) || '').toLowerCase()
      const summary = (prismicH.asText(post.data.summary) || '').toLowerCase()
      const body = (prismicH.asText(post.data.body) || '').toLowerCase()
      return title.includes(q) || summary.includes(q) || body.includes(q)
    })

    return [...list].sort((a, b) => {
      const dateA =
        prismicH.asDate(a.data.published_time)?.getTime() ||
        new Date(a.first_publication_date).getTime()
      const dateB =
        prismicH.asDate(b.data.published_time)?.getTime() ||
        new Date(b.first_publication_date).getTime()

      if (sortBy === 'newest') return dateB - dateA
      if (sortBy === 'oldest') return dateA - dateB

      const lenA = getReadingTime(prismicH.asText(a.data.body) || '').minutes
      const lenB = getReadingTime(prismicH.asText(b.data.body) || '').minutes
      return lenA - lenB
    })
  }, [allPosts, searchQuery, sortBy])

  const showFeatured =
    !searchQuery.trim() && sortBy === 'newest' && filteredPosts.length > 0
  const featuredPost = showFeatured ? filteredPosts[0] : null
  const remainingPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts

  return (
    <div className="flex flex-col gap-8">
      {/* Search, Sort & Syndication Toolbar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 backdrop-blur-md md:flex-row md:items-center dark:border-white/[0.08] dark:bg-neutral-900/70">
        {/* Search Input */}
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${allPosts.length} articles by title, topic, or keyword...`}
            className="w-full rounded-xl border border-neutral-200/80 bg-neutral-50/80 py-2 pr-9 pl-10 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-neutral-950/60 dark:text-white dark:placeholder-neutral-500 dark:focus:border-sky-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              aria-label="Clear search"
            >
              <IconX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort & RSS Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
          <div className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-1 dark:border-white/10 dark:bg-neutral-950/60">
            <IconSortDescending className="ml-2 h-3.5 w-3.5 text-neutral-400" />
            {(
              [
                { id: 'newest', label: 'Newest' },
                { id: 'oldest', label: 'Oldest' },
                { id: 'shortest', label: 'Quick Read' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortBy(opt.id)}
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                  sortBy === opt.id
                    ? 'bg-white text-sky-600 shadow-xs dark:bg-neutral-800 dark:text-sky-400'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href="/blog/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              title="RSS Feed"
              className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/80 bg-neutral-50 px-2.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:border-amber-500/40 hover:text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-amber-400"
            >
              <IconRss className="h-3.5 w-3.5 text-amber-500" />
              <span>RSS</span>
            </a>
            <a
              href="/blog/feed.json"
              target="_blank"
              rel="noopener noreferrer"
              title="JSON Feed"
              className="inline-flex items-center rounded-xl border border-neutral-200/80 bg-neutral-50 px-2.5 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
            >
              JSON
            </a>
          </div>
        </div>
      </div>

      {/* Featured Latest Post */}
      {featuredPost && <BlogCard post={featuredPost} featured />}

      {/* Filtered Results Grid */}
      {remainingPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {remainingPosts.map((post: PrismicDocument) => (
            <BlogCard post={post} key={post.uid} />
          ))}
        </div>
      ) : (
        !featuredPost && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white/60 py-16 text-center backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/50">
            <p className="text-lg font-bold text-neutral-900 dark:text-white">
              No articles match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Try searching for a different topic or clear the search filter.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 rounded-full bg-sky-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-600"
            >
              Reset Filter
            </button>
          </div>
        )
      )}
    </div>
  )
}
