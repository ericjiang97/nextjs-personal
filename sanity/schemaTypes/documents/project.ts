import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Live / Project URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'repoUrl',
      title: 'GitHub Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current / Active', value: 'current' },
          { title: 'Previous / Archive', value: 'previous' },
        ],
        layout: 'radio',
      },
      initialValue: 'previous',
    }),
    defineField({
      name: 'image',
      title: 'Logo / Avatar Image (Sanity CDN)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External Logo URL (Fallback)',
      type: 'string',
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot Image (Sanity CDN)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshotUrl',
      title: 'Static Screenshot Path (Fallback)',
      type: 'string',
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
      title: 'name',
      subtitle: 'status',
      media: 'image',
    },
  },
})
