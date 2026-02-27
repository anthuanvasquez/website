<script setup lang="ts">
interface HeadingData {
  title: string;
  subtitle: string;
}
const data = inject('data') as HeadingData;
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 30 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, margin: '-50px' }"
    :transition="{ duration: 0.6 }"
  >
    <div class="mb-16 text-center">
      <p
        class="font-firacode mb-3 text-sm tracking-[0.2em] text-(--text-tertiary) uppercase sm:text-base"
      >
        // {{ data.subtitle }}
      </p>

      <h2
        class="font-firacode text-4xl font-bold tracking-tight text-(--text-primary) sm:text-5xl"
      >
        {{ data.title }}
      </h2>
    </div>
  </Motion>
</template>
