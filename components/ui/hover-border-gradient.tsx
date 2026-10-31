'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../utils/cn'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement> &
    Record<string, any>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, #38bdf8 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, #38bdf8 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM:
      'radial-gradient(20.7% 50% at 50% 100%, #6366f1 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT:
      'radial-gradient(16.2% 41.2% at 100% 50%, #a855f7 0%, rgba(255, 255, 255, 0) 100%)',
  }

  const highlight =
    'radial-gradient(75% 181.15% at 50% 50%, #38bdf8 0%, rgba(99, 102, 241, 0) 100%)'

  useEffect(() => {
    if (!hovered) {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
      const interval = setInterval(() => {
        setDirection((prevState) => {
          const currentIndex = directions.indexOf(prevState)
          const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length
          return directions[nextIndex]
        })
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration, clockwise])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border border-neutral-200/80 bg-neutral-900/10 decoration-clone p-px transition duration-500 hover:bg-neutral-900/20 dark:border-white/15 dark:bg-white/10',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:bg-neutral-950 dark:text-white',
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className="z-1 absolute inset-[2px] flex-none rounded-[100px] bg-white dark:bg-neutral-950" />
    </Tag>
  )
}
