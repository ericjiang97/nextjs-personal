import React from 'react'
import HomeClient from '../components/home/HomeClient'
import { sanityFetch } from '../sanity/lib/live'
import { HOME_PAGE_QUERY } from '../sanity/lib/queries'
import {
  DEFAULT_HOME_PAGE,
  DEFAULT_PROJECTS,
  DEFAULT_TALKS,
} from '../sanity/lib/defaults'

export default async function HomePage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: HOME_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const home = { ...DEFAULT_HOME_PAGE, ...(data?.home || {}) }
  const latestPosts = data?.latestPosts || []
  const projects =
    data?.projects && data.projects.length > 0
      ? data.projects
      : DEFAULT_PROJECTS
  const talks =
    data?.talks && data.talks.length > 0 ? data.talks : DEFAULT_TALKS

  return (
    <HomeClient
      home={home}
      latestPosts={latestPosts}
      projects={projects}
      talks={talks}
    />
  )
}
