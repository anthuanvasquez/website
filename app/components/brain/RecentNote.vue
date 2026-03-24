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
    <span class="text-sm whitespace-nowrap text-(--text-tertiary)">{{
      date
    }}</span>
    <span
      class="border-b border-transparent text-base font-medium text-(--text-secondary) transition-all group-hover:border-(--border-subtle) group-hover:text-(--text-primary)"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>
