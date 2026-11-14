import moment from 'moment'
import { Feed } from 'feed'
import { stegaClean } from 'next-sanity'
import { SanityBlogPost } from '../sanity/lib/queries'

export const generateFeed = (posts: SanityBlogPost[]) => {
  const firstDateRaw = posts[0]
    ? stegaClean(posts[0].publishedAt || posts[0]._createdAt)
    : null
  const lastUpdated = firstDateRaw ? new Date(firstDateRaw) : new Date()

  const feed = new Feed({
    title: 'Eric Jiang',
    description: 'Engineer &#124; maker of things',
    id: 'https://ericjiang.dev',
    copyright: 'Copyright (C) Eric Jiang 2016 -',
    language: 'en-AU',
    feedLinks: {
      xml: 'https://ericjiang.dev/blog/feed.xml',
      json: 'https://ericjiang.dev/blog/feed.json',
    },
    author: {
      name: 'Eric Jiang',
      email: 'eric@ericjiang.dev',
      link: 'https://ericjiang.dev',
    },
    updated: lastUpdated,
  })

  posts.forEach((post) => {
    const slug = stegaClean(post.slug)
    const rawDate = stegaClean(post.publishedAt || post._createdAt)
    const pubDate = rawDate ? moment(rawDate).toDate() : new Date()

    feed.addItem({
      title: stegaClean(post.title) || '',
      description: stegaClean(post.summary) || '',
      date: pubDate,
      link: `https://ericjiang.dev/blog/${slug}`,
    })
  })

  return feed
}
