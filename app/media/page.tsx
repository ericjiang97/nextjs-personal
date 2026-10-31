'use client'
import React from 'react'
import { NextPage } from 'next'
import {
  PhotoIcon,
  CameraIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import { IconArrowUpRight, IconMicrophone } from '@tabler/icons-react'

import SmallHeroBanner from '../../components/SmallHeroBanner'
import MainLayout from '../../containers/MainLayout'
import { CardSpotlight } from '../../components/ui/card-spotlight'
import talks from '../../data/talks'

const actions = [
  {
    title: 'Photography Portfolio',
    href: 'https://ericj.photos',
    external: true,
    icon: CameraIcon,
    badge: 'External Site',
    accent: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    description:
      "I take photos when I'm travelling around the world — explore my full high-resolution photography portfolio!",
  },
  {
    title: '4K / 5K / 6K Wallpapers',
    href: '/media/wallpapers',
    external: false,
    icon: PhotoIcon,
    badge: 'Display P3',
    accent: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    description:
      'Curated travel photos edited and colour-calibrated with Display P3 profiles for Mac, Pro Display XDR, and mobile screens.',
  },
  {
    title: 'Photo Albums',
    href: '/albums',
    external: false,
    icon: RectangleStackIcon,
    badge: 'Stories',
    accent: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    description:
      'Visual stories and curated photo collections from trips, events, and adventures.',
  },
]

const MediaPage: NextPage = () => {
  return (
    <MainLayout
      pageTitle="Media"
      customHero={
        <SmallHeroBanner
          badge="Photography, Wallpapers & Talks"
          title="Media"
          description="Check out photography, Display P3 wallpapers, and tech talks I've given."
        />
      }
      pageMeta={{
        description: 'Check out these media and other works I do',
        endpoint: '/media',
      }}
    >
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <CardSpotlight
              key={action.title}
              className="group flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-xl border p-3 ${action.accent}`}
                  >
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-neutral-200/80 bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                    {action.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                  <a
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {action.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400">
                <span>Explore {action.title}</span>
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </CardSpotlight>
          ))}
        </div>

        {/* Speaking & Presentations Section */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
              Presentations &amp; Slide Decks
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
              Tech Talks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {talks.past.map((talk, idx) => (
              <CardSpotlight key={idx} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2.5 py-0.5 font-semibold text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                      <IconMicrophone className="h-3.5 w-3.5" />
                      {talk.org}
                    </span>
                    <span>{talk.date}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-neutral-900 dark:text-white">
                    {talk.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-500 dark:text-sky-400"
                  >
                    <span>View Deck on SpeakerDeck</span>
                    <IconArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default MediaPage
