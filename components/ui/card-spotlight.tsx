'use client'

import { useMotionValue, motion, useMotionTemplate } from 'motion/react'
import React, { MouseEvent as ReactMouseEvent } from 'react'
import { cn } from '../../utils/cn'

export const CardSpotlight = ({
  children,
  radius = 320,
  color = 'rgba(56, 189, 248, 0.14)',
  className,
  ...props
}: {
  radius?: number
  color?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        'group/spotlight relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-sky-500/40 dark:border-white/[0.08] dark:bg-neutral-900/75 dark:hover:border-sky-400/30',
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
