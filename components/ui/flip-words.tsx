'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../utils/cn'

export const FlipWords = ({
  words,
  duration = 2800,
  className,
}: {
  words: string[]
  duration?: number
  className?: string
}) => {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false)
      }}
    >
      <motion.span
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 12,
        }}
        exit={{
          opacity: 0,
          y: -25,
          x: 20,
          filter: 'blur(6px)',
          scale: 1.2,
          position: 'absolute',
        }}
        className={cn(
          'relative z-10 inline-block px-1 text-left font-bold',
          className
        )}
        key={currentWord}
      >
        {currentWord.split('').map((letter, letterIndex) => (
          <motion.span
            key={currentWord + letterIndex}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: letterIndex * 0.04,
              duration: 0.25,
            }}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}
