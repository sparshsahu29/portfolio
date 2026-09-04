import { defineArrayMember, defineField, defineType } from 'sanity'

/** Singleton: heading above the results card(s). */
export const results = defineType({
  name: 'results',
  title: 'Results — heading',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Handwritten sub-line', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Results — heading' }) },
})

/** Singleton: the WHOLELEAF story card. */
export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Results — case study',
  type: 'document',
  fields: [
    defineField({ name: 'client', title: 'Brand name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'eyebrow',
      title: 'Headline',
      type: 'string',
      description: 'Must contain the brand name — it is coloured red. e.g. "At WHOLELEAF, we were nowhere"',
    }),
    defineField({ name: 'before', title: 'Before', type: 'string' }),
    defineField({ name: 'after', title: 'After (big number)', type: 'string' }),
    defineField({ name: 'afterSuffix', title: 'After — rest of the line', type: 'string' }),
    defineField({ name: 'milestone', title: 'Milestone badge', type: 'string' }),
    defineField({
      name: 'proofImage',
      title: 'Sales graph screenshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'breakdown',
      title: 'Breakdown bullets',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'lead', title: 'Text before the highlight', type: 'string' }),
            defineField({ name: 'highlight', title: 'Highlight (red)', type: 'string' }),
            defineField({ name: 'rest', title: 'Text after the highlight', type: 'string' }),
          ],
          preview: {
            select: { lead: 'lead', highlight: 'highlight', rest: 'rest' },
            prepare: ({ lead, highlight, rest }) => ({
              title: [lead, highlight, rest].filter(Boolean).join(' '),
            }),
          },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'client' }, prepare: ({ title }) => ({ title: `Case study — ${title}` }) },
})

const stat = defineArrayMember({
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Number', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'sub', title: 'Small line', type: 'string' }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
})

/** Singleton: the numbers and dashboard screenshots. */
export const metrics = defineType({
  name: 'metrics',
  title: 'Results — numbers',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Numbers under the case study',
      type: 'array',
      description: 'Four looks best.',
      of: [stat],
    }),
    defineField({
      name: 'boards',
      title: 'Ads Manager screenshots',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Caption', type: 'string' }),
            defineField({ name: 'image', title: 'Screenshot', type: 'image', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'headline',
      title: 'Numbers on the "Why hire me" card stack',
      type: 'array',
      of: [stat],
    }),
    defineField({ name: 'title', title: 'Internal title', type: 'string', hidden: true }),
  ],
  preview: { prepare: () => ({ title: 'Results — numbers' }) },
})
