import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
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
    ],
  },
});
