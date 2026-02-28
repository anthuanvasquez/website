<script setup lang="ts">
defineProps({
  count: Number,
});
</script>

<template>
  <div
    role="status"
    class="max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow-sm md:p-6 dark:divide-gray-700 dark:border-gray-700"
  >
    <div v-for="n in count" :key="n" class="flex items-center justify-between">
      <div>
        <div
          class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
        />
        <div class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
      <div class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
