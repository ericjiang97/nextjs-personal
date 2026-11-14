'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import NavBar from '../NavBar'
import Footer from './Footer'

export default function SiteChrome({
  children,
  isDraftMode,
}: {
  children: React.ReactNode
  isDraftMode?: boolean
}) {
  const pathname = usePathname() || '/'
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <div className="min-h-screen w-full">{children}</div>
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between">
      <NavBar />
      {children}
      <Footer />
      {isDraftMode && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-sky-500/40 bg-neutral-950/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Visual Edit Mode</span>
          <a
            href="/studio/presentation"
            className="ml-1 text-sky-400 underline underline-offset-2 hover:text-sky-300"
          >
            Studio
          </a>
          <span className="text-white/30">•</span>
          <a
            href={`/api/draft-mode/disable?redirect=${encodeURIComponent(pathname)}`}
            className="text-neutral-300 hover:text-white"
          >
            Exit
          </a>
        </div>
      )}
    </div>
  )
}
