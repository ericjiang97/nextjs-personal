'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

export interface TimelineEntry {
  title: string
  subtitle?: string
  companyUrl?: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 75%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-20"
          >
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900 md:left-3">
                <div className="h-3.5 w-3.5 rounded-full border border-sky-500/50 bg-sky-500/20 p-1.5 dark:border-sky-400/50 dark:bg-sky-400/20" />
              </div>
              <div className="hidden md:block md:pl-20">
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-2xl font-bold text-neutral-800 transition-colors hover:text-sky-600 dark:text-neutral-200 dark:hover:text-sky-400 lg:text-3xl"
                  >
                    <span>{item.title}</span>
                    <svg
                      className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </a>
                ) : (
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 lg:text-3xl">
                    {item.title}
                  </h3>
                )}
                {item.subtitle && (
                  <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="relative w-full pr-4 pl-16 md:pl-4">
              <div className="mb-4 block md:hidden">
                <h3 className="text-left text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {item.subtitle}
                  </p>
                )}
              </div>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-800 md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-sky-500 to-transparent from-[0%] via-[15%]"
          />
        </div>
      </div>
    </div>
  )
}
