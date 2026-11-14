import { defineArrayMember, defineField, defineType } from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience (Company)',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company Website URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order (Lower = Top)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'positions',
      title: 'Positions / Roles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'End Date (Leave blank if Current/Present)',
              type: 'date',
            }),
            defineField({
              name: 'description',
              title: 'Impact / Bullet Points',
              type: 'array',
              of: [defineArrayMember({ type: 'text', rows: 3 })],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare({ title, startDate, endDate }) {
              return {
                title,
                subtitle: `${startDate || ''} → ${endDate || 'Present'}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Timeline Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'positions.0.title',
    },
  },
})
