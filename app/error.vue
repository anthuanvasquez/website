<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <UApp>
    <div
      class="font-opensans flex min-h-[100dvh] w-full flex-col bg-[var(--surface-base)]"
    >
      <!-- Minimal Header to maintain context -->
      <header class="w-full p-6">
        <NuxtLink
          to="/"
          class="inline-block text-xl font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--text-accent)]"
        >
          <span class="font-firacode">&lt;av /&gt;</span>
        </NuxtLink>
      </header>

      <!-- Main Error Content -->
      <main class="flex flex-1 items-center justify-center px-4 py-12">
        <div
          class="w-full max-w-lg rounded-[2rem] bg-[var(--surface-elevated)] p-10 text-center shadow-2xl ring-1 ring-white/5 sm:p-14"
        >
          <!-- Code-like Error Tag -->
          <div
            class="mb-6 inline-flex cursor-default items-center justify-center rounded-full bg-white/5 px-4 py-1.5 transition-colors hover:bg-white/10"
          >
            <span
              class="font-firacode text-lg font-bold tracking-wider text-[var(--color-primary)]"
            >
              ERR_{{ error.statusCode || 404 }}
            </span>
          </div>

          <h1
            class="font-firacode mb-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            System Error
          </h1>

          <p
            class="mb-10 text-base leading-relaxed text-[var(--text-secondary)]"
          >
            {{
              error.message ||
              "We couldn't find the page you're looking for. It might have been moved or doesn't exist."
            }}
          </p>

          <div
            class="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              @click="handleError"
              class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-medium text-black ring-1 ring-[var(--color-primary)] transition-all hover:bg-[var(--color-secondary)] hover:ring-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--surface-elevated)] focus:outline-none sm:w-auto"
            >
              <span>Return Home</span>
              <UIcon
                name="i-heroicons-arrow-right-20-solid"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  </UApp>
</template>
