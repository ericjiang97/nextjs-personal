import { defineArrayMember, defineField, defineType } from 'sanity'

export const wallpaperType = defineType({
  name: 'wallpaper',
  title: 'Wallpaper',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Folder Name',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wallpaperSlug',
      title: 'Wallpaper Short Key',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Device Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Desktop', value: 'desktop' },
          { title: 'Mobile', value: 'mobile' },
        ],
        layout: 'radio',
      },
      initialValue: 'desktop',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image (Upload new wallpaper preview to Sanity CDN)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fullResFile',
      title: 'Full Resolution Display P3 Download (Upload to Sanity CDN)',
      type: 'file',
    }),
    defineField({
      name: 'extension',
      title: 'Legacy Static File Extension',
      type: 'string',
      options: {
        list: [
          { title: 'JPG', value: 'jpg' },
          { title: 'PNG', value: 'png' },
        ],
      },
      initialValue: 'jpg',
    }),
    defineField({
      name: 'previewFileName',
      title: 'Legacy Static Preview Filename',
      type: 'string',
      description: 'Defaults to preview.webp in /downloads/wallpapers/<slug>/',
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
      subtitle: 'type',
      media: 'previewImage',
    },
  },
})
