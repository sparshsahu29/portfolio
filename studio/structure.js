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
        .title('Homepage sections')
        .child(
          S.list()
            .title('Homepage sections')
            .items([singleton(S, 'services', 'The Arsenal')]),
        ),
      S.divider(),
      // everything that is not a singleton shows up as a normal list
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId())),
    ])
