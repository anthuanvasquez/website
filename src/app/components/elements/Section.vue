<script setup lang="ts">
import Heading from './Heading.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
});

provide('data', {
  title: props.title,
  subtitle: props.subtitle,
});
</script>

<template>
  <section :id="id" class="scroll-mt-32 py-20">
    <Heading />
    <slot />
  </section>
</template>
