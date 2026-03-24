<script setup lang="ts">
defineProps({
  count: Number,
});
</script>

<template>
  <div
    role="status"
    class="divide-border-subtle border-border-subtle max-w-md animate-pulse space-y-4 divide-y rounded border p-4 shadow-sm md:p-6"
  >
    <div v-for="n in count" :key="n" class="flex items-center justify-between">
      <div>
        <div class="bg-surface-elevated mb-2.5 h-2.5 w-24 rounded-full" />
        <div class="bg-surface-float h-2 w-32 rounded-full" />
      </div>
      <div class="bg-surface-elevated h-2.5 w-12 rounded-full" />
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
