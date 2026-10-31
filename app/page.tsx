import React from 'react'
import { createClient } from '../config/prismic'
import HomeClient from '../components/home/HomeClient'
import { IPrismicDocumentRecord } from '../types'

export default async function HomePage() {
  let posts: IPrismicDocumentRecord[] = []
  try {
    posts = await createClient().getAllByType('blog-post', {
      orderings: {
        field: 'document.last_publication_date',
        direction: 'desc',
      },
    })
  } catch {
    posts = []
  }

  return <HomeClient latestPosts={posts} />
}
