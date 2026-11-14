import { defineArrayMember, defineField, defineType } from 'sanity'

export const singleImageSlice = defineType({
  name: 'singleImageSlice',
  title: 'Single Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'description',
      title: 'Description / Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'description',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Single Image',
        subtitle: 'Single Image Slice',
        media,
      }
    },
  },
})

export const imageGroupSlice = defineType({
  name: 'imageGroupSlice',
  title: 'Image Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image Group',
        subtitle: 'Gallery Grid Slice',
        media,
      }
    },
  },
})

export const beforeAfterSlice = defineType({
  name: 'beforeAfterSlice',
  title: 'Before / After Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
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
      name: 'afterImage',
      title: 'After Image',
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'afterImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Before / After Comparison',
        subtitle: 'Interactive Slider Slice',
        media,
      }
    },
  },
})

export const imageWithTextSlice = defineType({
  name: 'imageWithTextSlice',
  title: 'Image with Side Text',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'position',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {
      position: 'position',
      media: 'image',
    },
    prepare({ position, media }) {
      return {
        title: `Image (${position || 'left'}) + Text`,
        subtitle: 'Side-by-Side Slice',
        media,
      }
    },
  },
})

export const richTextSlice = defineType({
  name: 'richTextSlice',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Rich Text',
      type: 'portableText',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rich Text Section',
        subtitle: 'Text Slice',
      }
    },
  },
})
