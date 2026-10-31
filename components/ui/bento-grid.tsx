import React from 'react'
import { cn } from '../../utils/cn'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  href?: string
}) => {
  const Wrapper = href ? 'a' : 'div'

  return (
    <Wrapper
      href={href}
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition duration-300 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5 dark:border-white/[0.08] dark:bg-neutral-900/70 dark:shadow-none dark:hover:border-sky-400/30',
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1.5">
        <div className="mb-2 flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          {icon}
        </div>
        <div className="mt-1 mb-1.5 font-sans text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {title}
        </div>
        <div className="font-sans text-sm leading-relaxed font-normal text-neutral-600 dark:text-neutral-400">
          {description}
        </div>
      </div>
    </Wrapper>
  )
}
