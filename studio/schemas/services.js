import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * One item in an Arsenal grid: a vertical (9:16) video that plays inline.
 * Upload the mp4 and a poster frame; the site does the rest.
 */
export const arsenalVideo = defineType({
  name: 'arsenalVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown under the video, e.g. the doctor, creator or product name.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Label',
      type: 'string',
      description: 'Small caps line above the title, e.g. "WHOLELEAF · Doctor-led video ad".',
    }),
    defineField({
      name: 'note',
      title: 'One-line note',
      type: 'string',
      description: 'Optional. What the angle or hook was.',
    }),
    defineField({
      name: 'video',
      title: 'Video file (MP4)',
      type: 'file',
      options: { accept: 'video/mp4,video/quicktime' },
      description:
        'Vertical 9:16, H.264 MP4. Keep it under ~15 MB — compress with HandBrake or similar before uploading.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster frame',
      type: 'image',
      options: { hotspot: true },
      description: 'The still shown before play. Take a screenshot of a good frame from the video.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'meta', media: 'poster' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Untitled video',
      subtitle: `▶ ${subtitle || 'Video'}`,
      media,
    }),
  },
})

/** One item in an Arsenal grid: a static creative that opens in the lightbox. */
export const arsenalImage = defineType({
  name: 'arsenalImage',
  title: 'Static creative',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'meta', title: 'Label', type: 'string' }),
    defineField({ name: 'note', title: 'One-line note', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'meta', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Untitled creative',
      subtitle: subtitle || 'Static',
      media,
    }),
  },
})

/** A grid inside the Arsenal, e.g. "Performance Marketing". */
export const arsenalGrid = defineType({
  name: 'arsenalGrid',
  title: 'Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Grid title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Anchor',
      type: 'slug',
      options: { source: 'title' },
      description: 'Used in the page URL (#performance-marketing). Generate from the title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Intro line',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverable chips',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'items',
      title: 'Creatives',
      type: 'array',
      description: 'Drag to reorder. Mix videos and static creatives freely.',
      of: [
        defineArrayMember({ type: 'arsenalVideo' }),
        defineArrayMember({ type: 'arsenalImage' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare: ({ title, items }) => ({
      title,
      subtitle: `${items?.length ?? 0} creatives`,
    }),
  },
})

/** Singleton: the whole Arsenal section. */
export const services = defineType({
  name: 'services',
  title: 'The Arsenal',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Handwritten sub-line', type: 'string' }),
    defineField({
      name: 'grids',
      title: 'Grids',
      type: 'array',
      of: [defineArrayMember({ type: 'arsenalGrid' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'The Arsenal' }) },
})
