# Base image: AlmaLinux (RHEL-based) for maximum compatibility with cPanel
FROM almalinux:9-minimal AS base

# Install Node.js 20.x and build essentials
RUN microdnf install -y python3 make gcc-c++ tar gzip \
    && curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - \
    && microdnf install -y nodejs \
    && microdnf clean all

# -------------------
# Dependencies Stage
# -------------------
FROM base AS deps

WORKDIR /app

# Using npm with --legacy-peer-deps to ignore the ESLint version conflict
COPY package.json ./
RUN npm install --legacy-peer-deps

# -------------------
# Builder Stage
# -------------------
FROM base AS builder

WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Increase memory limit for Node.js to avoid OOM during build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the Nuxt application
RUN npm run build

# -------------------
# Production Stage
# -------------------
FROM almalinux:9-minimal AS production

# Install Node.js 20 runtime
RUN microdnf install -y tar gzip \
    && curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - \
    && microdnf install -y nodejs \
    && microdnf clean all

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy the standalone output from Nitro
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# No need for extra memory in production, just for the build
CMD ["node", ".output/server/index.mjs"]
