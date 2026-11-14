'use client'

import Link from 'next/link'
import { stegaClean } from 'next-sanity'
import { SanityCategory } from '../../../sanity/lib/queries'

export const defaultClass =
  'inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-500/20 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/20'

export default function CategoryChip({
  category,
}: {
  category?: SanityCategory | null
}) {
  const cleanSlug = stegaClean(category?.slug)
  if (!category || !cleanSlug) return null

  return (
    <Link href={`/blog/categories/${cleanSlug}`}>
      <span className={defaultClass}>{category.title}</span>
    </Link>
  )
}
