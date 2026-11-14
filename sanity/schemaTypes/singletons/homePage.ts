import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero & Terminal' },
    { name: 'profileCard', title: '3D Profile Card & Stats' },
    { name: 'bento', title: 'Bento Highlights & Sections' },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Status Pill',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroGreeting',
      title: 'Greeting Prefix',
      type: 'string',
      group: 'hero',
      description: "e.g. G'day, I'm",
    }),
    defineField({
      name: 'heroName',
      title: 'Highlighted Name',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroRoleVerb',
      title: 'Headline Verb Before Flip Words',
      type: 'string',
      group: 'hero',
      description: 'e.g. Crafting',
    }),
    defineField({
      name: 'flipWords',
      title: 'Animated Flip Words',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'heroRoleSuffix',
      title: 'Headline Middle Text',
      type: 'string',
      group: 'hero',
      description: 'e.g. engineering tools for',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Highlighted Target',
      type: 'string',
      group: 'hero',
      description: 'e.g. Android & Pixel',
    }),
    defineField({
      name: 'heroBio',
      title: 'Hero Bio Paragraph',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'terminalHost',
      title: 'Terminal Prompt Host',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'terminalLines',
      title: 'Interactive Terminal Commands',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'cmd', title: 'Command', type: 'string' }),
            defineField({ name: 'out', title: 'Output', type: 'string' }),
            defineField({
              name: 'color',
              title: 'Tailwind Output Color Class',
              type: 'string',
              initialValue: 'text-emerald-400',
            }),
          ],
          preview: {
            select: { title: 'cmd', subtitle: 'out' },
          },
        }),
      ],
    }),
    defineField({
      name: 'floatingBadge',
      title: 'Floating Orbiting Badge',
      type: 'string',
      group: 'profileCard',
    }),
    defineField({
      name: 'cardName',
      title: 'Card Name',
      type: 'string',
      group: 'profileCard',
    }),
    defineField({
      name: 'cardSubtitle',
      title: 'Card Subtitle',
      type: 'string',
      group: 'profileCard',
    }),
    defineField({
      name: 'cardCompanyBadge',
      title: 'Card Company Pill',
      type: 'string',
      group: 'profileCard',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Photo (Optional override)',
      type: 'image',
      options: { hotspot: true },
      group: 'profileCard',
    }),
    defineField({
      name: 'cardOverlayBadge',
      title: 'Photo Bottom Pill',
      type: 'string',
      group: 'profileCard',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      group: 'profileCard',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'profileCard',
    }),
    defineField({
      name: 'photosUrl',
      title: 'Photography Site URL',
      type: 'url',
      group: 'profileCard',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
      group: 'profileCard',
    }),
    defineField({
      name: 'stats',
      title: 'Hero Impact Metrics Strip',
      type: 'array',
      group: 'profileCard',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Metric Value', type: 'string' }),
            defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Code', value: 'code' },
                  { title: 'Shield Check', value: 'shield' },
                  { title: 'Camera', value: 'camera' },
                ],
              },
              initialValue: 'code',
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        }),
      ],
    }),
    defineField({
      name: 'bentoEyebrow',
      title: 'Bento Section Eyebrow',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'bentoHeading',
      title: 'Bento Section Heading',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'googleCardTitle',
      title: 'Google Bento Card Title',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'googleCardDescription',
      title: 'Google Bento Card Description',
      type: 'text',
      rows: 3,
      group: 'bento',
    }),
    defineField({
      name: 'googleRoleStages',
      title: 'Google Role Stages',
      type: 'array',
      group: 'bento',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'year', title: 'Years', type: 'string' }),
          ],
          preview: {
            select: { title: 'role', subtitle: 'year' },
          },
        }),
      ],
    }),
    defineField({
      name: 'wallpapersCardTitle',
      title: 'Wallpapers Bento Card Title',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'wallpapersCardDescription',
      title: 'Wallpapers Bento Card Description',
      type: 'text',
      rows: 3,
      group: 'bento',
    }),
    defineField({
      name: 'talksCardTitle',
      title: 'Talks Bento Card Title',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'talksCardDescription',
      title: 'Talks Bento Card Description',
      type: 'text',
      rows: 3,
      group: 'bento',
    }),
    defineField({
      name: 'talksCardBadge',
      title: 'Talks Bento Badge',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'talksCardQuote',
      title: 'Talks Bento Featured Title',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'projectsEyebrow',
      title: 'Featured Projects Eyebrow',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'projectsHeading',
      title: 'Featured Projects Heading',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'talksSectionEyebrow',
      title: 'Talks Section Eyebrow',
      type: 'string',
      group: 'bento',
    }),
    defineField({
      name: 'talksSectionHeading',
      title: 'Talks Section Heading',
      type: 'string',
      group: 'bento',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
