'use client'
import { cn } from '../../utils/cn'
import { useMotionValue, motion, useMotionTemplate } from 'motion/react'
import React from 'react'

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn('group relative w-full', containerClassName)}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-60" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(rgba(56, 189, 248, 0.55) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              260px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              260px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  )
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 1.4,
        ease: 'easeOut',
        delay: 0.3,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        'relative inline-block rounded-lg bg-gradient-to-r from-sky-500/25 via-indigo-500/25 to-purple-500/25 px-2 pb-1 text-sky-700 dark:from-sky-500/40 dark:via-indigo-500/40 dark:to-purple-500/40 dark:text-sky-200',
        className
      )}
    >
      {children}
    </motion.span>
  )
}
