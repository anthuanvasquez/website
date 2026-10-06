<script setup lang="ts">
defineProps<{
  title: string;
  path: string;
  date: string;
}>();
</script>

<template>
  <NuxtLink
    :to="path"
    class="group flex flex-col gap-2 py-2 transition-colors sm:flex-row sm:items-center sm:gap-6"
  >
    <span class="text-text-tertiary text-sm whitespace-nowrap">{{ date }}</span>
    <span
      class="text-text-secondary group-hover:border-border-subtle group-hover:text-text-primary border-b border-transparent text-base font-medium transition-all"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>
