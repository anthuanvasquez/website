import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        overrides: {
          // Exclude @nuxt/content from the test environment — it initializes
          // better-sqlite3 (a native addon) which fails in CI Linux runners.
          // No tests depend on content functionality.
          modules: [
            '@nuxt/ui',
            '@nuxt/image',
            '@nuxt/eslint',
            '@nuxt/test-utils/module',
            'nuxt-mapbox',
            'motion-v/nuxt',
          ],
        },
      },
    },
    setupFiles: ['./tests/setup.ts'],
    alias: [
      {
        find: /^mapbox-gl\/dist\/(.*)$/,
        replacement: fileURLToPath(
          new URL('./tests/mocks/empty.css', import.meta.url)
        ),
      },
      {
        find: 'mapbox-gl',
        replacement: fileURLToPath(
          new URL('./tests/mocks/mapbox-gl.ts', import.meta.url)
        ),
      },
      {
        find: 'better-sqlite3',
        replacement: fileURLToPath(
          new URL('./tests/mocks/better-sqlite3.ts', import.meta.url)
        ),
      },
    ],
  },
});
