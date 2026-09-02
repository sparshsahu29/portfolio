import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes, singletonTypes } from './schemas/index.js'
import { structure } from './structure.js'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'palak-portfolio',
  title: 'Palak Agarwal — Portfolio',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // singletons can't be created or duplicated from the "new document" menu
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    // ...and they can't be deleted or duplicated either
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
        : input,
  },
})
