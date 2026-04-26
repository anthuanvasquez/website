<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <UApp>
    <div class="font-opensans bg-surface-base flex min-h-dvh w-full flex-col">
      <header class="w-full p-6">
        <NuxtLink
          to="/"
          class="text-text-primary hover:text-text-accent inline-block text-xl font-bold transition-colors"
        >
          <span class="font-firacode">&lt;av /&gt;</span>
        </NuxtLink>
      </header>

      <main class="flex flex-1 items-center justify-center px-4 py-12">
        <div
          class="bg-surface-elevated w-full max-w-lg rounded-4xl p-10 text-center shadow-2xl ring-1 ring-white/5 sm:p-14"
        >
          <div
            class="mb-6 inline-flex cursor-default items-center justify-center rounded-full bg-white/5 px-4 py-1.5 transition-colors hover:bg-white/10"
          >
            <span
              class="font-firacode text-primary text-lg font-bold tracking-wider"
            >
              ERR_{{ error.statusCode || 404 }}
            </span>
          </div>

          <h1
            class="font-firacode text-text-primary mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            System Error
          </h1>

          <p class="text-text-secondary mb-10 text-base leading-relaxed">
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
              class="group bg-primary ring-primary hover:bg-secondary hover:ring-secondary focus:ring-primary focus:ring-offset-surface-elevated inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-black ring-1 transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
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
