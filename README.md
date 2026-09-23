# Anthuan Vásquez | Full-Stack Engineer

Personal website and professional portfolio built with bleeding-edge web technology. Focused on performance, fluid animations, and AI integration.

## 🚀 Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Nuxt UI v4](https://ui.nuxt.com/)
- **Animations:** CSS Keyframes & native [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) via `useReveal`
- **AI Integration:** [LangChain](https://js.langchain.com/) + [Groq](https://groq.com/) (Server-side Chatbot)
- **Content:** Markdown with [gray-matter](https://github.com/jonschlinkert/gray-matter) & [marked](https://marked.js.org/)
- **Maps:** [Mapbox GL](https://www.mapbox.com/) via `mapbox-gl`
- **Testing:** [Vitest](https://vitest.dev/) + `@nuxt/test-utils`
- **Runtime:** [Nitro](https://nitro.unjs.io/) Engine

## ✨ Key Features

- **Nuxt 4 Architecture:** Leveraging the new `app/` directory for a cleaner separation of concerns.
- **Intelligent Chatbot:** Integrated with LLMs via Groq to answer queries about my professional profile.
- **Fluid UI/UX:** Interactive experience powered by lightweight CSS keyframes and native scroll reveals.
- **Dynamic Content:** Blog and second brain notes managed through Markdown files with gray-matter and marked.
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
│   ├── plugins/        # Client plugins
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

- `NUXT_GROQ_API_KEY`: For Chatbot integration via Groq.
- `NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: For the interactive map.
- `NUXT_INTERNAL_API_SECRET`: Secret for internal API calls.
- `NUXT_CHAT_SESSION_SECRET`: Secret to sign client chat sessions.
- `NUXT_ALLOWED_ORIGIN`: Allowed origin for production API guard.

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
