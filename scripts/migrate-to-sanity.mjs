import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createClient } from '@sanity/client'

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) {
      process.env[key] = val
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vl1kxcdg'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19'
const PRISMIC_API = 'https://ericjiang.cdn.prismic.io/api/v2'

async function resolveSanityClient() {
  const explicitToken =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
  if (explicitToken) {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      token: explicitToken,
      useCdn: false,
    })
  }

  // Fallback to Sanity CLI user token when run via `npx sanity exec scripts/migrate-to-sanity.mjs --with-user-token`
  try {
    const { getCliClient } = await import('sanity/cli')
    const cliClient = getCliClient({ apiVersion, projectId, dataset })
    if (cliClient.config().token) {
      return cliClient
    }
  } catch {
    // ignore
  }

  console.error(`
❌ Missing Sanity write credentials!

Run ONE of the following:
  Option A (easiest — uses browser login, no manual token needed):
    npx sanity login
    npm run migrate:sanity:cli

  Option B (using an Editor API token in .env.local):
    Add SANITY_API_WRITE_TOKEN=<your_editor_token> to .env.local, then run:
    npm run migrate:sanity
`)
  process.exit(1)
}

const key = () => crypto.randomBytes(6).toString('hex')
const sanitizeId = (str) =>
  str.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-')

const imageCache = new Map()

async function uploadImageFromUrl(sanityClient, rawUrl, altText = '') {
  if (!rawUrl) return undefined
  const cleanUrl = rawUrl.split('?')[0]
  if (imageCache.has(cleanUrl)) {
    const assetId = imageCache.get(cleanUrl)
    return {
      _type: 'image',
      alt: altText || undefined,
      asset: { _type: 'reference', _ref: assetId },
    }
  }

  try {
    console.log(`  📷 Uploading image: ${cleanUrl.slice(0, 80)}...`)
    const res = await fetch(cleanUrl)
    if (!res.ok) {
      console.warn(`  ⚠️ Failed to fetch image (${res.status}): ${cleanUrl}`)
      return undefined
    }
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename =
      decodeURIComponent(cleanUrl.split('/').pop() || 'image.jpg') ||
      'image.jpg'
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename,
    })
    imageCache.set(cleanUrl, asset._id)
    return {
      _type: 'image',
      alt: altText || undefined,
      asset: { _type: 'reference', _ref: asset._id },
    }
  } catch (err) {
    console.warn(`  ⚠️ Image upload error for ${cleanUrl}:`, err.message)
    return undefined
  }
}

function prismicText(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (Array.isArray(field)) {
    return field
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n')
  }
  return ''
}

/**
 * Converts Prismic spans (start, end, type, data) on a block's text into
 * Sanity PortableText children + markDefs.
 */
function convertTextWithSpans(text = '', spans = []) {
  if (!text) {
    return {
      children: [{ _type: 'span', _key: key(), text: '', marks: [] }],
      markDefs: [],
    }
  }
  if (!spans || spans.length === 0) {
    return {
      children: [{ _type: 'span', _key: key(), text, marks: [] }],
      markDefs: [],
    }
  }

  const markDefs = []
  const normalizedSpans = spans.map((s) => {
    if (s.type === 'hyperlink') {
      const defKey = key()
      markDefs.push({
        _key: defKey,
        _type: 'link',
        href: s.data?.url || '#',
      })
      return { start: s.start, end: s.end, mark: defKey }
    }
    if (s.type === 'strong') return { start: s.start, end: s.end, mark: 'strong' }
    if (s.type === 'em') return { start: s.start, end: s.end, mark: 'em' }
    return null
  }).filter(Boolean)

  // Collect all boundary offsets
  const boundaries = new Set([0, text.length])
  for (const s of normalizedSpans) {
    boundaries.add(Math.max(0, Math.min(text.length, s.start)))
    boundaries.add(Math.max(0, Math.min(text.length, s.end)))
  }
  const sorted = [...boundaries].sort((a, b) => a - b)

  const children = []
  for (let i = 0; i < sorted.length - 1; i++) {
    const segStart = sorted[i]
    const segEnd = sorted[i + 1]
    if (segEnd <= segStart) continue
    const sliceText = text.slice(segStart, segEnd)
    const activeMarks = normalizedSpans
      .filter((s) => s.start <= segStart && s.end >= segEnd)
      .map((s) => s.mark)
    children.push({
      _type: 'span',
      _key: key(),
      text: sliceText,
      marks: [...new Set(activeMarks)],
    })
  }

  return {
    children:
      children.length > 0
        ? children
        : [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs,
  }
}

async function convertPrismicRichText(sanityClient, blocks = []) {
  if (!Array.isArray(blocks) || blocks.length === 0) return []
  const result = []

  const styleMap = {
    paragraph: 'normal',
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    heading5: 'h4',
    heading6: 'h4',
  }

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    if (!b) continue

    if (b.type === 'preformatted') {
      // Merge adjacent preformatted lines if Prismic split them
      let codeLines = [b.text || '']
      while (blocks[i + 1]?.type === 'preformatted') {
        i++
        codeLines.push(blocks[i].text || '')
      }
      result.push({
        _type: 'codeBlock',
        _key: key(),
        language: 'snippet',
        code: codeLines.join('\n'),
      })
      continue
    }

    if (b.type === 'image') {
      const uploaded = await uploadImageFromUrl(sanityClient, b.url, b.alt)
      if (uploaded) {
        result.push({
          ...uploaded,
          _key: key(),
        })
      }
      continue
    }

    if (b.type === 'embed') {
      result.push({
        _type: 'youtubeEmbed',
        _key: key(),
        url: b.oembed?.embed_url || undefined,
        html: b.oembed?.html || undefined,
      })
      continue
    }

    if (b.type === 'list-item' || b.type === 'o-list-item') {
      const { children, markDefs } = convertTextWithSpans(b.text, b.spans)
      result.push({
        _type: 'block',
        _key: key(),
        style: 'normal',
        listItem: b.type === 'o-list-item' ? 'number' : 'bullet',
        level: 1,
        markDefs,
        children,
      })
      continue
    }

    const style = styleMap[b.type] || 'normal'
    const { children, markDefs } = convertTextWithSpans(b.text, b.spans)
    result.push({
      _type: 'block',
      _key: key(),
      style,
      markDefs,
      children,
    })
  }

  return result
}

async function convertPrismicSlices(sanityClient, slices = []) {
  if (!Array.isArray(slices) || slices.length === 0) return []
  const out = []

  for (const sl of slices) {
    const type = sl.slice_type
    const primary = sl.primary || {}
    const items = sl.items || []

    if (type === 'single_image') {
      const image = await uploadImageFromUrl(
        sanityClient,
        primary.image?.url,
        primary.image?.alt
      )
      out.push({
        _key: key(),
        _type: 'singleImageSlice',
        image,
        description: primary.description || undefined,
      })
    } else if (type === 'before_after') {
      const beforeImage = await uploadImageFromUrl(
        sanityClient,
        primary.before_image?.url,
        primary.before_image?.alt
      )
      const afterImage = await uploadImageFromUrl(
        sanityClient,
        primary.after_image?.url,
        primary.after_image?.alt
      )
      out.push({
        _key: key(),
        _type: 'beforeAfterSlice',
        title: primary.title || undefined,
        beforeImage,
        afterImage,
      })
    } else if (type === 'image_group') {
      const images = []
      for (const item of items) {
        const img = await uploadImageFromUrl(
          sanityClient,
          item.image?.url,
          item.image?.alt
        )
        if (img) images.push({ ...img, _key: key() })
      }
      out.push({
        _key: key(),
        _type: 'imageGroupSlice',
        title: primary.title || undefined,
        images,
      })
    } else if (type === 'image_left') {
      const image = await uploadImageFromUrl(
        sanityClient,
        primary.image?.url,
        primary.image?.alt
      )
      const text = await convertPrismicRichText(sanityClient, primary.text)
      out.push({
        _key: key(),
        _type: 'imageWithTextSlice',
        image,
        position: primary.position === 'right' ? 'right' : 'left',
        text,
      })
    } else if (type === 'rich_text') {
      const text = await convertPrismicRichText(sanityClient, primary.text)
      out.push({
        _key: key(),
        _type: 'richTextSlice',
        text,
      })
    }
  }

  return out
}

async function fetchAllPrismicDocs() {
  const api = await fetch(PRISMIC_API).then((r) => r.json())
  const ref = api.refs.find((r) => r.isMasterRef).ref
  const res = await fetch(
    `${PRISMIC_API}/documents/search?ref=${encodeURIComponent(ref)}&pageSize=100`
  ).then((r) => r.json())
  return res.results || []
}

async function run() {
  console.log(
    `🚀 Migrating Prismic + Local TS Data → Sanity (${projectId}/${dataset})...\n`
  )
  const sanityClient = await resolveSanityClient()

  // 1. Seed Singletons (Home Page, About Page, Site Settings)
  console.log('1️⃣ Creating Site Singletons (Home, About, Site Settings)...')
  await sanityClient.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroBadge: 'Software Engineer @ Google • Android & Pixel SDLC',
    heroGreeting: "G'day, I'm",
    heroName: 'Eric Jiang',
    heroRoleVerb: 'Crafting',
    flipWords: ['delightful', 'secure', 'scalable', 'impactful'],
    heroRoleSuffix: 'engineering tools for',
    heroHighlight: 'Android & Pixel',
    heroBio:
      "Technology has been rapidly growing and is at the forefront of bringing change. I've always wanted to build awesome & secure products which delight users and impact their lives. I currently build engineering tools to help make Android & Pixel devices more helpful & delightful for everyone!",
    terminalHost: 'eric@ericjiang-server:~',
    terminalLines: [
      {
        _key: key(),
        cmd: 'blaze test //android/sdlc/biztools/...',
        out: '✓ 1,428 passed in 0.42s • 100% coverage',
        color: 'text-emerald-400',
      },
      {
        _key: key(),
        cmd: 'pixel-sec verify --target=tensor-trustzone',
        out: '🛡️ Security attestation verified (0 advisories)',
        color: 'text-sky-400',
      },
      {
        _key: key(),
        cmd: 'color-sync export --profile="Display P3" --res=6K',
        out: '📷 12 high-DPI wallpapers ready for download',
        color: 'text-purple-400',
      },
    ],
    floatingBadge: 'Pixel Security & SDLC',
    cardName: 'Eric Jiang',
    cardSubtitle: 'Android & Pixel Engineering',
    cardCompanyBadge: 'Google',
    cardOverlayBadge: 'SDLC BizTools & Test Infra',
    githubUrl: 'https://github.com/ericjiang97',
    linkedinUrl: 'https://linkedin.com/in/ericjiang97',
    photosUrl: 'https://ericj.photos',
    resumeUrl: 'https://resume.ericjiang.dev',
    stats: [
      {
        _key: key(),
        value: '6+ Yrs',
        label: 'Engineering at Google',
        icon: 'code',
      },
      {
        _key: key(),
        value: '4 Roles',
        label: 'Android & Pixel Teams',
        icon: 'shield',
      },
      {
        _key: key(),
        value: '12+ 6K',
        label: 'Display P3 Wallpapers',
        icon: 'camera',
      },
    ],
    bentoEyebrow: 'Highlights & Craft',
    bentoHeading: 'Engineering, Impact & Creative Work',
    googleCardTitle: 'Android & Pixel SDLC Engineering at Google',
    googleCardDescription:
      'Building business tools, test infrastructure, and security automation across Android & Pixel Software Development Lifecycle teams since 2020.',
    googleRoleStages: [
      { _key: key(), role: 'SDLC BizTools', year: '2025–Now' },
      { _key: key(), role: 'Pixel Test Eng', year: '2023–2025' },
      { _key: key(), role: 'Pixel Security', year: '2021–2023' },
      { _key: key(), role: 'Script Automation', year: '2020–2021' },
    ],
    wallpapersCardTitle: 'P3 & 6K Wallpapers',
    wallpapersCardDescription:
      'Travel photography from Japan, Taiwan & China edited and colour-calibrated for Pro Display XDR & Mac.',
    talksCardTitle: 'Tech Talks & Developer Community',
    talksCardDescription:
      'Sharing insights on scalable Node.js on Google Cloud, React & Firebase MVPs, and Git workflows at JuniorDev, WIRED Monash, and Hackamon.',
    talksCardBadge: '5+ Featured Speaker Sessions',
    talksCardQuote: 'Building NodeJS Apps on Google’s Scalable Infrastructure',
    projectsEyebrow: 'Open Source & Products',
    projectsHeading: 'Featured Projects',
    talksSectionEyebrow: 'Speaking & Workshops',
    talksSectionHeading: 'Tech Talks & Presentations',
  })

  await sanityClient.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroBadge: 'About & Career',
    heroTitle: 'About Me',
    heroDescription:
      'I bring my passion for technology to build awesome, delightful & secure software for everyone.',
    metaDescription:
      'I finished my Bachelor of Information Technology at Monash University in Melbourne, Australia where I majored in Computer networks and security.',
    bioEyebrow: 'Background',
    bioLeadText:
      'As a Software Engineer on the Android SDLC BizTools Team within the Android Software Development Lifecycle team at',
    bioCompanyName: 'Google',
    bioCompanyUrl: 'https://about.google',
    bioTrailingText:
      ', I work on building and maintaining business tools such as test infrastructure, as well as shaping better processes to enable software and hardware teams to build the best products possible.',
    resumeUrl: 'https://resume.ericjiang.dev',
    resumeButtonLabel: 'View Resume',
    contactEmail: 'recruiting@ericjiang.dev',
    quickFactsEyebrow: 'Quick Facts',
    quickFactsTitle: 'At a Glance',
    quickFacts: [
      {
        _key: key(),
        label: 'Current Team',
        value: 'Android & Pixel SDLC',
        highlight: false,
      },
      {
        _key: key(),
        label: 'Education',
        value: 'Monash University (B.IT)',
        highlight: false,
      },
      {
        _key: key(),
        label: 'Major',
        value: 'Networks & Security',
        highlight: false,
      },
      {
        _key: key(),
        label: 'Recognition',
        value: 'iTnews Rising Star',
        highlight: true,
      },
    ],
    experienceEyebrow: 'Career Journey',
    experienceTitle: 'Experience',
  })

  await sanityClient.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'Eric Jiang',
    copyrightOwner: 'Eric Jiang',
    blogHeroBadge: 'Articles & Thoughts',
    blogHeroTitle: 'Blog',
    blogHeroDescription:
      "I occasionally write on my blog about tech, projects, food, reviews (and photography & travel)... so here's some of them.",
    projectsHeroBadge: 'Open Source & Products',
    projectsHeroTitle: 'Projects',
    projectsHeroDescription:
      "Whether it's a side project, or a product I'm working on at work, I bring my knowledge and energy to help build the most awesome, delightful, secure products for everyone.",
    albumsHeroBadge: 'Photography Stories',
    albumsHeroTitle: 'Albums',
    albumsHeroDescription:
      'I take photos in my spare time — explore curated collections from my travels and adventures.',
    mediaHeroBadge: 'Photography, Wallpapers & Talks',
    mediaHeroTitle: 'Media',
    mediaHeroDescription:
      "Check out photography, Display P3 wallpapers, and tech talks I've given.",
    mediaCards: [
      {
        _key: key(),
        title: 'Photography Portfolio',
        href: 'https://ericj.photos',
        external: true,
        icon: 'camera',
        badge: 'External Site',
        accent: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
        description:
          "I take photos when I'm travelling around the world — explore my full high-resolution photography portfolio!",
      },
      {
        _key: key(),
        title: '4K / 5K / 6K Wallpapers',
        href: '/media/wallpapers',
        external: false,
        icon: 'photo',
        badge: 'Display P3',
        accent: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
        description:
          'Curated travel photos edited and colour-calibrated with Display P3 profiles for Mac, Pro Display XDR, and mobile screens.',
      },
      {
        _key: key(),
        title: 'Photo Albums',
        href: '/albums',
        external: false,
        icon: 'stack',
        badge: 'Stories',
        accent: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
        description:
          'Visual stories and curated photo collections from trips, events, and adventures.',
      },
    ],
    wallpapersHeroBadge: '4K • 5K • 6K Display P3',
    wallpapersHeroTitle: 'Wallpapers',
    wallpapersHeroDescription:
      'Photos edited and colour-calibrated as wallpapers for Mac & high-DPI displays. Hover any card to focus, or click to download full-resolution P3 images.',
    wallpaperFilters: ['all', 'desktop', 'mobile', 'japan', 'nature', 'china'],
  })

  // 2. Seed Local TS Collections (Projects, Experience, Talks, Wallpapers)
  console.log('2️⃣ Importing Projects, Experience, Talks & Wallpapers...')
  const projectsSeed = [
    {
      _id: 'project-mariejs',
      name: 'MARIE.js',
      description:
        'MARIE.js is a very simple and intuitive Assembly Language Simulator. It is a web-based version of the MARIE simulator.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/18567331?v=4',
      repoUrl: 'https://github.com/MARIE-js/MARIE.js',
      screenshotUrl: '/images/projects/mariejs.png',
      url: 'https://marie.js.org',
      status: 'previous',
      order: 0,
    },
    {
      _id: 'project-geckodm',
      name: 'GeckoDM',
      description:
        '🐸 Gecko Download Manager is a Chrome Extension that improves downloading lectures 💾 from the Echo360 System.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/26992093?v=4',
      repoUrl: 'https://github.com/GeckoDM/GeckoDownloadManager',
      url: 'https://geckodm.github.io/',
      status: 'previous',
      order: 1,
    },
    {
      _id: 'project-monplan',
      name: 'MonPlan',
      description:
        'MonPlan is the official Monash University enterprise course planning tool, built for students by students.',
      url: 'https://monplan.apps.monash.edu',
      status: 'previous',
      order: 2,
    },
    {
      _id: 'project-covid19-flights',
      name: 'COVID19 Australia Flight Tracker',
      description:
        'Tracks flights sourced from various Australian state government websites using automated scraping tool.',
      url: 'https://covid19-flights.ericjiang.dev/',
      status: 'previous',
      order: 3,
    },
    {
      _id: 'project-muhnee',
      name: 'Muhnee',
      description:
        'Muhnee is a new and exciting way to make managing your money simple.',
      imageUrl: 'https://avatars1.githubusercontent.com/u/58194669?v=4',
      url: 'https://muhneeapp.com',
      status: 'previous',
      order: 4,
    },
  ]
  for (const p of projectsSeed) {
    await sanityClient.createOrReplace({ ...p, _type: 'project' })
  }

  const experiencesSeed = [
    {
      _id: 'exp-google',
      company: 'Google',
      companyUrl: 'https://about.google',
      order: 0,
      positions: [
        {
          _key: key(),
          title:
            'Software Engineer, SDLC BizTools, Android & Pixel Software Development Lifecycle (SDLC)',
          startDate: '2025-02-01',
        },
        {
          _key: key(),
          title: 'Software Engineer, Pixel Test Engineering',
          startDate: '2023-01-01',
          endDate: '2025-02-01',
        },
        {
          _key: key(),
          title: 'Test Engineer, Pixel Software Security',
          startDate: '2021-01-01',
          endDate: '2023-02-01',
        },
        {
          _key: key(),
          title: 'Test Engineer, Script Automation',
          startDate: '2020-04-20',
          endDate: '2021-01-01',
        },
      ],
    },
    {
      _id: 'exp-monash',
      company: 'Monash University',
      companyUrl: 'https://monash.edu/esolutions',
      order: 1,
      positions: [
        {
          _key: key(),
          title: 'Software Engineer - Google Cloud',
          startDate: '2019-04-01',
          endDate: '2019-11-05',
        },
        {
          _key: key(),
          title: 'Junior Software Engineer – MonPlan Founder and Tech Lead',
          startDate: '2016-12-05',
          endDate: '2019-03-31',
          description: [
            'Successfully founded and delivered MonPlan which is the enterprise course planning application for Monash University, from ideation all the way up to an enterprise production application through the multi-million dollar, high-profile Student First program. Which delivered impact to 70000+ students and around 300+ staff. The application enhanced the business processes and the student experience.',
            'Finalist and Winner for itNews 2019 Benchmark Awards – Rising Star Category which is a National Award which recognises a young IT professional who displays exceptional promise and has already clocked up impressive achievements.',
            'Mentored other student development teams which successfully delivered products like SwapMe (class swapping application) and Project Portal (Final Year Project management platform for the Faculty of Engineering) which delivered impact to over 70000 students, and overhauled existing tedious processes.',
            "Lead the development and replatform of the Student Booklist App and Bulk Messaging Service as part of the University's Cybersecurity Uplift Project to reduce risk across legacy systems",
          ],
        },
      ],
    },
    {
      _id: 'exp-localz',
      company: 'Localz',
      companyUrl: 'https://localz.com',
      order: 2,
      positions: [
        {
          _key: key(),
          title: 'Intern Software Engineer',
          startDate: '2017-12-05',
          endDate: '2018-02-28',
          description: [
            "Designed and Built various React Native (RN) 'Core' Components for future use in RN Apps, which are highly customisable through internal APIs which allowed components to be reused.",
            'Designed and built various components for react-native applications which are highly reusable and maintainable through OO Design, ReactJS and Redux Principles, such as the introduction of a modal stack into the core framework of the app.',
          ],
        },
      ],
    },
  ]
  for (const exp of experiencesSeed) {
    await sanityClient.createOrReplace({ ...exp, _type: 'experience' })
  }

  const talksSeed = [
    {
      _id: 'talk-basic-git',
      slug: { _type: 'slug', current: 'basic-git' },
      date: '1st August 2019',
      talkDate: '2019-08-01',
      org: 'WIRED Monash',
      title: 'Introduction to Git',
      url: 'https://speakerdeck.com/ericjiang97/introduction-to-git',
      upcoming: false,
      order: 0,
    },
    {
      _id: 'talk-nodejs-gcp',
      slug: {
        _type: 'slug',
        current: 'building-scalable-nodejs-apps-on-googles-infrastructure',
      },
      date: '19th September 2019',
      talkDate: '2019-09-19',
      org: 'JuniorDev',
      title: 'Building NodeJS Apps on Google’s Scalable Infrastructure',
      url: 'https://speakerdeck.com/ericjiang97/building-scalable-nodejs-apps-on-googles-infrastructure',
      upcoming: false,
      order: 1,
    },
    {
      _id: 'talk-student-innovation',
      slug: {
        _type: 'slug',
        current: 'student-innovation-and-cloud-practices-at-monash',
      },
      date: '30th April 2018',
      talkDate: '2018-04-30',
      org: 'FIT2108 – Industry based learning seminar,Faculty of IT, Monash University',
      title: 'Student Innovation and Cloud Practices at Monash University',
      url: 'https://speakerdeck.com/ericjiang97/student-innovation-and-cloud-practices-at-monash',
      upcoming: false,
      order: 2,
    },
    {
      _id: 'talk-hackamon-mvp',
      slug: { _type: 'slug', current: 'hackamon-monash-university' },
      date: '18th April 2018',
      talkDate: '2018-04-18',
      org: 'Hackamon 2018, Monash University',
      title:
        'Getting Started at Hackathons – Building MVPs using ReactJS and Firebase',
      url: 'https://speakerdeck.com/ericjiang97/getting-started-at-hackathons-track-2-building-mvps-using-reactjs-and-firebase',
      upcoming: false,
      order: 3,
    },
    {
      _id: 'talk-hackamon-git',
      slug: {
        _type: 'slug',
        current: 'getting-started-at-hackathons---gitting-started',
      },
      date: '18th April 2018',
      talkDate: '2018-04-18',
      org: 'Hackamon 2018, Monash University',
      title: 'Gitting Started at Hackathons– Introduction to Git',
      url: 'https://speakerdeck.com/ericjiang97/getting-started-at-hackathons-track-1-gitting-started',
      upcoming: false,
      order: 4,
    },
  ]
  for (const t of talksSeed) {
    await sanityClient.createOrReplace({ ...t, _type: 'talk' })
  }

  const wallpapersSeed = [
    {
      title: 'CKS Memorial Hall',
      slug: 'cks-hall-taipei-1',
      wallpaperSlug: 'CKS',
      tags: ['CKS', 'taipei'],
      type: 'desktop',
      extension: 'png',
      previewFileName: 'preview.png',
    },
    {
      title: 'Kiyomizu-Dera Tower',
      slug: 'kiyomizudera-1',
      wallpaperSlug: 'kiyomizudera-1',
      tags: ['kiyomizudera', 'mobile', 'kyoto', 'japan', 'tower'],
      type: 'mobile',
      extension: 'jpg',
      previewFileName: 'preview.png',
    },
    {
      title: 'Spring Skies',
      slug: 'spring-skies',
      wallpaperSlug: 'SpringSkies',
      tags: ['spring', 'sky'],
      type: 'desktop',
    },
    {
      title: 'Peach Blossom 1',
      slug: 'peach-blossom-1',
      wallpaperSlug: 'PeachBlossom',
      tags: ['nature', 'flowers', 'spring'],
      type: 'desktop',
    },
    {
      title: 'Fumushi Inari',
      slug: 'fumushi-inari-1',
      wallpaperSlug: 'FumushiInari',
      tags: ['japan', 'torii', 'shrine', 'sunset'],
      type: 'desktop',
    },
    {
      title: 'Great Wall',
      slug: 'great-wall-1',
      wallpaperSlug: 'GreatWall',
      tags: ['china'],
      type: 'desktop',
    },
    {
      title: 'Imperial Guardian Lion',
      slug: 'guardian-lion-1',
      wallpaperSlug: 'ImperialGuardianLion',
      tags: ['china', 'forbidden city'],
      type: 'desktop',
    },
    {
      title: 'Himeji Castle',
      slug: 'himeji-castle-1',
      wallpaperSlug: 'HimejiCastle',
      tags: ['japan', 'castles'],
      type: 'desktop',
    },
    {
      title: 'Mt Takao 1',
      slug: 'mt-takao-1',
      wallpaperSlug: 'MtTakao',
      tags: ['japan', 'mountains', 'nature'],
      type: 'desktop',
    },
    {
      title: 'Hakone Ropeway',
      slug: 'hakone-ropeway-1',
      wallpaperSlug: 'HakoneRopeway',
      tags: ['japan', 'mountains', 'nature'],
      type: 'desktop',
    },
    {
      title: 'Japan Airlines B787 at Haneda Airport',
      slug: 'japan-airlines-b787-1',
      wallpaperSlug: 'JapanAirlinesB787',
      tags: ['japan', 'jal', 'b787'],
      type: 'desktop',
    },
    {
      title: 'Deer of Nara',
      slug: 'deer-of-nara-1',
      wallpaperSlug: 'DeerNara',
      tags: ['deer', 'nara', 'japan', 'nature', 'animals'],
      type: 'desktop',
    },
  ]
  for (let i = 0; i < wallpapersSeed.length; i++) {
    const w = wallpapersSeed[i]
    await sanityClient.createOrReplace({
      _id: `wallpaper-${sanitizeId(w.slug)}`,
      _type: 'wallpaper',
      title: w.title,
      slug: { _type: 'slug', current: w.slug },
      wallpaperSlug: w.wallpaperSlug,
      tags: w.tags,
      type: w.type,
      extension: w.extension || 'jpg',
      previewFileName: w.previewFileName || 'preview.webp',
      order: i,
    })
  }

  // 3. Migrate All Prismic Documents (Categories, Blog Posts, Albums)
  console.log('3️⃣ Fetching all Prismic documents from CDN...')
  const prismicDocs = await fetchAllPrismicDocs()
  console.log(`   Found ${prismicDocs.length} Prismic documents.`)

  const prismicCategories = prismicDocs.filter((d) => d.type === 'category')
  const categoryIdByPrismicId = new Map()

  console.log(`   Importing ${prismicCategories.length} categories...`)
  for (const cat of prismicCategories) {
    const sanityCatId = `category-${sanitizeId(cat.uid || cat.id)}`
    categoryIdByPrismicId.set(cat.id, sanityCatId)
    await sanityClient.createOrReplace({
      _id: sanityCatId,
      _type: 'category',
      title: cat.data?.category_name || cat.uid,
      slug: { _type: 'slug', current: cat.uid },
    })
  }

  const prismicPosts = prismicDocs.filter((d) => d.type === 'blog-post')
  console.log(`   Importing ${prismicPosts.length} blog posts (with images)...`)
  for (const post of prismicPosts) {
    const uid = post.uid || post.id
    console.log(`   📝 Blog post: ${uid}`)
    const banner = await uploadImageFromUrl(
      sanityClient,
      post.data?.banner?.url,
      post.data?.banner?.alt
    )
    const bodyBlocks = await convertPrismicRichText(
      sanityClient,
      post.data?.body
    )
    const extraSlices = await convertPrismicSlices(
      sanityClient,
      post.data?.body1
    )
    const prismicCatId = post.data?.category?.id
    const mappedCatId = prismicCatId
      ? categoryIdByPrismicId.get(prismicCatId)
      : undefined

    await sanityClient.createOrReplace({
      _id: `blogPost-${sanitizeId(uid)}`,
      _type: 'blogPost',
      title: prismicText(post.data?.title) || uid,
      slug: { _type: 'slug', current: uid },
      author:
        prismicText(post.data?.author) || 'Eric Jiang <eric@ericjiang.dev>',
      publishedAt:
        post.data?.published_time || post.first_publication_date || undefined,
      preview: Boolean(post.data?.preview),
      summary: prismicText(post.data?.summary) || '',
      category: mappedCatId
        ? { _type: 'reference', _ref: mappedCatId }
        : undefined,
      banner,
      body: [...bodyBlocks, ...extraSlices],
    })
  }

  const prismicAlbums = prismicDocs.filter((d) => d.type === 'album')
  console.log(`   Importing ${prismicAlbums.length} photo albums (with full-res photos)...`)
  for (const album of prismicAlbums) {
    const uid = album.uid || album.id
    console.log(`   🖼️ Album: ${uid}`)
    const featuredImage = await uploadImageFromUrl(
      sanityClient,
      album.data?.featured_image?.url,
      album.data?.featured_image?.alt
    )
    const description = await convertPrismicRichText(
      sanityClient,
      album.data?.description
    )
    const slices = await convertPrismicSlices(sanityClient, album.data?.body)

    await sanityClient.createOrReplace({
      _id: `album-${sanitizeId(uid)}`,
      _type: 'album',
      title: prismicText(album.data?.title) || uid,
      slug: { _type: 'slug', current: uid },
      publishedAt: album.first_publication_date || undefined,
      updatedAt: album.last_publication_date || undefined,
      description,
      featuredImage,
      slices,
    })
  }

  console.log('\n✅ Migration complete! All Prismic & local TS data is live in Sanity.')
}

run().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
