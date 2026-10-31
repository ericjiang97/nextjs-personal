'use client'
import { cn } from '../../utils/cn'
import { motion, AnimatePresence } from 'motion/react'
import React, { useRef, useState, useEffect } from 'react'

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const beams = [
    {
      initialX: 40,
      translateX: 40,
      duration: 7,
      repeatDelay: 3,
      delay: 1,
    },
    {
      initialX: 280,
      translateX: 280,
      duration: 5,
      repeatDelay: 5,
      delay: 2,
      className: 'h-6',
    },
    {
      initialX: 520,
      translateX: 520,
      duration: 8,
      repeatDelay: 4,
      className: 'h-20',
    },
    {
      initialX: 760,
      translateX: 760,
      duration: 6,
      repeatDelay: 6,
      delay: 3,
    },
    {
      initialX: 980,
      translateX: 980,
      duration: 9,
      repeatDelay: 3,
      className: 'h-12',
    },
  ]

  return (
    <div
      ref={parentRef}
      className={cn('relative overflow-hidden', className)}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + 'beam-idx'}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full bg-transparent"
      />
    </div>
  )
}

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>
    parentRef: React.RefObject<HTMLDivElement | null>
    beamOptions?: {
      initialX?: number
      translateX?: number
      initialY?: number
      translateY?: number
      rotate?: number
      className?: string
      duration?: number
      delay?: number
      repeatDelay?: number
    }
  }
>(({ parentRef, containerRef, beamOptions = {} }, _ref) => {
  const beamRef = useRef<HTMLDivElement>(null)
  const [collision, setCollision] = useState<{
    detected: boolean
    coordinates: { x: number; y: number } | null
  }>({
    detected: false,
    coordinates: null,
  })
  const [beamKey, setBeamKey] = useState(0)
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false)

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        const parentRect = parentRef.current.getBoundingClientRect()

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2
          const relativeY = beamRect.bottom - parentRect.top

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          })
          setCycleCollisionDetected(true)
        }
      }
    }

    const animationInterval = setInterval(checkCollision, 60)
    return () => clearInterval(animationInterval)
  }, [cycleCollisionDetected, containerRef, parentRef])

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      const timer1 = setTimeout(() => {
        setCollision({ detected: false, coordinates: null })
        setCycleCollisionDetected(false)
      }, 1800)

      const timer2 = setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1)
      }, 1800)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [collision])

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || '-200px',
          translateX: beamOptions.initialX || '0px',
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || '1200px',
            translateX: beamOptions.translateX || '0px',
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          'pointer-events-none absolute top-20 left-0 z-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-sky-500 via-indigo-500 to-transparent',
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
})

CollisionMechanism.displayName = 'CollisionMechanism'

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 14 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: ((index % 7) - 3) * 14,
    directionY: -((index % 5) + 1) * 10,
  }))

  return (
    <div {...props} className={cn('absolute z-50 h-2 w-2', props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-sky-400 to-indigo-500"
        />
      ))}
    </div>
  )
}
