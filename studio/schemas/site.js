import { defineArrayMember, defineField, defineType } from 'sanity'

/** Singleton: navigation + the email CTA used everywhere. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'nav', title: 'Navigation', default: true },
    { name: 'cta', title: 'Email button' },
  ],
  fields: [
    defineField({ name: 'brand', title: 'Logo text', type: 'string', group: 'nav' }),
    defineField({ name: 'brandTagline', title: 'Line under the logo', type: 'string', group: 'nav' }),
    defineField({
      name: 'navLinks',
      title: 'Menu links',
      type: 'array',
      group: 'nav',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'to',
              title: 'Page',
              type: 'string',
              description: '"/" for the homepage, "/blog" for the blog.',
              initialValue: '/',
            }),
            defineField({
              name: 'hash',
              title: 'Section anchor',
              type: 'string',
              description: 'Optional, e.g. "#work" to jump to a homepage section.',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'hash' } },
        }),
      ],
    }),
    defineField({ name: 'ctaLabel', title: 'Button label (nav)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaHeroLabel', title: 'Button label (hero)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaClosingLabel', title: 'Button label (footer)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSubject', title: 'Pre-filled email subject', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody', title: 'Pre-filled email body', type: 'text', rows: 4, group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

/** Singleton: footer / contact block. */
export const contact = defineType({
  name: 'contact',
  title: 'Contact & footer',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', title: 'Handwritten kicker', type: 'string' }),
    defineField({ name: 'line1', title: 'Line 1', type: 'text', rows: 2 }),
    defineField({ name: 'line2', title: 'Line 2', type: 'string' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'linkedinHandle', title: 'LinkedIn text shown', type: 'string' }),
    defineField({ name: 'card', title: 'Contact card doodle', type: 'image' }),
    defineField({ name: 'signOff', title: 'Sign-off doodle', type: 'image' }),
  ],
  preview: { prepare: () => ({ title: 'Contact & footer' }) },
})

/** Singleton: headings on the /blog page. Posts themselves are separate documents. */
export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'headlineAside', title: 'Handwritten aside', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'teaserEyebrow', title: 'Kicker', type: 'string' }),
    defineField({ name: 'teaserTitle', title: 'Teaser title', type: 'string' }),
    defineField({ name: 'teaserSubtitle', title: 'Teaser sub-line', type: 'text', rows: 2 }),
    defineField({ name: 'teaserCta', title: 'Teaser button', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Blog page' }) },
})
