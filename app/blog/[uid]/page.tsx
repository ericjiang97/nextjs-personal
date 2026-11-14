import NotFoundPage from '../../not-found'
import BlogContent from './blogcontent'
import { sanityFetch } from '../../../sanity/lib/live'
import { client } from '../../../sanity/lib/client'
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_SLUGS_QUERY,
  SanityBlogPost,
} from '../../../sanity/lib/queries'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params
  if (!uid) return <NotFoundPage />

  let post: SanityBlogPost | null = null
  try {
    const res = await sanityFetch({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug: uid },
    })
    post = res.data as SanityBlogPost | null
  } catch {
    post = null
  }

  if (!post) return <NotFoundPage />

  return <BlogContent post={post} />
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(BLOG_SLUGS_QUERY, {}, { stega: false })
    return (slugs || []).filter((s: any) => s?.uid)
  } catch {
    return []
  }
}
