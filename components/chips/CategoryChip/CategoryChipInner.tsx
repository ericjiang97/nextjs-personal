'use client'

import { PrismicDocument } from '@prismicio/client'
import Link from 'next/link'
import { Suspense, use } from 'react'

export const defaultClass =
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-400 dark:border-gray-700 dark:bg-gray-100 dark:text-gray-800'

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
