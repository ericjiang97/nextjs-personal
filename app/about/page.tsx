import React from 'react'
import AboutClient from './AboutClient'
import { sanityFetch } from '../../sanity/lib/live'
import { ABOUT_PAGE_QUERY } from '../../sanity/lib/queries'
import {
  DEFAULT_ABOUT_PAGE,
  DEFAULT_EXPERIENCES,
} from '../../sanity/lib/defaults'

export default async function AboutPage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: ABOUT_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const about = { ...DEFAULT_ABOUT_PAGE, ...(data?.about || {}) }
  const experiences =
    data?.experiences && data.experiences.length > 0
      ? data.experiences
      : DEFAULT_EXPERIENCES

  return <AboutClient about={about} experiences={experiences} />
}
