// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  /**
   * Nuxt Modules
   */
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/content',
    'nuxt-mapbox',
    'motion-v/nuxt',
  ],

  /**
   * CSS
   */
  css: ['~/assets/main.css'],

  /**
   * Components
   */
  components: [
    '~/components/',
    '~/components/layouts',
    '~/components/sections',
    '~/components/elements',
  ],

  /**
   * Nuxt UI
   */
  ui: {
    prefix: 'U',
  },

  /**
   * TypeScript
   */
  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        types: ['node'],
      },
    },
  },

  /**
   * ESLint Config
   */
  eslint: {
    checker: true,
  },

  /**
   * Mapbox Config
   */
  mapbox: {
    accessToken: '',
  },

  /**
   * Vite Config
   */
  vite: {
    plugins: [tailwindcss()],
  },

  /**
   * App Metadata
   */
  app: {
    head: {
      title: 'Anthuan Vásquez | Full-Stack Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'keywords',
          content: 'Software Engineer, JavaScript Engineer, Software Architect',
        },
        {
          name: 'description',
          content: 'Full-Stack Engineer',
        },
      ],
      link: [{ rel: 'icon', type: 'image/*', href: '/favicon.ico' }],
    },
  },

  /**
   * Nitro Config
   */
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
      routes: [],
      failOnError: false,
    },
  },

  /**
   * Content Config
   */
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
    experimental: {
      nativeSqlite: true,
    },
  },

  /**
   * Route Rules
   */
  routeRules: {
    '/': { prerender: false },
    '/api/*': { cors: true },
  },

  /**
   * Runtime Config
   */
  runtimeConfig: {
    allowedOrigin: '',
    internalApiSecret: '',
    chatSessionSecret: '',
    groqApiKey: '',
    public: {
      baseUrl: '',
      emailAddress: '',
      mapboxAccessToken: '',
    },
  },

  /**
   * Compatibility Date
   */
  compatibilityDate: '2026-02-23',
});
