'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import NavBar from '../NavBar'
import Footer from './Footer'
import { AmbientBackground } from '../ui/ambient-background'

function isPlacesPath(path: string) {
  return path === '/places' || path.startsWith('/places/')
}

export default function SiteChrome({
  children,
  isDraftMode,
}: {
  children: React.ReactNode
  isDraftMode?: boolean
}) {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const isStudio = pathname.startsWith('/studio')
  const isPlaces = isPlacesPath(pathname)

  const [compressingFrom, setCompressingFrom] = useState<string | null>(null)
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isCompressing = isPlaces && compressingFrom === pathname

  useEffect(() => {
    return () => {
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current)
        navTimerRef.current = null
      }
    }
  }, [pathname])

  const handlePlacesClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaces || isCompressing) return
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }

    const target = e.target as HTMLElement | null
    const anchor = target?.closest('a')
    if (!anchor || !anchor.href) return
    if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

    let url: URL
    try {
      url = new URL(anchor.href, window.location.origin)
    } catch {
      return
    }

    if (url.origin !== window.location.origin) return

    const destPath = url.pathname
    if (
      isPlacesPath(destPath) ||
      destPath.startsWith('/studio') ||
      destPath.startsWith('/api/')
    ) {
      return
    }

    // Intercept internal navigation away from /places* to play smooth compression animation
    e.preventDefault()
    e.stopPropagation()

    const destHref = `${url.pathname}${url.search}${url.hash}`
    router.prefetch(destHref)
    setCompressingFrom(pathname)

    if (navTimerRef.current) clearTimeout(navTimerRef.current)
    navTimerRef.current = setTimeout(() => {
      router.push(destHref)
    }, 360)
  }

  if (isStudio) {
    return <div className="min-h-screen w-full">{children}</div>
  }

  if (isPlaces) {
    return (
      <div
        onClickCapture={handlePlacesClickCapture}
        className="relative h-dvh w-screen overflow-hidden"
      >
        {/* Site Ambient Background revealed around the frame during expand/compress */}
        <AmbientBackground />

        {/* Persistent Floating Site NavBar */}
        <div className="fixed inset-x-0 top-0 z-50">
          <NavBar />
        </div>

        {/* Full-Page Expanding / Compressing Places Viewport */}
        <motion.div
          key="places-fullscreen-shell"
          initial={{
            clipPath: 'inset(84px 4% 36px 4% round 28px)',
            scale: 0.96,
            opacity: 0.35,
          }}
          animate={
            isCompressing
              ? {
                  clipPath: 'inset(84px 4% 36px 4% round 28px)',
                  scale: 0.94,
                  opacity: 0,
                }
              : {
                  clipPath: 'inset(0px 0% 0px 0% round 0px)',
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={
            isCompressing
              ? { duration: 0.36, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
          className="fixed inset-0 z-20 h-dvh w-screen overflow-hidden will-change-[clip-path,transform,opacity]"
        >
          {children}
        </motion.div>

        {isDraftMode && (
          <div className="fixed bottom-4 right-16 z-50 flex items-center gap-2 rounded-full border border-sky-500/40 bg-neutral-950/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Visual Edit Mode</span>
            <Link
              href="/studio/presentation"
              className="ml-1 text-sky-400 underline underline-offset-2 hover:text-sky-300"
            >
              Studio
            </Link>
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

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between">
      <NavBar />
      {children}
      <Footer />
      {isDraftMode && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-sky-500/40 bg-neutral-950/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span>Visual Edit Mode</span>
          <Link
            href="/studio/presentation"
            className="ml-1 text-sky-400 underline underline-offset-2 hover:text-sky-300"
          >
            Studio
          </Link>
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
