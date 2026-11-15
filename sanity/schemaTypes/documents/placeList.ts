import { defineArrayMember, defineField, defineType } from 'sanity'

export const placeListType = defineType({
  name: 'placeList',
  title: 'Places List',
  type: 'document',
  groups: [
    { name: 'content', title: 'List & Places', default: true },
    { name: 'appearance', title: 'Theme & Display' },
    { name: 'sharing', title: 'Visibility & Sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'List Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Share Slug (/places/[slug])',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Icon Emoji',
      type: 'string',
      group: 'content',
      initialValue: '🍜',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'places',
      title: 'Favourite Places',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'placeItem' })],
    }),
    defineField({
      name: 'coverTheme',
      title: 'Accent Theme',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          { title: 'Amber Sunset', value: 'amber' },
          { title: 'Ocean Cyan', value: 'cyan' },
          { title: 'Neon Violet', value: 'violet' },
          { title: 'Forest Emerald', value: 'emerald' },
          { title: 'Tokyo Rose', value: 'rose' },
        ],
        layout: 'radio',
      },
      initialValue: 'amber',
    }),
    defineField({
      name: 'sortBy',
      title: 'Default Place Sort Order',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          { title: 'Manual (Drag Order)', value: 'manual' },
          { title: 'Highest Rated First', value: 'rating' },
          { title: 'Category', value: 'tag' },
          { title: 'Alphabetical (A–Z)', value: 'name' },
        ],
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card Density',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          { title: 'Detailed Cards', value: 'detailed' },
          { title: 'Compact List', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'detailed',
    }),
    defineField({
      name: 'ratingScale',
      title: 'Rating Scale',
      type: 'number',
      group: 'appearance',
      options: {
        list: [
          { title: 'Out of 5 (★ 4.8)', value: 5 },
          { title: 'Out of 10 (★ 8.75/10)', value: 10 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'customTags',
      title: 'Featured Filter Tags',
      type: 'array',
      group: 'appearance',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Optional quick-filter tags highlighted at the top of this list.',
    }),
    defineField({
      name: 'ownerName',
      title: 'Curator Name',
      type: 'string',
      group: 'appearance',
      initialValue: 'Eric Jiang',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'appearance',
      description: 'Lower numbers appear first in the /places list switcher.',
    }),
    defineField({
      name: 'unlisted',
      title: 'Unlisted (Direct Link Only)',
      type: 'boolean',
      group: 'sharing',
      initialValue: false,
      description:
        'Hide from the public /places switcher — only people with the direct /places/[slug] link can view it.',
    }),
    defineField({
      name: 'hideNotesOnShare',
      title: 'Hide Personal Notes',
      type: 'boolean',
      group: 'sharing',
      initialValue: false,
      description: 'Keep personal notes stored in Sanity but hidden on the map & cards.',
    }),
    defineField({
      name: 'sharingPaused',
      title: 'Pause Sharing',
      type: 'boolean',
      group: 'sharing',
      initialValue: false,
      description:
        'Temporarily disable public & link access to this list without deleting it.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      emoji: 'emoji',
      slug: 'slug.current',
      places: 'places',
      unlisted: 'unlisted',
      sharingPaused: 'sharingPaused',
    },
    prepare({ title, emoji, slug, places, unlisted, sharingPaused }) {
      const count = Array.isArray(places) ? places.length : 0
      const visibility = sharingPaused
        ? 'Paused'
        : unlisted
          ? 'Unlisted link'
          : 'Public'
      return {
        title: `${emoji || '📍'} ${title || 'Untitled List'}`,
        subtitle: `${count} place${count === 1 ? '' : 's'} · ${visibility}${slug ? ` · /places/${slug}` : ''}`,
      }
    },
  },
})
