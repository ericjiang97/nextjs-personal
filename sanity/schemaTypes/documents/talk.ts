import { defineField, defineType } from 'sanity'

export const talkType = defineType({
  name: 'talk',
  title: 'Tech Talk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Talk Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Optional)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'org',
      title: 'Event / Organization',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Display Date (e.g. 19th September 2019)',
      type: 'string',
    }),
    defineField({
      name: 'talkDate',
      title: 'ISO Date (Optional for OG cards/sorting)',
      type: 'date',
    }),
    defineField({
      name: 'url',
      title: 'Slides / Video URL',
      type: 'url',
    }),
    defineField({
      name: 'upcoming',
      title: 'Upcoming Talk',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'org',
    },
  },
})
