<script setup lang="ts">
interface HeadingData {
  title: string;
  subtitle: string;
}
const data = inject('data') as HeadingData;
</script>

<template>
  <div class="mb-16 text-center">
    <p
      class="font-firacode mb-3 text-sm tracking-[0.2em] text-[var(--text-tertiary)] uppercase sm:text-base"
    >
      // {{ data.subtitle }}
    </p>

    <h2
      class="font-firacode text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
    >
      {{ data.title }}
    </h2>
  </div>
</template>
