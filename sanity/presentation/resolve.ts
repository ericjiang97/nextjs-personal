import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == "homePage" && _id == "homePage"`,
    },
    {
      route: '/about',
      filter: `_type == "aboutPage" && _id == "aboutPage"`,
    },
    {
      route: '/projects',
      filter: `_type == "siteSettings" && _id == "siteSettings"`,
    },
    {
      route: '/media',
      filter: `_type == "siteSettings" && _id == "siteSettings"`,
    },
    {
      route: '/media/wallpapers',
      filter: `_type == "siteSettings" && _id == "siteSettings"`,
    },
    {
      route: '/blog/:uid',
      filter: `_type == "blogPost" && slug.current == $uid`,
    },
    {
      route: '/blog/categories/:uid',
      filter: `_type == "category" && slug.current == $uid`,
    },
    {
      route: '/albums/:uid',
      filter: `_type == "album" && slug.current == $uid`,
    },
  ]),
  locations: {
    homePage: defineLocations({
      locations: [{ title: 'Home Page', href: '/' }],
    }),
    aboutPage: defineLocations({
      locations: [{ title: 'About Page', href: '/about' }],
    }),
    siteSettings: defineLocations({
      locations: [
        { title: 'Blog Index', href: '/blog' },
        { title: 'Projects', href: '/projects' },
        { title: 'Albums', href: '/albums' },
        { title: 'Media', href: '/media' },
        { title: 'Wallpapers', href: '/media/wallpapers' },
      ],
    }),
    blogPost: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Post',
            href: doc?.slug ? `/blog/${doc.slug}` : '/blog',
          },
          { title: 'Blog Index', href: '/blog' },
        ],
      }),
    }),
    category: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Category',
            href: doc?.slug ? `/blog/categories/${doc.slug}` : '/blog',
          },
        ],
      }),
    }),
    album: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Album',
            href: doc?.slug ? `/albums/${doc.slug}` : '/albums',
          },
          { title: 'All Albums', href: '/albums' },
        ],
      }),
    }),
    project: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Projects', href: '/projects' },
          { title: 'Home (Featured Projects)', href: '/' },
        ],
      }),
    }),
    experience: defineLocations({
      select: { title: 'company' },
      resolve: (doc) => ({
        locations: [
          { title: `${doc?.title || 'Career'} Timeline`, href: '/about' },
        ],
      }),
    }),
    talk: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Media & Talks', href: '/media' },
          { title: 'Home (Talks Section)', href: '/#talks' },
        ],
      }),
    }),
    wallpaper: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Wallpapers', href: '/media/wallpapers' },
        ],
      }),
    }),
  },
}
