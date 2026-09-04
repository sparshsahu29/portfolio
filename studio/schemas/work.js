import { defineArrayMember, defineField, defineType } from 'sanity'

/** One tab in the copywriting portfolio, e.g. "Blogs". */
export const workTab = defineType({
  name: 'workTab',
  title: 'Tab',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Tab name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Anchor',
      type: 'slug',
      options: { source: 'label' },
      description: 'Generate from the tab name.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'note',
      title: 'One-line note',
      type: 'text',
      rows: 2,
      description: 'Shown under the tabs when this one is selected.',
    }),
    defineField({
      name: 'images',
      title: 'Screenshots',
      type: 'array',
      description:
        'Select several files at once to upload in bulk. Drag to reorder. Click a screenshot to add a link — with a link it opens the original piece, without one it opens full-size.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'href',
              title: 'Link to the original (optional)',
              type: 'url',
              description: 'e.g. the published blog, email or website page.',
              validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto'] }),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'label', images: 'images', media: 'images.0' },
    prepare: ({ title, images, media }) => ({
      title,
      subtitle: `${images?.length ?? 0} screenshots`,
      media,
    }),
  },
})

/** Singleton: the copywriting portfolio. */
export const clientWork = defineType({
  name: 'clientWork',
  title: 'Copywriting portfolio',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Handwritten sub-line', type: 'text', rows: 2 }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [defineArrayMember({ type: 'workTab' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Copywriting portfolio' }) },
})

/** Singleton: LinkedIn testimonials. */
export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Handwritten sub-line', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'role', title: 'Role / title', type: 'string' }),
            defineField({
              name: 'relationship',
              title: 'Relationship',
              type: 'string',
              description: 'e.g. "Anamika managed Palak directly"',
            }),
            defineField({ name: 'date', title: 'Date', type: 'string' }),
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 6 }),
            defineField({ name: 'screenshot', title: 'LinkedIn screenshot', type: 'image' }),
            defineField({ name: 'url', title: 'Link to the original', type: 'url' }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'screenshot' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Testimonials' }) },
})
