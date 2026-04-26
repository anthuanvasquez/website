<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <main
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">
        {{ error?.statusText }}
      </p>
      <h1
        class="text-text-primary mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
      >
        Page not found
      </h1>
      <p class="text-text-secondary mt-6 text-base leading-7">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          type="button"
          class="text-text-primary rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus-visible:outline-solid"
          @click="handleError"
        >
          Go back home
        </button>
      </div>
    </div>
  </main>
</template>
