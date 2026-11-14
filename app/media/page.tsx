import React from 'react'
import MediaClient from './MediaClient'
import { sanityFetch } from '../../sanity/lib/live'
import { MEDIA_PAGE_QUERY } from '../../sanity/lib/queries'
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TALKS,
} from '../../sanity/lib/defaults'

export default async function MediaPage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: MEDIA_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const settings = { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}) }
  const talks =
    data?.talks && data.talks.length > 0 ? data.talks : DEFAULT_TALKS

  return <MediaClient settings={settings} talks={talks} />
}
