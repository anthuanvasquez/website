// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  /**
   * Nuxt Modules
   */
  modules: ['@nuxt/ui', '@nuxt/image', 'motion-v/nuxt'],

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
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        types: ['node'],
      },
    },
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
   * Route Rules
   */
  routeRules: {
    '/': { prerender: true },
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET,POST',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    // Cache static data for 1 hour with SWR
    '/api/experiences': { swr: 3600 },
    '/api/projects': { swr: 3600 },
    '/api/services': { swr: 3600 },
    '/api/skills': { swr: 3600 },
    '/api/blog/**': { swr: 3600 },
    '/api/brain/**': { swr: 3600 },
    // No cache and no public CORS for chatbot or sessions
    '/api/chatbot/**': { cors: false, cache: false },
  },

  /**
   * Runtime Config
   */
  runtimeConfig: {
    allowedOrigin: '',
    internalApiSecret: '',
    chatSessionSecret: process.env.VITEST
      ? 'test-secret-32-characters-long!!'
      : '',
    groqApiKey: process.env.VITEST ? 'test-groq-key' : '',
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
