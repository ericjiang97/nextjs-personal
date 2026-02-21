import { createClient } from '../../../config/prismic'
import { generateFeed } from '../../../utils/feed'

export async function GET() {
  const client = createClient()

  const posts = await client.getAllByType('blog-post', {
    orderings: {
      field: 'document.last_publication_date',
      direction: 'desc',
    },
  })

  const feed = generateFeed(posts)

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  })
}
