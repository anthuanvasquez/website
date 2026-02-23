<script setup lang="ts">
interface HeadingData {
  title: string;
  subtitle: string;
}
const data = inject('data') as HeadingData;
</script>

<template>
  <div class="mb-12 text-center">
    <p class="text-xs font-firacode text-[var(--text-tertiary)] tracking-widest uppercase mb-2">
      // {{ data.subtitle }}
    </p>

    <h2 class="font-firacode text-3xl font-bold tracking-tight text-[var(--text-primary)]">
      {{ data.title }}
    </h2>
  </div>
</template>
