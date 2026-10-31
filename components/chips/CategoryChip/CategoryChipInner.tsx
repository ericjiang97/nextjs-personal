'use client'

import { PrismicDocument } from '@prismicio/client'
import Link from 'next/link'
import { use } from 'react'

export const defaultClass =
  'inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-500/20 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/20'

export default function CategoryChipInner({
  category,
}: {
  category: Promise<PrismicDocument>
}) {
  const { uid, data } = use(category)

  if (!uid || !data) return <> </>

  return (
    <Link href={`/blog/categories/${uid}`}>
      <span className={defaultClass}>{data.category_name}</span>
    </Link>
  )
}
