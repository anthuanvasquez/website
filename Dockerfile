# Base image: Node.js 22-slim for a smaller and more secure footprint
FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -------------------
# Dependencies Stage
# -------------------
FROM base AS deps

WORKDIR /app

# Copy lockfile and package.json to install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# -------------------
# Development Stage
# -------------------
FROM base AS dev

WORKDIR /app

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NUXT_TELEMETRY_DISABLED=1

# Copy dependency tree from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]

# -------------------
# Builder Stage
# -------------------
FROM base AS builder

WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Nuxt application
# Increase memory limit for Node.js if needed
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build

# -------------------
# Production Stage
# -------------------
FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy the standalone output from Nitro
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Run the server
CMD ["node", ".output/server/index.mjs"]
