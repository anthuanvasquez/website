// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    'nuxt-mapbox',
    'motion-v/nuxt',
  ],
  css: ['~/assets/main.css'],
  components: [
    '~/components/',
    '~/components/layouts',
    '~/components/sections',
    '~/components/elements',
  ],
  ui: {
    prefix: 'U',
  },
  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        types: ['node'],
      },
    },
  },
  eslint: {
    checker: true,
  },
  mapbox: {
    accessToken: process.env.MAPBOX_TOKEN,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      title: 'Anthuan Vásquez | Senior Full-Stack Engineer',
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
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
        name: 'English',
        flag: '🇺🇸',
        description: 'English',
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es-ES.json',
        name: 'Español',
        flag: '🇩🇴',
        description: 'Español',
      },
    ],

    langDir: 'lang',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    vueI18n: 'i18n.config.ts',
  },
  routeRules: {
    '/': { prerender: true },
    '/api/*': {},
  },
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
    public: {
      BASE_URL: process.env.BASE_URL,
      mapboxToken: process.env.MAPBOX_TOKEN,
    },
  },
  compatibilityDate: '2026-02-23',
});
