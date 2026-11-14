'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioUrl } from './sanity/env'
import { resolve } from './sanity/presentation/resolve'
import { schema, singletonTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  title: 'EricJiang.dev Studio',
  schema: {
    ...schema,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
