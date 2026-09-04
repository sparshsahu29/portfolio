import { defineArrayMember, defineField, defineType } from 'sanity'

const link = (name, title) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'label', title: 'Label', type: 'string' }),
      defineField({
        name: 'href',
        title: 'Link',
        type: 'string',
        description: 'Section anchor like "#results". Leave empty for the email button.',
      }),
    ],
  })

/** Singleton: the first screen. */
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'tagline', title: 'Handwritten tagline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Sub-headline', type: 'text', rows: 2 }),
    link('primaryCta', 'Primary button'),
    link('secondaryCta', 'Secondary button'),
  ],
  preview: { prepare: () => ({ title: 'Hero' }) },
})

/** Singleton: name, roles and every portrait used on the site. */
export const profile = defineType({
  name: 'profile',
  title: 'Profile & portraits',
  type: 'document',
  groups: [
    { name: 'text', title: 'Details', default: true },
    { name: 'photos', title: 'Portraits' },
  ],
  fields: [
    defineField({ name: 'firstName', title: 'First name', type: 'string', group: 'text' }),
    defineField({ name: 'lastName', title: 'Last name', type: 'string', group: 'text' }),
    defineField({ name: 'fullName', title: 'Full name', type: 'string', group: 'text' }),
    defineField({
      name: 'roles',
      title: 'Role chips (hero)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'text',
    }),
    defineField({
      name: 'legacyRoles',
      title: 'Roles line (Who I am)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'text',
    }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: 'text' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'text' }),
    defineField({ name: 'oneLiner', title: 'One-liner', type: 'string', group: 'text' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'text' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'text' }),
    defineField({ name: 'yearsExperience', title: 'Years of experience', type: 'string', group: 'text' }),
    defineField({
      name: 'portraitRed',
      title: 'Hero portrait (cut-out, red tint)',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
    }),
    defineField({
      name: 'portraitPhoto',
      title: 'Polaroid photo (Who I am)',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
    }),
    defineField({
      name: 'portraitDress',
      title: 'Cut-out figure (Random things)',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
    }),
    defineField({
      name: 'portraitHire',
      title: 'Photo (Why hire me)',
      type: 'image',
      options: { hotspot: true },
      group: 'photos',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'text',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Profile & portraits' }) },
})

/** Singleton: the "Who I am?" copy. */
export const about = defineType({
  name: 'about',
  title: 'Who I am',
  type: 'document',
  fields: [
    defineField({ name: 'greeting', title: 'Greeting', type: 'string', description: 'e.g. "Hey!"' }),
    defineField({ name: 'intro', title: 'Intro', type: 'string', description: 'e.g. "I\'m Palak"' }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({ name: 'kicker', title: 'Closing handwritten line', type: 'string' }),
    defineField({
      name: 'emphasis',
      title: 'Words to highlight',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Any exact phrase listed here is coloured wherever it appears in the paragraphs.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Who I am' }) },
})

/** Singleton: section heading for "Who I am?". */
export const philosophy = defineType({
  name: 'philosophy',
  title: 'Who I am — heading',
  type: 'document',
  fields: [defineField({ name: 'title', title: 'Heading', type: 'string' })],
  preview: { prepare: () => ({ title: 'Who I am — heading' }) },
})

/** Singleton: the eight one-liners around the cut-out figure. */
export const randomThings = defineType({
  name: 'randomThings',
  title: 'Random things about me',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Handwritten title', type: 'string' }),
    defineField({
      name: 'items',
      title: 'One-liners',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'First half shows left of the photo, second half right. Drag to reorder.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Random things about me' }) },
})

/** Singleton: the roadmap / timeline. */
export const whatYoullSee = defineType({
  name: 'whatYoullSee',
  title: "What you'll see next",
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Handwritten sub-line', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Stops on the timeline',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'sub', title: 'Handwritten sub-line', type: 'string' }),
            defineField({
              name: 'href',
              title: 'Scrolls to',
              type: 'string',
              description: 'Section anchor, e.g. "#results" or "#creative-strategy".',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "What you'll see next" }) },
})

/** Singleton: "Why should a brand hire me?" */
export const hireMe = defineType({
  name: 'hireMe',
  title: 'Why hire me',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Kicker', type: 'string' }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'teamNote', title: 'Handwritten note', type: 'string' }),
    defineField({ name: 'promise', title: 'Promise (taped card)', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Why hire me' }) },
})
