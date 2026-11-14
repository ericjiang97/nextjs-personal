import { client } from '../../../sanity/lib/client'
import { BLOG_POSTS_QUERY } from '../../../sanity/lib/queries'
import { generateFeed } from '../../../utils/feed'

export async function GET() {
  const data = await client.fetch(BLOG_POSTS_QUERY, {}, { stega: false })
  const feed = generateFeed(data?.posts || [])

  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
