'use client'
import React from 'react'
import { stegaClean } from 'next-sanity'
import {
  PhotoIcon,
  CameraIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import { IconArrowUpRight, IconMicrophone } from '@tabler/icons-react'

import SmallHeroBanner from '../../components/SmallHeroBanner'
import MainLayout from '../../containers/MainLayout'
import { CardSpotlight } from '../../components/ui/card-spotlight'
import { SanitySiteSettings, SanityTalk } from '../../sanity/lib/queries'
import { DEFAULT_SITE_SETTINGS } from '../../sanity/lib/defaults'

const MEDIA_ICONS: Record<string, typeof CameraIcon> = {
  camera: CameraIcon,
  photo: PhotoIcon,
  stack: RectangleStackIcon,
}

export default function MediaClient({
  settings,
  talks,
}: {
  settings: SanitySiteSettings
  talks: SanityTalk[]
}) {
  const actions =
    settings.mediaCards && settings.mediaCards.length > 0
      ? settings.mediaCards
      : DEFAULT_SITE_SETTINGS.mediaCards!

  const pastTalks = talks.filter((t) => !t.upcoming)
  const upcomingTalks = talks.filter((t) => t.upcoming)

  return (
    <MainLayout
      pageTitle="Media"
      customHero={
        <SmallHeroBanner
          badge={settings.mediaHeroBadge}
          title={settings.mediaHeroTitle || 'Media'}
          description={settings.mediaHeroDescription || ''}
        />
      }
      pageMeta={{
        description: 'Check out these media and other works I do',
        endpoint: '/media',
      }}
    >
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {actions.map((action, idx) => {
            const IconComp =
              MEDIA_ICONS[stegaClean(action.icon) || 'camera'] || CameraIcon
            const cleanHref = stegaClean(action.href) || '#'
            const cleanAccent =
              stegaClean(action.accent) ||
              'text-sky-500 bg-sky-500/10 border-sky-500/20'

            return (
              <CardSpotlight
                key={action._key || idx}
                className="group flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex rounded-xl border p-3 ${cleanAccent}`}
                    >
                      <IconComp className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-neutral-200/80 bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-neutral-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                    <a
                      href={cleanHref}
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
            )
          })}
        </div>

        {upcomingTalks.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                Upcoming
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                Upcoming Talks
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {upcomingTalks.map((talk, idx) => (
                <CardSpotlight
                  key={talk._id || idx}
                  className="flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-semibold text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                        <IconMicrophone className="h-3.5 w-3.5" />
                        {talk.org}
                      </span>
                      <span>{talk.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900 dark:text-white">
                      {talk.title}
                    </h3>
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </section>
        )}

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
            {pastTalks.map((talk, idx) => (
              <CardSpotlight
                key={talk._id || idx}
                className="flex flex-col justify-between"
              >
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
                {talk.url && (
                  <div className="mt-4">
                    <a
                      href={stegaClean(talk.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-500 dark:text-sky-400"
                    >
                      <span>View Deck on SpeakerDeck</span>
                      <IconArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </CardSpotlight>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
