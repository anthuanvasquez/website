# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to Calendar Versioning ([CalVer](https://calver.org/)) grouped by release year (`YYYY.M.D`).

---

## [2026] - 2026-09-26

Major modernization cycle upgrading the platform to Nuxt 4 standards, Tailwind CSS v4, accessibility compliance (WCAG), lightweight native animations, and an AI-powered conversational layer.

### Added
- **Interactive Resume:** Added dedicated `/resume` page with comprehensive career timelines, impact metrics, and downloadable assets.
- **Digital Garden & Second Brain:** Added content architecture for knowledge notes and map-of-content exploration.
- **Accessibility (a11y):** Full WCAG AA/AAA compliance overhaul, including skip-to-main-content link, ARIA live regions, corrected heading hierarchy, and keyboard navigation.
- **Theme System:** Added dark/light mode toggle with native CSS variable tokens mapped to Tailwind CSS v4 palettes.
- **Native Maps:** Integrated Mapbox GL with SSR-safe dynamic client loading.
- **Chatbot UI:** Migrated assistant interface to unified `@nuxt/ui` chat components with Markdown parsing.
- **SEO & Social:** Added automated Open Graph images, Twitter card metadata, `robots.txt`, and canonical URL configuration via `useSeoMeta`.
- **Interactive Elements:** Added email copy button with toast feedback and smooth anchor scrolling.

### Changed & Performance
- **CSS-First Animations:** Replaced heavy runtime animation libraries (`gsap` and `motion-v`) with lightweight pure CSS keyframes and native `IntersectionObserver` composable (`useReveal`).
- **Markdown Nitro Engine:** Replaced heavy `@nuxt/content` runtime with native Nitro server markdown processing using `marked` and `gray-matter`.
- **UI Architecture:** Consolidated UI component primitives by migrating from `@headlessui/vue` and `@heroicons/vue` to `@nuxt/ui`.
- **API Client:** Replaced bespoke fetch utilities with centralized `useAPI` composable.
- **Tailwind CSS v4:** Migrated styling system to native `@tailwindcss/vite` configuration with CSS theme variables.
- **Component Hierarchy:** Restructured components under Nuxt 4 `app/` conventions with auto-import support.

### Fixed
- **SSR & Hydration:** Fixed SSR evaluation for dynamic browser-only dependencies (Mapbox GL) and prerender route guards.
- **Chatbot Typing & Overflow:** Fixed chat bubble icon dimensions, text overflow, and light-theme contrast.
- **Type Safety:** Resolved strict TypeScript check errors across components, server routes, and test specs.

### Security
- **API Guard:** Added Nitro server middleware to enforce origin verification and token secrets for internal endpoints.
- **Chatbot Hardening:** Implemented abuse pattern detection, rate limiting, and prompt injection defense on server-side chat handlers.
- **Environment Validation:** Added Zod schema validation for runtime environment variables at server initialization.

### Tooling & CI/CD
- **Automated Workflows:** Added GitHub Actions CI pipeline running ESLint, Prettier, strict `vue-tsc` typechecking, and Vitest test suites.
- **Docker Architecture:** Upgraded multi-stage containerization to Node 22 slim with pnpm workspace support and `docker:up` scripts.
- **Testing:** Configured Vitest with Nuxt test utilities, mock handlers for server APIs, and unit test coverage for core sections.

---

## [2025] - 2025-07-29

Transition phase decoupling data persistence and introducing generative AI capabilities.

### Added
- **AI Chatbot Integration:** Built first iteration of the AI chatbot powered by LangChain and Groq with tool-use / MCP capabilities.
- **Nitro Server API:** Added native backend endpoints under `/server/api` for data delivery.
- **Component Testing:** Introduced Vitest test harness and initial component specifications.
- **Design Tokens:** Integrated Nuxt UI and custom typography with Google Fonts.

### Changed
- **Decoupled Architecture:** Removed Supabase dependency in favor of local static data layers and Nitro server handlers.
- **Project Structure:** Reorganized codebase to `src/` hierarchy and centralized domain models in `/types`.
- **Component Modernization:** Refactored core portfolio sections (`Header`, `Footer`, `Heading`, `Project`, `Experience`, `Service`, `Skills`).

### Tooling
- **Flat Config Migration:** Migrated ESLint configuration to the modern flat config standard.
- **Workspace Settings:** Added unified VS Code configuration and updated project dependencies.

---

## [2024] - 2024-08-16

Complete platform rewrite migrating from legacy Nuxt 2 to modern Nuxt 3.

### Added
- **Nuxt 3 Migration:** Rewrote application using Vue 3 Composition API and Nuxt 3.
- **Supabase Integration:** Connected Supabase as initial headless backend for dynamic project and experience content.
- **Data Composables:** Added composable utilities for asynchronous resource loading.
- **Icon System:** Added dedicated icon component system.

### Changed
- **Visual Redesign:** Updated homepage layout, component styling, and portfolio presentation.
- **Fault Tolerance:** Added error handling for graceful degradation during backend service downtime.

### Tooling
- **Code Quality:** Configured ESLint, Prettier, and modern `.gitignore` policies.
- **Legacy Cleanup:** Removed obsolete Nuxt 2 components, assets, and legacy layouts.

---

## [2019] - 2019-10-26

Initial Git-tracked repository establishing the site as a Nuxt.js universal web application.

### Added
- **Nuxt.js Setup:** Initialized Nuxt 2 application with universal rendering.
- **Core Pages & Layouts:** Created base layout, landing pages, and component hierarchy.
- **Static Assets:** Added portfolio imagery, branding assets, and styling foundation.
- **Release Tag:** Tagged initial milestone release `0.0.1`.

---

## [Pre-2019] - Historical

- **Static HTML/CSS Website:** Original personal portfolio operating as static HTML, CSS, and vanilla JavaScript prior to migrating into a Git-versioned Nuxt project.
