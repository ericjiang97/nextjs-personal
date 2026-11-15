import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Banners',
  type: 'document',
  groups: [
    { name: 'general', title: 'Navigation & Footer' },
    { name: 'banners', title: 'Page Hero Banners' },
    { name: 'media', title: 'Media & Wallpapers Page' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'copyrightOwner',
      title: 'Copyright Name',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'blogHeroBadge',
      title: 'Blog Hero Badge',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'blogHeroTitle',
      title: 'Blog Hero Title',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'blogHeroDescription',
      title: 'Blog Hero Description',
      type: 'text',
      rows: 2,
      group: 'banners',
    }),
    defineField({
      name: 'projectsHeroBadge',
      title: 'Projects Hero Badge',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'projectsHeroTitle',
      title: 'Projects Hero Title',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'projectsHeroDescription',
      title: 'Projects Hero Description',
      type: 'text',
      rows: 2,
      group: 'banners',
    }),
    defineField({
      name: 'albumsHeroBadge',
      title: 'Albums Hero Badge',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'albumsHeroTitle',
      title: 'Albums Hero Title',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'albumsHeroDescription',
      title: 'Albums Hero Description',
      type: 'text',
      rows: 2,
      group: 'banners',
    }),
    defineField({
      name: 'placesHeroBadge',
      title: 'Places Hero Badge',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'placesHeroTitle',
      title: 'Places Hero Title',
      type: 'string',
      group: 'banners',
    }),
    defineField({
      name: 'placesHeroDescription',
      title: 'Places Hero Description',
      type: 'text',
      rows: 2,
      group: 'banners',
    }),
    defineField({
      name: 'mediaHeroBadge',
      title: 'Media Hero Badge',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'mediaHeroTitle',
      title: 'Media Hero Title',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'mediaHeroDescription',
      title: 'Media Hero Description',
      type: 'text',
      rows: 2,
      group: 'media',
    }),
    defineField({
      name: 'mediaCards',
      title: 'Media Hub Cards',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'href', title: 'Link URL / Path', type: 'string' }),
            defineField({
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Camera', value: 'camera' },
                  { title: 'Photo', value: 'photo' },
                  { title: 'Stack', value: 'stack' },
                ],
              },
              initialValue: 'camera',
            }),
            defineField({ name: 'badge', title: 'Badge', type: 'string' }),
            defineField({
              name: 'accent',
              title: 'Accent Classes',
              type: 'string',
              initialValue: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'badge' },
          },
        }),
      ],
    }),
    defineField({
      name: 'wallpapersHeroBadge',
      title: 'Wallpapers Hero Badge',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'wallpapersHeroTitle',
      title: 'Wallpapers Hero Title',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'wallpapersHeroDescription',
      title: 'Wallpapers Hero Description',
      type: 'text',
      rows: 2,
      group: 'media',
    }),
    defineField({
      name: 'wallpaperFilters',
      title: 'Wallpaper Filter Pills',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings & Banners' }
    },
  },
})
