<script setup lang="ts">
const route = useRoute();
const slugParam = route.params.slug;
const slug = Array.isArray(slugParam)
  ? slugParam.join('/')
  : slugParam || 'second-brain';

const { data: page } = await useFetch(`/api/brain/${slug}`);

useSeoMeta({
  title: () => page.value?.title || 'Note',
  description: () => page.value?.description || 'A note from my second brain',
});
</script>

<template>
  <div class="mb-10">
    <NuxtLink
      to="/brain"
      class="inline-flex items-center font-medium text-blue-400 transition-colors hover:text-blue-300"
    >
      <UIcon
        name="i-lucide-arrow-left"
        class="mr-2 h-4 w-4"
        aria-hidden="true"
      />
      Back to Second Brain
    </NuxtLink>
  </div>

  <article v-if="page" class="prose prose-invert prose-blue max-w-none">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown-content" v-html="page.html" />
  </article>

  <div v-else class="py-20 text-center">
    <h1 class="text-text-primary mb-4 text-3xl font-bold">Note not found</h1>
    <p class="text-text-secondary">
      The note you are looking for does not exist or hasn't been exported yet.
    </p>
  </div>
</template>
