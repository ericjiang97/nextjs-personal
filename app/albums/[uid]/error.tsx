'use client' // Required directive

import { useEffect } from 'react'
import MainLayout from '../../../containers/MainLayout'
import { useParams } from 'next/navigation'
import NotFoundPage from '../../not-found'
import { NotFoundError } from '@prismicio/client'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const uid = useParams().uid as string
  const endpoint = `/albums/${uid}`

  if (error instanceof NotFoundError) {
    return (
      <NotFoundPage>
        <Link href="/albums">to Albums</Link>
      </NotFoundPage>
    )
  }

  return (
    <MainLayout
      pageTitle="Album"
      pageMeta={{
        endpoint,
        description: '',
        imageUrl: `https://ericjiang.dev/api/static?album=${uid}`,
      }}
    >
      <h2 className="text-4xl font-bold">Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </MainLayout>
  )
}
