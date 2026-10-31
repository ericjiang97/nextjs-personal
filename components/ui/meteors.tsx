'use client'
import React from 'react'
import { cn } from '../../utils/cn'

export const Meteors = ({
  number = 14,
  className,
}: {
  number?: number
  className?: string
}) => {
  const meteors = new Array(number).fill(true)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((_, idx) => {
        const leftPercent = ((idx * 17) % 100)
        const delaySec = ((idx * 0.45) % 4).toFixed(2)
        const durationSec = (3 + (idx % 5) * 1.2).toFixed(1)

        return (
          <span
            key={'meteor' + idx}
            className={cn(
              'animate-meteor-effect absolute top-0 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-sky-400 shadow-[0_0_0_1px_#ffffff10]',
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-sky-400 before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: '-10px',
              left: `${leftPercent}%`,
              animationDelay: `${delaySec}s`,
              animationDuration: `${durationSec}s`,
            }}
          />
        )
      })}
    </div>
  )
}
