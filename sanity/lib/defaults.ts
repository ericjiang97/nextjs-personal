import type {
  SanityAboutPage,
  SanityExperience,
  SanityHomePage,
  SanityProject,
  SanitySiteSettings,
  SanityTalk,
  SanityWallpaper,
} from './queries'

export const DEFAULT_HOME_PAGE: SanityHomePage = {
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
  ],
  floatingBadge: 'Pixel Security & SDLC',
  cardName: 'Eric Jiang',
  cardSubtitle: 'Android & Pixel Engineering',
  cardCompanyBadge: 'Google',
  cardImageUrl: null,
  cardOverlayBadge: 'SDLC BizTools & Test Infra',
  githubUrl: 'https://github.com/ericjiang97',
  linkedinUrl: 'https://linkedin.com/in/ericjiang97',
  photosUrl: 'https://ericj.photos',
  resumeUrl: 'https://resume.ericjiang.dev',
  stats: [
    { value: '6+ Yrs', label: 'Engineering at Google', icon: 'code' },
    { value: '4 Roles', label: 'Android & Pixel Teams', icon: 'shield' },
    { value: '12+ 6K', label: 'Display P3 Wallpapers', icon: 'camera' },
  ],
  bentoEyebrow: 'Highlights & Craft',
  bentoHeading: 'Engineering, Impact & Creative Work',
  googleCardTitle: 'Android & Pixel SDLC Engineering at Google',
  googleCardDescription:
    'Building business tools, test infrastructure, and security automation across Android & Pixel Software Development Lifecycle teams since 2020.',
  googleRoleStages: [
    { role: 'SDLC BizTools', year: '2025–Now' },
    { role: 'Pixel Test Eng', year: '2023–2025' },
    { role: 'Pixel Security', year: '2021–2023' },
    { role: 'Script Automation', year: '2020–2021' },
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
}

export const DEFAULT_ABOUT_PAGE: SanityAboutPage = {
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
    { label: 'Current Team', value: 'Android & Pixel SDLC', highlight: false },
    {
      label: 'Education',
      value: 'Monash University (B.IT)',
      highlight: false,
    },
    { label: 'Major', value: 'Networks & Security', highlight: false },
    { label: 'Recognition', value: 'iTnews Rising Star', highlight: true },
  ],
  experienceEyebrow: 'Career Journey',
  experienceTitle: 'Experience',
}

export const DEFAULT_SITE_SETTINGS: SanitySiteSettings = {
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
}

export const DEFAULT_PROJECTS: SanityProject[] = [
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

export const DEFAULT_EXPERIENCES: SanityExperience[] = [
  {
    _id: 'exp-google',
    company: 'Google',
    companyUrl: 'https://about.google',
    order: 0,
    positions: [
      {
        title:
          'Software Engineer, SDLC BizTools, Android & Pixel Software Development Lifecycle (SDLC)',
        startDate: '2025-02-01',
      },
      {
        title: 'Software Engineer, Pixel Test Engineering',
        startDate: '2023-01-01',
        endDate: '2025-02-01',
      },
      {
        title: 'Test Engineer, Pixel Software Security',
        startDate: '2021-01-01',
        endDate: '2023-02-01',
      },
      {
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
        title: 'Software Engineer - Google Cloud',
        startDate: '2019-04-01',
        endDate: '2019-11-05',
      },
      {
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

export const DEFAULT_TALKS: SanityTalk[] = [
  {
    _id: 'talk-0',
    date: '1st August 2019',
    org: 'WIRED Monash',
    title: 'Introduction to Git',
    url: 'https://speakerdeck.com/ericjiang97/introduction-to-git',
    upcoming: false,
    order: 0,
  },
  {
    _id: 'talk-1',
    date: '19th September 2019',
    org: 'JuniorDev',
    title: 'Building NodeJS Apps on Google’s Scalable Infrastructure',
    url: 'https://speakerdeck.com/ericjiang97/building-scalable-nodejs-apps-on-googles-infrastructure',
    upcoming: false,
    order: 1,
  },
  {
    _id: 'talk-2',
    date: '30th April 2018',
    org: 'FIT2108 – Industry based learning seminar,Faculty of IT, Monash University',
    title: 'Student Innovation and Cloud Practices at Monash University ',
    url: 'https://speakerdeck.com/ericjiang97/student-innovation-and-cloud-practices-at-monash',
    upcoming: false,
    order: 2,
  },
  {
    _id: 'talk-3',
    date: '18th April 2018',
    org: 'Hackamon 2018, Monash University',
    title:
      'Getting Started at Hackathons – Building MVPs using ReactJS and Firebase',
    url: 'https://speakerdeck.com/ericjiang97/getting-started-at-hackathons-track-2-building-mvps-using-reactjs-and-firebase',
    upcoming: false,
    order: 3,
  },
  {
    _id: 'talk-4',
    date: '18th April 2018',
    org: 'Hackamon 2018, Monash University',
    title: 'Gitting Started at Hackathons– Introduction to Git',
    url: 'https://speakerdeck.com/ericjiang97/getting-started-at-hackathons-track-1-gitting-started',
    upcoming: false,
    order: 4,
  },
]

export const DEFAULT_WALLPAPERS: SanityWallpaper[] = [
  {
    _id: 'wp-0',
    title: 'CKS Memorial Hall',
    slug: 'cks-hall-taipei-1',
    wallpaperSlug: 'CKS',
    tags: ['CKS', 'taipei'],
    type: 'desktop',
    extension: 'png',
    previewFileName: 'preview.png',
    order: 0,
  },
  {
    _id: 'wp-1',
    title: 'Kiyomizu-Dera Tower',
    slug: 'kiyomizudera-1',
    wallpaperSlug: 'kiyomizudera-1',
    tags: ['kiyomizudera', 'mobile', 'kyoto', 'japan', 'tower'],
    type: 'mobile',
    extension: 'jpg',
    previewFileName: 'preview.png',
    order: 1,
  },
  {
    _id: 'wp-2',
    title: 'Spring Skies',
    slug: 'spring-skies',
    wallpaperSlug: 'SpringSkies',
    tags: ['spring', 'sky'],
    type: 'desktop',
    order: 2,
  },
  {
    _id: 'wp-3',
    title: 'Peach Blossom 1',
    slug: 'peach-blossom-1',
    wallpaperSlug: 'PeachBlossom',
    tags: ['nature', 'flowers', 'spring'],
    type: 'desktop',
    order: 3,
  },
  {
    _id: 'wp-4',
    title: 'Fumushi Inari',
    slug: 'fumushi-inari-1',
    wallpaperSlug: 'FumushiInari',
    tags: ['japan', 'torii', 'shrine', 'sunset'],
    type: 'desktop',
    order: 4,
  },
  {
    _id: 'wp-5',
    title: 'Great Wall',
    slug: 'great-wall-1',
    wallpaperSlug: 'GreatWall',
    tags: ['china'],
    type: 'desktop',
    order: 5,
  },
  {
    _id: 'wp-6',
    title: 'Imperial Guardian Lion',
    slug: 'guardian-lion-1',
    wallpaperSlug: 'ImperialGuardianLion',
    tags: ['china', 'forbidden city'],
    type: 'desktop',
    order: 6,
  },
  {
    _id: 'wp-7',
    title: 'Himeji Castle',
    slug: 'himeji-castle-1',
    wallpaperSlug: 'HimejiCastle',
    tags: ['japan', 'castles'],
    type: 'desktop',
    order: 7,
  },
  {
    _id: 'wp-8',
    title: 'Mt Takao 1',
    slug: 'mt-takao-1',
    wallpaperSlug: 'MtTakao',
    tags: ['japan', 'mountains', 'nature'],
    type: 'desktop',
    order: 8,
  },
  {
    _id: 'wp-9',
    title: 'Hakone Ropeway',
    slug: 'hakone-ropeway-1',
    wallpaperSlug: 'HakoneRopeway',
    tags: ['japan', 'mountains', 'nature'],
    type: 'desktop',
    order: 9,
  },
  {
    _id: 'wp-10',
    title: 'Japan Airlines B787 at Haneda Airport',
    slug: 'japan-airlines-b787-1',
    wallpaperSlug: 'JapanAirlinesB787',
    tags: ['japan', 'jal', 'b787'],
    type: 'desktop',
    order: 10,
  },
  {
    _id: 'wp-11',
    title: 'Deer of Nara',
    slug: 'deer-of-nara-1',
    wallpaperSlug: 'DeerNara',
    tags: ['deer', 'nara', 'japan', 'nature', 'animals'],
    type: 'desktop',
    order: 11,
  },
]
