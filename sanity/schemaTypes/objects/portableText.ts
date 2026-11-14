import { defineArrayMember, defineField, defineType } from 'sanity'

export const portableTextType = defineType({
  name: 'portableText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Inline Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'string',
                title: 'URL',
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text / Caption',
        }),
      ],
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code Snippet',
      type: 'object',
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          initialValue: 'snippet',
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 8,
        }),
      ],
      preview: {
        select: { title: 'language', subtitle: 'code' },
        prepare({ title, subtitle }) {
          return {
            title: `Code (${title || 'snippet'})`,
            subtitle: subtitle ? subtitle.slice(0, 80) : '',
          }
        },
      },
    }),
    defineArrayMember({
      name: 'youtubeEmbed',
      title: 'YouTube / OEmbed',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube Embed URL',
          type: 'url',
        }),
        defineField({
          name: 'html',
          title: 'Fallback Embed HTML',
          type: 'text',
          rows: 3,
        }),
      ],
      preview: {
        select: { subtitle: 'url' },
        prepare({ subtitle }) {
          return {
            title: 'Video / Embed',
            subtitle: subtitle || 'Custom HTML embed',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'beforeAfterSlice',
    }),
  ],
})
