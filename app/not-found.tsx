'use client'
import React from 'react'
import Link from 'next/link'

import MainLayout from '../containers/MainLayout'
import { Spotlight } from '../components/ui/spotlight'
import { HoverBorderGradient } from '../components/ui/hover-border-gradient'

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
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/70 px-6 py-16 text-center backdrop-blur-md dark:border-white/[0.08] dark:bg-neutral-900/60">
        <Spotlight className="-top-32 left-10" fill="#38bdf8" />
        <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold tracking-wider text-rose-600 uppercase dark:text-rose-400">
          404 Error
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
          Page Not Found
        </h2>
        <p className="mt-3 max-w-md text-base text-neutral-600 dark:text-neutral-400">
          Perhaps it&apos;s been moved or deleted.
        </p>

        {reason && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
            <span className="font-semibold">Error: </span>
            {reason}
          </div>
        )}

        <img
          src="/images/ericshrug.png"
          alt="Eric shrugging"
          className="mt-6 h-56 w-auto object-contain"
        />

        <div className="mt-6">
          {children ? (
            children
          ) : (
            <Link href="/">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-neutral-900 text-white dark:bg-neutral-950 dark:text-white"
              >
                Return Home
              </HoverBorderGradient>
            </Link>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
