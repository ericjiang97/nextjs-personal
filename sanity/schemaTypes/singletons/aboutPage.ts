import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'bioEyebrow',
      title: 'Bio Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'bioLeadText',
      title: 'Bio Text (Before Company Link)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bioCompanyName',
      title: 'Highlighted Company Name',
      type: 'string',
    }),
    defineField({
      name: 'bioCompanyUrl',
      title: 'Highlighted Company URL',
      type: 'url',
    }),
    defineField({
      name: 'bioTrailingText',
      title: 'Bio Text (After Company Link)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
    }),
    defineField({
      name: 'resumeButtonLabel',
      title: 'Resume Button Label',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'quickFactsEyebrow',
      title: 'Quick Facts Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'quickFactsTitle',
      title: 'Quick Facts Heading',
      type: 'string',
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({
              name: 'highlight',
              title: 'Amber Highlight Style',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
    defineField({
      name: 'experienceEyebrow',
      title: 'Experience Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Experience Section Heading',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
