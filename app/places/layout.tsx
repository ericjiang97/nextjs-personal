import React from 'react'
import PlacesExplorer from '../../components/places/PlacesExplorer'
import { normalizePlaceList } from '../../components/places/normalize'
import { sanityFetch } from '../../sanity/lib/live'
import {
  PUBLIC_PLACE_LISTS_QUERY,
  type SanityPlaceList,
} from '../../sanity/lib/queries'
import { DEFAULT_PLACE_LISTS } from '../../sanity/lib/defaults'

export default async function PlacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let totalCount = 0
  let rawLists: SanityPlaceList[] = []

  try {
    const res = await sanityFetch({ query: PUBLIC_PLACE_LISTS_QUERY })
    const data = res.data as {
      totalCount?: number
      lists?: SanityPlaceList[]
    } | null
    totalCount = data?.totalCount ?? 0
    rawLists = data?.lists || []
  } catch {
    totalCount = 0
    rawLists = []
  }

  const effectiveRaw =
    totalCount === 0
      ? DEFAULT_PLACE_LISTS.filter((l) => !l.unlisted && !l.sharingPaused)
      : rawLists

  const publicLists = effectiveRaw.map(normalizePlaceList)

  return <PlacesExplorer publicLists={publicLists}>{children}</PlacesExplorer>
}
