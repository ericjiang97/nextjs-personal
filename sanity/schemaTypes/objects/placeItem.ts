import { defineArrayMember, defineField, defineType } from 'sanity'
import { PlaceLookupInput } from '../../components/PlaceLookupInput'

export const placeItemType = defineType({
  name: 'placeItem',
  title: 'Place',
  type: 'object',
  components: {
    input: PlaceLookupInput,
  },
  fieldsets: [
    {
      name: 'meta',
      title: 'Category & Personal Rating',
      options: { columns: 2 },
    },
    {
      name: 'coords',
      title: 'Map Coordinates',
      options: { columns: 2 },
    },
    {
      name: 'additionalMeta',
      title: 'Additional Restaurant / Dining Metadata',
      description:
        'Structured dining details (cuisine, revisit verdict, must-order dishes, last visited date, status).',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Place Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Neighbourhood',
      type: 'string',
      description: 'e.g. Tonkotsu Ramen · Shibuya, Tokyo',
    }),
    defineField({
      name: 'primaryTag',
      title: 'Category',
      type: 'string',
      fieldset: 'meta',
      options: {
        list: [
          { title: 'Restaurant / Dining', value: 'restaurant' },
          { title: 'Cafe / Bakery', value: 'cafe' },
          { title: 'City / Neighbourhood', value: 'city' },
          { title: 'Place / Landmark', value: 'place' },
        ],
      },
      initialValue: 'restaurant',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'My Rating (0–10)',
      description: 'Your personal rating (leave blank if unrated)',
      type: 'number',
      fieldset: 'meta',
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country / Region',
      type: 'string',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      fieldset: 'coords',
      validation: (Rule) => Rule.required().min(-90).max(90),
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      fieldset: 'coords',
      validation: (Rule) => Rule.required().min(-180).max(180),
    }),
    defineField({
      name: 'notes',
      title: 'Personal Review & Notes',
      type: 'text',
      rows: 3,
      description: 'Your written thoughts, review, or tips.',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Caption / Dish Name',
              type: 'string',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
      description: 'Food or location photos for this spot.',
    }),
    // --- Additional Restaurant / Dining Metadata ---
    defineField({
      name: 'cuisine',
      title: 'Cuisine / Style',
      type: 'string',
      fieldset: 'additionalMeta',
      hidden: ({ parent }) => parent?.primaryTag === 'city',
    }),
    defineField({
      name: 'wouldGoAgain',
      title: 'Would Go Again?',
      type: 'string',
      fieldset: 'additionalMeta',
      options: {
        list: [
          { title: 'Yes', value: 'yes' },
          { title: 'Maybe', value: 'maybe' },
          { title: 'No', value: 'no' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({ parent }) => parent?.primaryTag === 'city',
    }),
    defineField({
      name: 'recommendedDishes',
      title: 'Recommended Dishes',
      type: 'array',
      fieldset: 'additionalMeta',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Press Enter after each dish name.',
      hidden: ({ parent }) => parent?.primaryTag === 'city',
    }),
    defineField({
      name: 'lastVisited',
      title: 'Last Visited',
      type: 'date',
      fieldset: 'additionalMeta',
      options: { dateFormat: 'YYYY/MM/DD' },
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      fieldset: 'additionalMeta',
      options: {
        list: [
          { title: '$ (Budget)', value: '$' },
          { title: '$$ (Moderate)', value: '$$' },
          { title: '$$$ (Upscale)', value: '$$$' },
          { title: '$$$$ (Fine Dining)', value: '$$$$' },
        ],
      },
      hidden: ({ parent }) => parent?.primaryTag === 'city',
    }),
    defineField({
      name: 'operatingStatus',
      title: 'Operating Status',
      type: 'string',
      fieldset: 'additionalMeta',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Temporarily Closed', value: 'temporarily_closed' },
          { title: 'Permanently Closed', value: 'permanently_closed' },
        ],
      },
      initialValue: 'open',
      hidden: ({ parent }) => parent?.primaryTag === 'city',
    }),
    defineField({
      name: 'tags',
      title: 'Filter Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'externalUrl',
      title: 'Google Maps / Website Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      country: 'country',
      primaryTag: 'primaryTag',
      rating: 'rating',
      operatingStatus: 'operatingStatus',
      media: 'images.0',
    },
    prepare({
      title,
      subtitle,
      country,
      primaryTag,
      rating,
      operatingStatus,
      media,
    }) {
      const icon =
        primaryTag === 'restaurant'
          ? '🍽️'
          : primaryTag === 'cafe'
            ? '☕'
            : primaryTag === 'city'
              ? '🏙️'
              : '📍'
      const stars = typeof rating === 'number' ? ` · ★${rating}` : ''
      const closed =
        operatingStatus && operatingStatus !== 'open' ? ' · [Closed]' : ''
      return {
        title: `${icon} ${title || 'Untitled Place'}`,
        subtitle: `${subtitle || country || primaryTag || 'Place'}${stars}${closed}`,
        media,
      }
    },
  },
})
