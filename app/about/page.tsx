'use client'
import React from 'react'
import Link from 'next/link'
import {
  ArrowDownTrayIcon as DocumentDownloadIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import { IconBriefcase, IconSparkles } from '@tabler/icons-react'

import MainLayout from '../../containers/MainLayout'
import experience from '../../data/experience'
import SmallHeroBanner from '../../components/SmallHeroBanner'
import { Timeline, TimelineEntry } from '../../components/ui/timeline'
import { CardSpotlight } from '../../components/ui/card-spotlight'
import { HoverBorderGradient } from '../../components/ui/hover-border-gradient'

const AboutPage: React.FC = () => {
  const timelineData: TimelineEntry[] = experience.map((exp) => {
    const earliestPos = exp.positions[exp.positions.length - 1]
    const latestPos = exp.positions[0]
    const startStr = earliestPos?.dates.startDate.format('MMM YYYY')
    const endStr = latestPos?.dates.endDate
      ? latestPos.dates.endDate.format('MMM YYYY')
      : 'Present'

    return {
      title: exp.company,
      subtitle: `${startStr} — ${endStr}`,
      companyUrl: exp.companyUrl,
      content: (
        <div className="flex flex-col gap-4">
          {exp.positions.map((pos, j) => {
            const { title, description, dates } = pos
            const { startDate, endDate } = dates
            const isCurrent = !endDate

            return (
              <CardSpotlight key={j} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                      <IconBriefcase className="h-4 w-4" />
                    </span>
                    <h4 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                      {title}
                    </h4>
                  </div>

                  <span
                    className={
                      isCurrent
                        ? 'inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400'
                        : 'inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400'
                    }
                  >
                    {isCurrent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {`${startDate.format('MMM YYYY')} – ${
                      endDate ? endDate.format('MMM YYYY') : 'Present'
                    }`}
                  </span>
                </div>

                {description && description.length > 0 && (
                  <ul className="mt-4 space-y-2.5 border-t border-neutral-200/60 pt-4 text-sm leading-relaxed text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                    {description.map((descrip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        <span>{descrip.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardSpotlight>
            )
          })}
        </div>
      ),
    }
  })

  return (
    <MainLayout
      pageTitle="About"
      customHero={
        <SmallHeroBanner
          badge="About & Career"
          title="About Me"
          description="I bring my passion for technology to build awesome, delightful & secure software for everyone."
        />
      }
      pageMeta={{
        description:
          'I finished my Bachelor of Information Technology at Monash University in Melbourne, Australia where I majored in Computer networks and security.',
        endpoint: '/about',
      }}
    >
      <div className="flex flex-col gap-16">
        {/* Bio & Contact Spotlight Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <CardSpotlight className="lg:col-span-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-sky-600 uppercase dark:text-sky-400">
                  <IconSparkles className="h-4 w-4" />
                  <span>Background</span>
                </div>
                <p className="first-letter:font-old-standard text-base leading-relaxed text-neutral-700 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-neutral-900 sm:text-lg dark:text-neutral-300 dark:first-letter:text-white">
                  As a Software Engineer on the Android SDLC BizTools Team
                  within the Android Software Development Lifecycle team at{' '}
                  <Link
                    href="https://about.google"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky-600 underline decoration-sky-500/40 underline-offset-4 hover:text-sky-500 dark:text-sky-400"
                  >
                    Google
                  </Link>
                  , I work on building and maintaining business tools such as
                  test infrastructure, as well as shaping better processes to
                  enable software and hardware teams to build the best products
                  possible.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-200/70 pt-5 dark:border-white/10">
                <a
                  href="https://resume.ericjiang.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="div"
                    className="flex items-center gap-2 bg-neutral-900 text-white dark:bg-neutral-950 dark:text-white"
                  >
                    <DocumentDownloadIcon className="h-4 w-4 text-sky-400" />
                    <span>View Resume</span>
                  </HoverBorderGradient>
                </a>

                <Link
                  href="mailto:recruiting@ericjiang.dev"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>recruiting@ericjiang.dev</span>
                </Link>
              </div>
            </div>
          </CardSpotlight>

          <CardSpotlight className="flex flex-col justify-between lg:col-span-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-purple-600 uppercase dark:text-purple-400">
                Quick Facts
              </span>
              <h3 className="mt-1 text-xl font-bold text-neutral-900 dark:text-white">
                At a Glance
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-neutral-200/60 pb-2 dark:border-white/10">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Current Team
                  </dt>
                  <dd className="font-semibold text-neutral-900 dark:text-white">
                    Android &amp; Pixel SDLC
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2 dark:border-white/10">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Education
                  </dt>
                  <dd className="font-semibold text-neutral-900 dark:text-white">
                    Monash University (B.IT)
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2 dark:border-white/10">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Major
                  </dt>
                  <dd className="font-semibold text-neutral-900 dark:text-white">
                    Networks &amp; Security
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Recognition
                  </dt>
                  <dd className="font-semibold text-amber-600 dark:text-amber-400">
                    iTnews Rising Star
                  </dd>
                </div>
              </dl>
            </div>
          </CardSpotlight>
        </div>

        {/* Aceternity Scroll-Driven Experience Timeline */}
        <section>
          <div className="mb-2">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
              Career Journey
            </span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Experience
            </h2>
          </div>

          <Timeline data={timelineData} />
        </section>
      </div>
    </MainLayout>
  )
}

export default AboutPage
