import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  toc: {
    depth: 2,
    searchDepth: 2,
  },
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
    }),
    brain: defineCollection({
      type: 'page',
      source: 'brain/**/*.md',
    }),
  },
});
