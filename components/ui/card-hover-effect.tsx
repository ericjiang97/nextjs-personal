'use client'
import { cn } from '../../utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    meta?: string
    badge?: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link + idx}
          target={item.link.startsWith('http') ? '_blank' : undefined}
          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-sky-500/10 dark:bg-sky-400/[0.12]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-20 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 p-6 transition-colors duration-200 group-hover:border-sky-500/40 dark:border-white/[0.08] dark:bg-neutral-900/80 dark:group-hover:border-sky-400/30">
            <div>
              <div className="flex items-center justify-between gap-2">
                {item.badge && (
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                    {item.badge}
                  </span>
                )}
                {item.meta && (
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                    {item.meta}
                  </span>
                )}
              </div>
              <h4 className="mt-3 font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400">
                {item.title}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed tracking-wide text-neutral-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400">
              <span>Explore</span>
              <svg
                className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
