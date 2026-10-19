// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';

const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  devtools: {
    enabled: isDev,
  },

  srcDir: 'src/app/',
  serverDir: 'src/server/',

  /**
   * Nuxt Modules
   */
  modules: ['@nuxt/ui', '@nuxt/image'],

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
   * Nuxt UI & Color Mode
   */
  ui: {
    prefix: 'U',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  image: {
    provider: 'none',
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
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/*', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
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

  hooks: {
    'nitro:build:public-assets'(nitro) {
      const rootDir = nitro.options.rootDir;
      const outDir = nitro.options.output.dir;
      const contentSrc = path.resolve(rootDir, 'content');

      if (fs.existsSync(contentSrc)) {
        fs.cpSync(contentSrc, path.join(outDir, 'content'), {
          recursive: true,
        });
      }

      for (const file of ['CHANGELOG.md', 'package.json']) {
        const fileSrc = path.resolve(rootDir, file);
        if (fs.existsSync(fileSrc)) {
          fs.copyFileSync(fileSrc, path.join(outDir, file));
        }
      }
    },
  },

  /**
   * Route Rules
   */
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET,POST',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    // Cache static data for 1 hour with SWR in production only.
    '/api/experiences': { swr: isProduction ? 3600 : false },
    '/api/projects': { swr: isProduction ? 3600 : false },
    '/api/services': { swr: isProduction ? 3600 : false },
    '/api/skills': { swr: isProduction ? 3600 : false },
    '/api/blog/**': { swr: isProduction ? 3600 : false },
    '/api/brain/**': { swr: isProduction ? 3600 : false },
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
