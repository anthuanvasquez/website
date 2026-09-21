<script setup lang="ts">
interface HeadingData {
  title: string;
  subtitle: string;
}
const data = inject('data') as HeadingData;
const { container, isRevealed } = useReveal();
</script>

<template>
  <div
    ref="container"
    class="reveal-group"
    :class="{ 'is-revealed': isRevealed }"
  >
    <div class="reveal-item mb-16 text-center">
      <p
        class="font-firacode text-text-tertiary mb-3 text-sm tracking-[0.2em] uppercase sm:text-base"
      >
        // {{ data.subtitle }}
      </p>

      <h2
        class="font-firacode text-text-primary text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {{ data.title }}
      </h2>
    </div>
  </div>
</template>
