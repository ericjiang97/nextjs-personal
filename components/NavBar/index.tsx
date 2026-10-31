'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Logo from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { cn } from '../../utils/cn'
import { Navigation } from '../../types/Navigation'

const navigation: Navigation[] = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Albums', href: '/albums' },
  { name: 'Media', href: '/media' },
  { name: 'About', href: '/about' },
]

export default function NavBar() {
  const path = usePathname() || '/'
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const parentPath = path.split('/')[1] || ''

  const isNavItemActive = (href: string) => {
    if (href === '/') return path === '/'
    return parentPath === href.replace('/', '')
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Global"
          className="relative flex items-center justify-between rounded-full border border-neutral-200/80 bg-white/80 px-4 py-2.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl transition-colors dark:border-white/[0.1] dark:bg-neutral-950/75 dark:shadow-sky-500/[0.03]"
        >
          {/* Top subtle specular highlight line */}
          <div className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Aceternity Floating Pill Links */}
          <div
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {navigation.map((item, idx) => {
              const isCurrent = isNavItemActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
                    isCurrent
                      ? 'text-neutral-950 dark:text-white'
                      : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100'
                  )}
                >
                  {isCurrent && (
                    <motion.span
                      layoutId="aceternity-nav-active"
                      className="absolute inset-0 z-0 rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 dark:border-sky-400/30 dark:from-sky-400/20 dark:via-indigo-400/20 dark:to-purple-400/20"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <AnimatePresence>
                    {hoveredIdx === idx && !isCurrent && (
                      <motion.span
                        layoutId="aceternity-nav-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 rounded-full bg-neutral-100 dark:bg-white/[0.06]"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-neutral-100/80 text-neutral-700 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
              aria-label="Open main menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mt-2 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-neutral-950/95"
            >
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => {
                  const isCurrent = isNavItemActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                        isCurrent
                          ? 'bg-sky-500/15 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5'
                      )}
                    >
                      <span>{item.name}</span>
                      {isCurrent && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
