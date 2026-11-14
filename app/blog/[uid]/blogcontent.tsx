'use client'

import { BarsArrowUpIcon } from '@heroicons/react/24/outline'
import { stegaClean } from 'next-sanity'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import getReadingTime from 'reading-time'
import {
  IconArrowLeft,
  IconCalendar,
  IconCheck,
  IconClock,
  IconList,
  IconShare,
} from '@tabler/icons-react'

import SanityPortableText, {
  slugifyHeading,
} from '../../../components/SanityPortableText'
import MainLayout from '../../../containers/MainLayout'
import classNames from '../../../utils/classNames'
import NotFoundPage from '../../not-found'
import CategoryChip from '../../../components/chips/CategoryChip/CategoryChip'
import { TracingBeam } from '../../../components/ui/tracing-beam'
import { Spotlight } from '../../../components/ui/spotlight'
import { CardSpotlight } from '../../../components/ui/card-spotlight'
import {
  portableTextToPlainText,
  SanityBlogPost,
} from '../../../sanity/lib/queries'

interface TocHeading {
  id: string
  text: string
  level: number
}

export default function BlogContent({ post }: { post: SanityBlogPost }) {
  const [progress, setProgress] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight
          const scrollTop = window.scrollY
          const percentage =
            totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0
          setProgress(percentage)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headings: TocHeading[] = useMemo(() => {
    if (!post?.body || !Array.isArray(post.body)) return []
    return post.body
      .filter(
        (node: any) =>
          node._type === 'block' &&
          (node.style === 'h1' || node.style === 'h2' || node.style === 'h3') &&
          Array.isArray(node.children)
      )
      .map((node: any) => {
        const text = node.children.map((c: any) => c.text || '').join('')
        return {
          id: slugifyHeading(text),
          text,
          level: node.style === 'h1' ? 1 : node.style === 'h2' ? 2 : 3,
        }
      })
      .filter((h) => h.text)
  }, [post?.body])

  const cleanSlug = stegaClean(post?.slug)
  if (!cleanSlug) return <NotFoundPage />

  const { body, publishedAt, _createdAt, summary, title, banner, category } =
    post

  const postedDate = moment(stegaClean(publishedAt || _createdAt))
  const endpoint = `/blog/${cleanSlug}`
  const bannerUrl = stegaClean(banner?.url)
  const hasBanner = Boolean(bannerUrl)
  const readingTime = stegaClean(portableTextToPlainText(body))
  const readingTimeStats = getReadingTime(readingTime)

  const handleCopyShareLink = () => {
    const shareUrl =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://ericjiang.dev${endpoint}`
    navigator.clipboard?.writeText(shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <MainLayout
      pageTitle={`Blog - ${stegaClean(title)}`}
      pageMeta={{
        endpoint,
        description: stegaClean(summary) || '',
        imageUrl: `https://ericjiang.dev/api/static?blog=${cleanSlug}`,
      }}
      showProgress={true}
      progress={progress}
      customHero={
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-neutral-900/70">
          <Spotlight className="-top-32 left-0" fill="#38bdf8" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/60 pb-4 dark:border-white/10">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
              >
                <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to all articles</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
              >
                {copiedLink ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Link Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <IconShare className="h-3.5 w-3.5" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <CategoryChip category={category} />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <IconCalendar className="h-3.5 w-3.5 text-sky-500" />
                {postedDate.format('DD MMMM YYYY')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                <IconClock className="h-3.5 w-3.5" />
                {readingTimeStats.text}
              </span>
            </div>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              {title}
            </h1>

            {summary && stegaClean(summary).trim().length > 0 && (
              <p className="max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
                {summary}
              </p>
            )}
          </div>
        </div>
      }
    >
      <TracingBeam className="px-2 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {headings.length > 1 && (
            <div className="rounded-2xl border border-neutral-200/80 bg-white/75 p-5 backdrop-blur-md dark:border-white/[0.08] dark:bg-neutral-900/60">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-sky-600 uppercase dark:text-sky-400">
                <IconList className="h-4 w-4" />
                <span>On this page</span>
              </div>
              <nav aria-label="Table of contents">
                <ul className="space-y-1.5 text-sm">
                  {headings.map((h, i) => (
                    <li
                      key={h.id + i}
                      className={h.level === 3 ? 'pl-4' : ''}
                    >
                      <a
                        href={`#${h.id}`}
                        className="text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          <article className="flex flex-1 flex-col rounded-3xl border border-neutral-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md sm:p-10 dark:border-white/[0.08] dark:bg-neutral-900/70">
            {hasBanner && bannerUrl && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-white/10">
                <img
                  src={bannerUrl}
                  alt={stegaClean(banner?.alt) || ''}
                  className="max-h-[460px] w-full object-cover"
                />
              </div>
            )}
            <div
              className={classNames(
                'first-letter:font-old-standard leading-relaxed text-neutral-800 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold dark:text-neutral-200 dark:first-letter:text-white'
              )}
            >
              <SanityPortableText value={body} />
            </div>
          </article>

          <CardSpotlight className="p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <img
                  src="/images/transparent-eric-profile.png"
                  alt="Eric Jiang"
                  className="h-14 w-14 rounded-full border border-sky-500/40 bg-neutral-100 object-cover dark:bg-neutral-800"
                />
                <div>
                  <p className="text-xs font-bold tracking-wider text-sky-600 uppercase dark:text-sky-400">
                    Written by
                  </p>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Eric Jiang
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Software Engineer @ Google • Android &amp; Pixel SDLC
                  </p>
                </div>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-100/80 px-4 py-2 text-xs font-bold text-neutral-800 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-sky-400"
              >
                <IconArrowLeft className="h-3.5 w-3.5" />
                <span>More Articles</span>
              </Link>
            </div>
          </CardSpotlight>
        </div>
      </TracingBeam>

      <button
        className="fixed right-6 bottom-6 z-40 rounded-full border border-neutral-200/80 bg-white/90 p-3 shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-sky-500/40 dark:border-white/10 dark:bg-neutral-900/90 dark:hover:border-sky-400/40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <BarsArrowUpIcon
          className="h-5 w-5 text-neutral-700 dark:text-neutral-200"
          aria-hidden="true"
        />
      </button>
    </MainLayout>
  )
}
