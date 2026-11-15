import type { Metadata } from 'next'
import { PlacesRouteSync } from '../../../components/places/PlacesExplorer'
import { normalizePlaceList } from '../../../components/places/normalize'
import { sanityFetch } from '../../../sanity/lib/live'
import { client } from '../../../sanity/lib/client'
import {
  PLACE_LIST_BY_SLUG_QUERY,
  PLACE_LIST_SLUGS_QUERY,
  type SanityPlaceList,
} from '../../../sanity/lib/queries'
import { DEFAULT_PLACE_LISTS } from '../../../sanity/lib/defaults'

async function resolveListBySlug(slug: string): Promise<SanityPlaceList | null> {
  try {
    const res = await sanityFetch({
      query: PLACE_LIST_BY_SLUG_QUERY,
      params: { slug },
    })
    const data = res.data as {
      totalCount?: number
      list?: SanityPlaceList | null
    } | null
    const totalCount = data?.totalCount ?? 0
    if (data?.list) {
      return data.list
    }
    if (totalCount === 0) {
      return DEFAULT_PLACE_LISTS.find((l) => l.slug === slug) || null
    }
    return null
  } catch {
    return DEFAULT_PLACE_LISTS.find((l) => l.slug === slug) || null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const list = await resolveListBySlug(slug)

  if (!list || list.sharingPaused) {
    return {
      title: 'Shared Places List | Eric Jiang',
      robots: { index: false, follow: false },
    }
  }

  const title = `${list.emoji ? `${list.emoji} ` : ''}${list.title} | Eric Jiang`
  const description =
    list.description ||
    `Curated map of ${list.places?.length || 0} favourite spots by ${list.ownerName || 'Eric Jiang'}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    ...(list.unlisted ? { robots: { index: false, follow: false } } : {}),
  }
}

export default async function SharedPlaceListPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rawList = slug ? await resolveListBySlug(slug) : null

  if (!rawList) {
    return <PlacesRouteSync slug={slug} status="not_found" />
  }

  if (rawList.sharingPaused) {
    return <PlacesRouteSync slug={slug} status="paused" />
  }

  const normalized = normalizePlaceList(rawList)

  return (
    <PlacesRouteSync
      slug={normalized.slug}
      status="active"
      extraList={normalized}
    />
  )
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({ useCdn: false })
      .fetch(PLACE_LIST_SLUGS_QUERY, {}, { stega: false })
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs.filter((s: { slug?: string }) => Boolean(s?.slug))
    }
    return DEFAULT_PLACE_LISTS.map((l) => ({ slug: l.slug }))
  } catch {
    return DEFAULT_PLACE_LISTS.map((l) => ({ slug: l.slug }))
  }
}
