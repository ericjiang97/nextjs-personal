'use client'
import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../../utils/cn'

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
    'M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835',
    'M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819',
    'M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803',
    'M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787',
    'M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771',
    'M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755',
    'M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739',
    'M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723',
    'M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707',
  ]

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]',
        className
      )}
    >
      <svg
        className="pointer-events-none absolute z-0 h-full w-full opacity-40 dark:opacity-60"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <React.Fragment key={`beam-${index}`}>
            <path
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.4"
              strokeWidth="0.7"
            />
            <defs>
              <motion.linearGradient
                id={`linearGradient-${index}`}
                initial={{
                  x1: '0%',
                  x2: '0%',
                  y1: '0%',
                  y2: '0%',
                }}
                animate={{
                  x1: ['0%', '100%'],
                  x2: ['0%', '95%'],
                  y1: ['0%', '100%'],
                  y2: ['0%', `${93 + (index % 7)}%`],
                }}
                transition={{
                  duration: 8 + (index % 5) * 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: index * 0.6,
                }}
              >
                <stop stopColor="#38bdf8" stopOpacity="0"></stop>
                <stop stopColor="#38bdf8"></stop>
                <stop offset="32.5%" stopColor="#6366f1"></stop>
                <stop
                  offset="100%"
                  stopColor="#a855f7"
                  stopOpacity="0"
                ></stop>
              </motion.linearGradient>
            </defs>
          </React.Fragment>
        ))}
      </svg>
    </div>
  )
}
