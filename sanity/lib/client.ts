import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  stega: false,
  perspective: 'published',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
