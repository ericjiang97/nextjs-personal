import React from 'react'
import WallpapersClient from './WallpapersClient'
import { sanityFetch } from '../../../sanity/lib/live'
import { WALLPAPERS_PAGE_QUERY } from '../../../sanity/lib/queries'
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_WALLPAPERS,
} from '../../../sanity/lib/defaults'

export default async function WallpapersPage() {
  let data: any = null
  try {
    const res = await sanityFetch({ query: WALLPAPERS_PAGE_QUERY })
    data = res.data
  } catch {
    data = null
  }

  const settings = { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}) }
  const wallpapers =
    data?.wallpapers && data.wallpapers.length > 0
      ? data.wallpapers
      : DEFAULT_WALLPAPERS

  return <WallpapersClient settings={settings} wallpapers={wallpapers} />
}
