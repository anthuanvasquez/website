# GEMINI.MD: AI Context & Collaboration Guide (Nuxt 4 Edition)

This document provides essential context for AI models interacting with this Nuxt 4 project. It outlines the architectural standards, directory structure nuances, and coding conventions specific to the Nuxt ecosystem.

## 1. Project Overview & Purpose

* **Primary Goal:** [Analyze `package.json` and `nuxt.config.ts` to summarize. E.g., "A high-performance SSR web application for..."]
* **Business Domain:** [E.g., "Fintech Dashboard", "E-commerce Storefront", "Content Platform"]
* **Project Type:** Nuxt 4 Full-Stack Application (Frontend + Nitro Server).

## 2. Core Technologies & Stack

* **Framework:** Nuxt 4 (running on Vue 3).
* **Language:** TypeScript (Strict mode enabled).
* **Build Tool:** Vite.
* **Server Engine:** Nitro.
* **State Management:** [Inferred: usually `useState` (native) or `Pinia`].
* **UI Framework:** [Inferred: e.g., Tailwind CSS, Nuxt UI, Vuetify].
* **Package Manager:** [Inferred: `pnpm`, `npm`, or `bun`].

## 3. Architectural Patterns & Directory Structure

* **Architecture:** Modular Monolith / Full-Stack SSR. The application leverages Nuxt's file-system-based routing and auto-import features.
* **Directory Philosophy (Nuxt Standard):**
    * `/pages`: Application views and routes (File-based routing).
    * `/components`: Vue components (Auto-imported).
    * `/composables`: Reusable logic/hooks (Auto-imported).
    * `/server`: Backend logic powered by Nitro (`/api`, `/routes`, `/middleware`).
    * `/layouts`: Page wrapper layouts.
    * `/plugins`: Client/Server plugins.
    * `/utils`: Helper functions (Auto-imported).
    * `/public`: Static assets served at root.
    * `/assets`: Assets processed by Vite (Sass, images).

## 4. Coding Conventions & Style Guide

* **Vue Style:**
    * Use `<script setup lang="ts">` for all components.
    * Use **Composition API** exclusively. Do not use Options API.
* **Nuxt Specific Rules (CRITICAL):**
    * **Auto-imports:** Do NOT manually import components, composables, or Vue utils (like `ref`, `computed`, `watch`) unless explicitly disabled in config. The AI must assume they are available globally.
    * **Data Fetching:** Use `useFetch` (for SSR-friendly fetching) or `$fetch` (for client-side actions). Avoid importing `axios` unless strictly necessary.
    * **State:** Use `useState` for shared state across SSR/Client hydration or Pinia stores.
    * **SEO:** Use `useSeoMeta({ ... })` inside script setup, avoiding `useHead` for simple meta tags where possible.
* **Naming Conventions:**
    * Components: PascalCase (e.g., `UserCard.vue`).
    * Composables: camelCase starting with 'use' (e.g., `useAuth.ts`).
    * Server Routes: kebab-case for filenames inside `server/api`.
* **Error Handling:**
    * Use `createError({ statusCode: 404, statusMessage: '...' })` for throwing errors that Nuxt can catch and render.
    * Wrap async operations in try/catch specifically in server handlers.

## 5. Key Files & Entrypoints

* **Configuration:** `nuxt.config.ts` (The source of truth for modules, runtime config, and build settings).
* **Entry Component:** `app.vue` (Root component).
* **Environment:** `.env` managed via `runtimeConfig` in `nuxt.config.ts`.
* **Types:** `.nuxt/` (Generated types) and `tsconfig.json`.

## 6. Development & Testing Workflow

* **Local Development:**
    * Command: `npx nuxi dev` (or `pnpm dev`).
    * Starts Vite server for HMR and Nitro server for API.
* **Testing:**
    * **Unit/Integration:** [Inferred: usually Vitest via `@nuxt/test-utils`].
    * **E2E:** [Inferred: Playwright or Cypress].
* **Linting:**
    * ESLint configured with `@nuxt/eslint-config`.

## 7. Specific Instructions for AI Collaboration

* **Code Generation:** When generating Vue components, always use the `<template>`, `<script setup>`, `<style scoped>` structure.
* **Server Handlers:** When writing backend code in `/server`, always use `defineEventHandler((event) => { ... })`. Use `readBody(event)` and `getQuery(event)` for request parsing.
* **Nuxt 4 Compatibility:** Be aware of Nuxt 4 specific simplified directory structures if enabled, but default to standard structure for clarity unless instructed otherwise.
* **Performance:** Prefer `<NuxtLink>` over `<a>` tags for internal routing. Use `<NuxtImg>` if the image module is detected.
