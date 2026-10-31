'use client'
import React from 'react'
import * as prismicH from '@prismicio/helpers'
import { PrismicText } from '@prismicio/react'
import moment from 'moment'
import getReadingTime from 'reading-time'
import {
  IconArrowUpRight,
  IconCalendar,
  IconClock,
  IconSparkles,
} from '@tabler/icons-react'

import { IPrismicDocumentRecord } from '../../../types'
import CategoryChip from '../../chips/CategoryChip/CategoryChip'
import { CardSpotlight } from '../../ui/card-spotlight'
import { cn } from '../../../utils/cn'

interface BlogCardProps {
  post: IPrismicDocumentRecord
  featured?: boolean
}

const BlogCard = ({
  post,
  featured = false,
}: React.PropsWithChildren<BlogCardProps>) => {
  const postedDate = moment(
    prismicH.asDate(post.data.published_time)?.toISOString()
  )

  const { summary, category, title, banner, body } = post.data
  const hasSummary = summary && summary.length > 0
  const hasBanner = Boolean(banner?.url)

  const plainBody = prismicH.asText(body) || ''
  const readStats = getReadingTime(plainBody)
  const readingTimeText =
    readStats.minutes < 1
      ? '1 min read'
      : `${Math.ceil(readStats.minutes)} min read`

  if (featured) {
    return (
      <CardSpotlight className="group overflow-hidden p-0 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <a
            href={`/blog/${post.uid}`}
            className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-purple-500/20 lg:col-span-5"
          >
            {hasBanner ? (
              <img
                src={banner.url}
                alt={banner.alt || prismicH.asText(title) || ''}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4 text-sky-500 backdrop-blur-md">
                  <IconSparkles className="h-10 w-10" />
                </div>
                <span className="mt-3 text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-300">
                  Featured Dispatch
                </span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/75 px-3 py-1 text-[11px] font-bold tracking-wider text-sky-300 uppercase backdrop-blur-md">
                <IconSparkles className="h-3 w-3" />
                Latest Article
              </span>
            </div>
          </a>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <CategoryChip category={category} />
                <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  <IconCalendar className="h-3.5 w-3.5 text-sky-500" />
                  {postedDate.format('DD MMMM YYYY')}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 bg-neutral-100/80 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                  <IconClock className="h-3.5 w-3.5 text-indigo-500" />
                  {readingTimeText}
                </span>
              </div>

              <a href={`/blog/${post.uid}`} className="mt-4 block">
                <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 transition-colors group-hover:text-sky-600 sm:text-3xl dark:text-white dark:group-hover:text-sky-400">
                  <PrismicText field={title} />
                </h2>
                {hasSummary && (
                  <p className="mt-3 line-clamp-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    <PrismicText field={summary} />
                  </p>
                )}
              </a>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-200/60 pt-4 dark:border-white/10">
              <a
                href={`/blog/${post.uid}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400"
              >
                <span>Read full article</span>
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </CardSpotlight>
    )
  }

  return (
    <CardSpotlight
      className={cn(
        'group flex h-full flex-col justify-between overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/5'
      )}
    >
      <div>
        {hasBanner ? (
          <a
            href={`/blog/${post.uid}`}
            className="relative block h-44 w-full overflow-hidden border-b border-neutral-200/60 dark:border-white/10"
          >
            <img
              src={banner.url}
              alt={banner.alt || prismicH.asText(title) || ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ) : (
          <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-75 transition-opacity group-hover:opacity-100" />
        )}

        <div className="p-6 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CategoryChip category={category} />
            <div className="flex items-center gap-2.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="h-3.5 w-3.5 text-sky-500" />
                {postedDate.format('DD MMM YYYY')}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                <IconClock className="h-3.5 w-3.5" />
                {readingTimeText}
              </span>
            </div>
          </div>

          <a href={`/blog/${post.uid}`} className="mt-3.5 block">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-neutral-100 dark:group-hover:text-sky-400">
              <PrismicText field={title} />
            </h3>
            {hasSummary && (
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                <PrismicText field={summary} />
              </p>
            )}
          </a>
        </div>
      </div>

      <div className="px-6 pt-2 pb-6">
        <a
          href={`/blog/${post.uid}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400"
        >
          <span>Read article</span>
          <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </CardSpotlight>
  )
}

export default BlogCard
