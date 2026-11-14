import { defineArrayMember, defineField, defineType } from 'sanity'

export const albumType = defineType({
  name: 'album',
  title: 'Photo Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (UID)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'First Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'slices',
      title: 'Album Content Slices',
      type: 'array',
      of: [
        defineArrayMember({ type: 'singleImageSlice' }),
        defineArrayMember({ type: 'imageGroupSlice' }),
        defineArrayMember({ type: 'beforeAfterSlice' }),
        defineArrayMember({ type: 'imageWithTextSlice' }),
        defineArrayMember({ type: 'richTextSlice' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage',
    },
  },
})
