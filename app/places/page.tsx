import type { Metadata } from 'next'
import { PlacesRouteSync } from '../../components/places/PlacesExplorer'

export const metadata: Metadata = {
  title: 'Favourite Places | Eric Jiang',
  description:
    'Curated lists of my favourite restaurants, cafes, cities, and spots around the world.',
  openGraph: {
    title: 'Favourite Places | Eric Jiang',
    description:
      'Curated lists of my favourite restaurants, cafes, cities, and spots around the world.',
  },
}

export default function PlacesIndexPage() {
  return <PlacesRouteSync status="active" />
}
