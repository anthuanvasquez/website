<script setup lang="ts">
defineProps({
  count: Number,
});
</script>

<template>
  <div
    role="status"
    class="max-w-md animate-pulse space-y-4 divide-y divide-(--border-subtle) rounded border border-(--border-subtle) p-4 shadow-sm md:p-6"
  >
    <div v-for="n in count" :key="n" class="flex items-center justify-between">
      <div>
        <div class="mb-2.5 h-2.5 w-24 rounded-full bg-(--surface-elevated)" />
        <div class="h-2 w-32 rounded-full bg-(--surface-float)" />
      </div>
      <div class="h-2.5 w-12 rounded-full bg-(--surface-elevated)" />
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
