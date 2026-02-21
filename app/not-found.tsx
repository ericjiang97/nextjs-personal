import React from 'react'
import Link from 'next/link'

import MainLayout from '../containers/MainLayout'

interface NotFoundPageProps {
  reason?: string
  children?: React.ReactNode
}

const NotFoundPage = ({
  reason,
  children,
}: React.PropsWithChildren<NotFoundPageProps>) => {
  return (
    <MainLayout
      pageTitle="404: Page Not Found"
      pageMeta={{
        description: 'Page Cannot be Found',
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-4xl font-bold">Page Not found</h2>
        <h3 className="mt-3 flex text-2xl font-semibold text-gray-500">
          perhaps its been deleted. Go back{' '}
          <span className="text-maroon ml-2 underline">
            {children ? children : <Link href="/">Home</Link>}
          </span>
        </h3>
        {reason && (
          <div className="mt-2">
            <h4 className="text-xl font-semibold text-gray-500">
              Error message:
            </h4>
            <p className="mt-1 font-semibold text-gray-500">{reason}</p>
          </div>
        )}
        <img src="/images/ericshrug.png" className="block h-1/2 w-1/2" />
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
