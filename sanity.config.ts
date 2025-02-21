import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './sanity/schemaTypes'
import {markdownSchema} from "sanity-plugin-markdown";
// import {dataset, projectId} from "./sanity/env";

export default defineConfig({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
    plugins: [structureTool(), markdownSchema()],
    schema
})