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
    accessToken: process.env.MAPBOX_TOKEN,
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
      crawlLinks: true,
      routes: ['/', '/rss.xml'],
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
    '/': { prerender: true },
    '/api/*': {},
  },

  /**
   * Runtime Config
   */
  runtimeConfig: {
    allowedOrigin: process.env.ALLOWED_ORIGIN,
    internalApiSecret: process.env.INTERNAL_SECRET,
    chatSessionSecret: process.env.CHAT_SESSION_SECRET,
    groqApiKey: process.env.GROQ_API_KEY,
    public: {
      baseUrl: process.env.BASE_URL,
      emailAddress: process.env.EMAIL_ADDRESS,
    },
  },

  /**
   * Compatibility Date
   */
  compatibilityDate: '2026-02-23',
});
