import { singletonTypes } from './schemas/index.js'

/** Opens a singleton straight into its editor, using the type name as the id. */
const singleton = (S, type, title) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export const structure = (S) =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Homepage — in page order')
        .child(
          S.list()
            .title('Homepage')
            .items([
              singleton(S, 'hero', '1 · Hero'),
              singleton(S, 'philosophy', '2 · Who I am — heading'),
              singleton(S, 'about', '2 · Who I am — copy'),
              singleton(S, 'whatYoullSee', "3 · What you'll see next"),
              singleton(S, 'results', '4 · Results — heading'),
              singleton(S, 'caseStudy', '4 · Results — case study'),
              singleton(S, 'metrics', '4 · Results — numbers & screenshots'),
              singleton(S, 'services', '5 · The Arsenal'),
              singleton(S, 'clientWork', '6 · Copywriting portfolio'),
              singleton(S, 'randomThings', '7 · Random things about me'),
              singleton(S, 'hireMe', '8 · Why hire me'),
              singleton(S, 'testimonials', '8 · Testimonials'),
              singleton(S, 'contact', '9 · Contact & footer'),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              singleton(S, 'blogPage', 'Blog page headings'),
            ]),
        ),
      S.divider(),
      singleton(S, 'profile', 'Profile & portraits'),
      singleton(S, 'siteSettings', 'Site settings (menu, email button)'),
      S.divider(),
      // anything else that is not a singleton and not already placed above
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId()) && item.getId() !== 'post',
      ),
    ])
