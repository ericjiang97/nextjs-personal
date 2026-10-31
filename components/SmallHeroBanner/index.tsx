'use client'
import React from 'react'
import { motion } from 'motion/react'
import { Spotlight } from '../ui/spotlight'

interface SmallHeroBannerProps {
  title?: string
  description?: string
  badge?: string
}

const SmallHeroBanner = ({
  title,
  description,
  badge,
}: React.PropsWithChildren<SmallHeroBannerProps>) => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/60 px-6 py-12 shadow-sm backdrop-blur-md sm:px-10 sm:py-16 dark:border-white/[0.08] dark:bg-neutral-900/50">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-40"
        fill="#38bdf8"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-600 uppercase dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>{badge || title || 'Explore'}</span>
        </div>

        <h1 className="bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-neutral-200 dark:to-neutral-500">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default SmallHeroBanner
