<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  description: string;
}>();
</script>

<template>
  <div
    class="flex flex-col rounded-xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
  >
    <div class="mb-4 text-2xl">{{ icon }}</div>
    <h3 class="mb-3 text-xl font-bold text-sky-200">
      {{ title }}
    </h3>
    <p class="text-sm leading-relaxed text-gray-300">
      {{ description }}
    </p>
  </div>
</template>
