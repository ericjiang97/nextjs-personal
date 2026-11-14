'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '../../../containers/MainLayout'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const uid = useParams().uid as string
  const endpoint = `/blog/${uid}`

  return (
    <MainLayout
      pageTitle="Blog"
      pageMeta={{
        endpoint,
        description: '',
        imageUrl: `https://ericjiang.dev/api/static?blog=${uid}`,
      }}
    >
      <h2 className="text-4xl font-bold">Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </MainLayout>
  )
}
