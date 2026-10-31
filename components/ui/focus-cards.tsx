'use client'
import React, { useState } from 'react'
import { cn } from '../../utils/cn'

export interface FocusCardItem {
  title: string
  src: string
  href: string
  tags?: string[]
  type?: string
}

export const FocusCard = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: FocusCardItem
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'group relative h-72 w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 transition-all duration-300 ease-out md:h-80 dark:border-white/10 dark:bg-neutral-900',
        hovered !== null &&
          hovered !== index &&
          'scale-[0.98] opacity-60 blur-[2px]'
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

      {card.type && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
            {card.type} • P3 / 6K
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-5">
        {card.tags && card.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {card.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white md:text-xl">
            {card.title}
          </h3>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-sky-500">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
)

FocusCard.displayName = 'FocusCard'

export function FocusCards({ cards }: { cards: FocusCardItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <FocusCard
          key={card.title + index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}
