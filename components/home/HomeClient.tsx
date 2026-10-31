'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCamera,
  IconCode,
  IconDeviceMobile,
  IconMicrophone,
  IconShieldCheck,
  IconSparkles,
  IconTerminal2,
  IconTrophy,
} from '@tabler/icons-react'

import MainLayout from '../../containers/MainLayout'
import { Spotlight } from '../ui/spotlight'
import { BackgroundBeams } from '../ui/background-beams'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'
import { HeroHighlight, Highlight } from '../ui/hero-highlight'
import { TextGenerateEffect } from '../ui/text-generate-effect'
import { FlipWords } from '../ui/flip-words'
import { CardContainer, CardBody, CardItem } from '../ui/3d-card'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { HoverEffect } from '../ui/card-hover-effect'
import { CardSpotlight } from '../ui/card-spotlight'
import { Meteors } from '../ui/meteors'
import BlogHero from '../BlogHero'
import projects from '../../data/projects'
import talks from '../../data/talks'
import { IPrismicDocumentRecord } from '../../types'

const TERMINAL_LINES = [
  {
    cmd: 'blaze test //android/sdlc/biztools/...',
    out: '✓ 1,428 passed in 0.42s • 100% coverage',
    color: 'text-emerald-400',
  },
  {
    cmd: 'pixel-sec verify --target=tensor-trustzone',
    out: '🛡️ Security attestation verified (0 advisories)',
    color: 'text-sky-400',
  },
  {
    cmd: 'color-sync export --profile="Display P3" --res=6K',
    out: '📷 12 high-DPI wallpapers ready for download',
    color: 'text-purple-400',
  },
]

const STATS = [
  { value: '6+ Yrs', label: 'Engineering at Google', icon: IconCode },
  { value: '4 Roles', label: 'Android & Pixel Teams', icon: IconShieldCheck },
  { value: '12+ 6K', label: 'Display P3 Wallpapers', icon: IconCamera },
]

export default function HomeClient({
  latestPosts,
}: {
  latestPosts: IPrismicDocumentRecord[]
}) {
  const flipWords = ['delightful', 'secure', 'scalable', 'impactful']
  const allProjects = [...projects.current, ...projects.previous]
  const [termIdx, setTermIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTermIdx((prev) => (prev + 1) % TERMINAL_LINES.length)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  const activeTerm = TERMINAL_LINES[termIdx]

  return (
    <MainLayout
      pageTitle="Home"
      pageMeta={{
        description: "G'day, I'm Eric. I’m a Software Engineer at Google.",
        endpoint: '/',
        imageUrl: '/images/eric-jiang-bitbybit.jpeg',
      }}
    >
      <div className="flex flex-col gap-20">
        {/* ANIMATED ACETERNITY HERO SECTION */}
        <BackgroundBeamsWithCollision className="rounded-3xl border border-neutral-200/80 bg-white/75 shadow-2xl shadow-sky-500/[0.04] backdrop-blur-2xl dark:border-white/[0.1] dark:bg-neutral-950/80">
          <HeroHighlight
            containerClassName="px-6 py-12 sm:px-12 sm:py-16 lg:py-20"
            className="w-full"
          >
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill="#38bdf8"
            />
            <Spotlight
              className="top-10 left-full h-[80vh] w-[50vw]"
              fill="#a855f7"
            />
            <BackgroundBeams />

            <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Animated Hero Copy */}
              <div className="flex flex-col items-start lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-md dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>Software Engineer @ Google • Android &amp; Pixel SDLC</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl lg:text-6xl dark:text-white"
                >
                  <span className="block">
                    G&apos;day, I&apos;m{' '}
                    <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text italic text-transparent">
                      Eric Jiang
                    </span>
                    .
                  </span>
                  <span className="mt-3 block text-2xl font-bold leading-snug text-neutral-800 sm:text-4xl dark:text-neutral-100">
                    Crafting
                    <FlipWords
                      words={flipWords}
                      className="text-sky-600 dark:text-sky-400"
                    />
                    <span className="block sm:inline">
                      engineering tools for{' '}
                      <Highlight className="text-neutral-900 dark:text-white">
                        Android &amp; Pixel
                      </Highlight>
                      .
                    </span>
                  </span>
                </motion.h1>

                <TextGenerateEffect
                  words="Technology has been rapidly growing and is at the forefront of bringing change. I've always wanted to build awesome & secure products which delight users and impact their lives. I currently build engineering tools to help make Android & Pixel devices more helpful & delightful for everyone!"
                  className="mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg dark:text-neutral-300"
                />

                {/* Interactive Live Terminal Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-6 w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950/95 p-3.5 font-mono text-xs text-neutral-200 shadow-lg dark:border-white/10"
                >
                  <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 flex items-center gap-1 text-[11px] text-neutral-400">
                        <IconTerminal2 className="h-3.5 w-3.5 text-sky-400" />
                        eric@ericjiang-server:~
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {TERMINAL_LINES.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTermIdx(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === termIdx
                              ? 'w-4 bg-sky-400'
                              : 'w-1.5 bg-white/20 hover:bg-white/40'
                          }`}
                          aria-label={`Terminal command ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={termIdx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-2 text-neutral-300">
                        <span className="text-sky-400">$</span>
                        <span className="truncate">{activeTerm.cmd}</span>
                      </div>
                      <div className={`truncate font-semibold ${activeTerm.color}`}>
                        {activeTerm.out}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/projects">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="div"
                      className="flex items-center space-x-2 bg-neutral-900 text-white dark:bg-neutral-950 dark:text-white"
                    >
                      <IconSparkles className="h-4 w-4 text-sky-400" />
                      <span>Explore Projects</span>
                    </HoverBorderGradient>
                  </Link>

                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/80 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-all hover:border-sky-500/50 hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
                  >
                    <span>Read the Blog</span>
                    <IconArrowUpRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
                  >
                    <span>Career Timeline</span>
                    <IconArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Aceternity 3D Card + Floating Orbiting Badges */}
              <div className="relative lg:col-span-5">
                {/* Floating Orbiting Badge 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute -top-5 -left-2 z-30 hidden items-center gap-2 rounded-2xl border border-sky-500/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-neutral-800 shadow-lg backdrop-blur-md sm:flex dark:bg-neutral-900/90 dark:text-white"
                >
                  <IconShieldCheck className="h-4 w-4 text-sky-500" />
                  <span>Pixel Security &amp; SDLC</span>
                </motion.div>

                {/* Floating Orbiting Badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }}
                  className="pointer-events-none absolute -right-2 -bottom-4 z-30 hidden items-center gap-2 rounded-2xl border border-amber-500/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-neutral-800 shadow-lg backdrop-blur-md sm:flex dark:bg-neutral-900/90 dark:text-white"
                >
                  <IconTrophy className="h-4 w-4 text-amber-500" />
                  <span>iTnews Rising Star</span>
                </motion.div>

                <CardContainer className="inter-var w-full">
                  <CardBody className="group/card relative h-auto w-full max-w-sm rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-2xl dark:border-white/[0.12] dark:bg-neutral-900/90 dark:hover:shadow-2xl dark:hover:shadow-sky-500/[0.15]">
                    <CardItem
                      translateZ="50"
                      className="flex w-full items-center justify-between"
                    >
                      <div>
                        <p className="text-lg font-bold text-neutral-900 dark:text-white">
                          Eric Jiang
                        </p>
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          Android &amp; Pixel Engineering
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        Google
                      </span>
                    </CardItem>

                    <CardItem translateZ="90" className="mt-4 w-full">
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-white/10">
                        <img
                          src="/images/eric-jiang-bitbybit.webp"
                          alt="Eric Jiang"
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                          <IconDeviceMobile className="h-3.5 w-3.5 text-sky-400" />
                          <span>SDLC BizTools &amp; Test Infra</span>
                        </div>
                      </div>
                    </CardItem>

                    <div className="mt-5 flex items-center justify-between">
                      <CardItem
                        translateZ={35}
                        className="flex items-center gap-2"
                      >
                        <a
                          href="https://github.com/ericjiang97"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
                          aria-label="GitHub"
                        >
                          <IconBrandGithub className="h-4 w-4" />
                        </a>
                        <a
                          href="https://linkedin.com/in/ericjiang97"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
                          aria-label="LinkedIn"
                        >
                          <IconBrandLinkedin className="h-4 w-4" />
                        </a>
                        <a
                          href="https://ericj.photos"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-sky-400"
                          aria-label="Photography"
                        >
                          <IconCamera className="h-4 w-4" />
                        </a>
                      </CardItem>

                      <CardItem
                        translateZ={35}
                        as="a"
                        href="https://resume.ericjiang.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-600 dark:bg-white dark:text-neutral-950 dark:hover:bg-sky-400"
                      >
                        Resume →
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            </div>

            {/* Hero Bottom Impact Metrics Strip */}
            <div className="relative z-10 mt-12 grid grid-cols-1 gap-3 border-t border-neutral-200/70 pt-8 sm:grid-cols-3 dark:border-white/10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200/60 bg-white/60 p-3.5 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.03]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </HeroHighlight>
        </BackgroundBeamsWithCollision>

        {/* ACETERNITY BENTO GRID SECTION */}
        <section>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                Highlights &amp; Craft
              </span>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Engineering, Impact &amp; Creative Work
              </h2>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400"
            >
              <span>Full career timeline</span>
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <BentoGrid>
            {/* Bento Item 1: Google Engineering */}
            <BentoGridItem
              className="md:col-span-2"
              href="/about"
              title="Android & Pixel SDLC Engineering at Google"
              description="Building business tools, test infrastructure, and security automation across Android & Pixel Software Development Lifecycle teams since 2020."
              icon={<IconCode className="h-5 w-5 text-sky-500" />}
              header={
                <div className="relative flex h-full min-h-[9rem] w-full flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-4 dark:border-white/10 dark:from-sky-500/15 dark:via-indigo-500/10 dark:to-neutral-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        android-sdlc-biztools — google
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { role: 'SDLC BizTools', year: '2025–Now' },
                      { role: 'Pixel Test Eng', year: '2023–2025' },
                      { role: 'Pixel Security', year: '2021–2023' },
                      { role: 'Script Automation', year: '2020–2021' },
                    ].map((stage) => (
                      <div
                        key={stage.role}
                        className="rounded-lg border border-neutral-200/70 bg-white/85 p-2.5 backdrop-blur-sm transition-transform duration-200 group-hover/bento:-translate-y-0.5 dark:border-white/10 dark:bg-neutral-950/75"
                      >
                        <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                          {stage.year}
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {stage.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* Bento Item 2: iTnews Rising Star with Meteors */}
            <BentoGridItem
              className="md:col-span-1"
              href="/about"
              title="iTnews Rising Star Winner"
              description="National award winner at the iTnews Benchmark Awards recognising young IT professionals across Australia."
              icon={<IconTrophy className="h-5 w-5 text-amber-500" />}
              header={
                <div className="relative h-full min-h-[9rem] w-full overflow-hidden rounded-xl border border-neutral-200/60 dark:border-white/10">
                  <img
                    src="/images/itnews-2019benchmarkmain.webp"
                    alt="iTnews Benchmark Awards"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <Meteors number={8} />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-bold text-black">
                    iTnews Benchmark Awards
                  </span>
                </div>
              }
            />

            {/* Bento Item 3: 6K & P3 Wallpapers */}
            <BentoGridItem
              className="md:col-span-1"
              href="/media/wallpapers"
              title="P3 & 6K Wallpapers"
              description="Travel photography from Japan, Taiwan & China edited and colour-calibrated for Pro Display XDR & Mac."
              icon={<IconCamera className="h-5 w-5 text-purple-500" />}
              header={
                <div className="grid h-full min-h-[9rem] w-full grid-cols-2 gap-2 overflow-hidden rounded-xl">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src="/downloads/wallpapers/fumushi-inari-1/preview.webp"
                      alt="Fushimi Inari"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/bento:scale-110"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src="/downloads/wallpapers/mt-takao-1/preview.webp"
                      alt="Mt Takao"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/bento:scale-110"
                    />
                  </div>
                </div>
              }
            />

            {/* Bento Item 4: Tech Talks & Community */}
            <BentoGridItem
              className="md:col-span-2"
              href="#talks"
              title="Tech Talks & Developer Community"
              description="Sharing insights on scalable Node.js on Google Cloud, React & Firebase MVPs, and Git workflows at JuniorDev, WIRED Monash, and Hackamon."
              icon={<IconMicrophone className="h-5 w-5 text-emerald-500" />}
              header={
                <div className="relative flex h-full min-h-[9rem] w-full items-center overflow-hidden rounded-xl border border-neutral-200/60 dark:border-white/10">
                  <img
                    src="/images/gcp-juniordev-talk.webp"
                    alt="Eric speaking at JuniorDev"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/bento:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
                  <div className="relative z-10 p-5 text-white">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md">
                      5+ Featured Speaker Sessions
                    </span>
                    <p className="mt-2 max-w-sm text-sm font-medium text-white/90">
                      &ldquo;Building NodeJS Apps on Google&apos;s Scalable
                      Infrastructure&rdquo;
                    </p>
                  </div>
                </div>
              }
            />
          </BentoGrid>
        </section>

        {/* LATEST FROM THE BLOG ON HOME PAGE */}
        {latestPosts && latestPosts.length > 0 && (
          <BlogHero posts={latestPosts} />
        )}

        {/* FEATURED PROJECTS WITH ACETERNITY HOVER EFFECT */}
        <section>
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                Open Source &amp; Products
              </span>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400"
            >
              <span>View all projects</span>
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <HoverEffect
            items={allProjects.map((proj) => ({
              title: proj.name,
              description: proj.description,
              link: proj.url,
              badge: proj.repoUrl ? 'Open Source' : 'Product',
            }))}
          />
        </section>

        {/* TECH TALKS SECTION WITH ACETERNITY CARD SPOTLIGHT */}
        <section id="talks" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
              Speaking &amp; Workshops
            </span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Tech Talks &amp; Presentations
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {talks.past.map((talk, index) => (
              <CardSpotlight
                key={index}
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
                <div className="mt-5">
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400"
                  >
                    <span>View Slides on SpeakerDeck</span>
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
