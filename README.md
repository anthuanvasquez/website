# Anthuan Vásquez | Full-Stack Engineer

Personal website and professional portfolio built with bleeding-edge web technology. Focused on performance, fluid animations, and AI integration.

## 🚀 Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Nuxt UI v4](https://ui.nuxt.com/)
- **Animations:** [GSAP](https://gsap.com/) & [Motion-V](https://motion-v.com/)
- **AI Integration:** [LangChain](https://js.langchain.com/) + [Groq](https://groq.com/) (Server-side Chatbot)
- **Content:** [Nuxt Content v3](https://content.nuxt.com/) with experimental SQLite support
- **Maps:** [Mapbox GL](https://www.mapbox.com/) via `nuxt-mapbox`
- **Testing:** [Vitest](https://vitest.dev/) + `@nuxt/test-utils`
- **Runtime:** [Nitro](https://nitro.unjs.io/) Engine

## ✨ Key Features

- **Nuxt 4 Architecture:** Leveraging the new `app/` directory for a cleaner separation of concerns.
- **Intelligent Chatbot:** Integrated with LLMs via Groq to answer queries about my professional profile.
- **Fluid UI/UX:** Interactive experience powered by GSAP and Motion-V.
- **Dynamic Content:** Blog and sections managed through Markdown files with Nuxt Content.
- **Interactive Maps:** Location and geographic data visualization using Mapbox.
- **Type-Safe:** 100% TypeScript development with strict checking.

## 📁 Project Structure (Nuxt 4 Layer)

```text
├── app/                # Frontend Application Layer
│   ├── assets/         # Global styles and Vite assets
│   ├── components/     # Atomic components and sections (Auto-imported)
│   ├── composables/    # State logic and hooks
│   ├── data/           # Prompt configuration and base knowledge
│   ├── layouts/        # Page wrappers
│   ├── pages/          # File-based routing
│   ├── plugins/        # GSAP initialization and other client plugins
│   └── utils/          # Helpers and session utilities
├── content/            # Markdown files for Blog and Data
├── server/             # Nitro Engine (Backend)
│   ├── api/            # REST endpoints and Chatbot logic
│   └── middleware/     # API guards and logging
└── public/             # Static assets
```

## 🛠️ Setup

### Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (v10+)

### Installation

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure the required keys:

- `GROQ_API_KEY`: For Chatbot integration.
- `MAPBOX_ACCESS_TOKEN`: For the interactive map.

### Development

```bash
pnpm dev
```

## 🧪 Code Quality

```bash
# Linting (Prettier + ESLint)
pnpm lint

# Automatic fix
pnpm lint:fix

# Tests
pnpm test
```

## 📦 Deployment

The project is optimized for deployment on platforms like Vercel, Netlify, or via Docker.

```bash
pnpm build
```

---

Designed and developed by **Anthuan Vásquez**. 🇩🇴
