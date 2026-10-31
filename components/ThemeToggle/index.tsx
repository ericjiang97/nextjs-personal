'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../providers/ThemeProvider'

const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full p-2" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-neutral-100/80 text-neutral-700 transition-all duration-200 hover:scale-105 hover:border-sky-500/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-sky-400/40 dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon className="h-4 w-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  )
}
