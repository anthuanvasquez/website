<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('blog').path(route.path).first();
});

useSeoMeta({
  title: () => page.value?.title || 'Blog Post',
  description: () => page.value?.description || 'Read more about this topic',
});
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-(--surface-base) pt-32 pb-24"
  >
    <!-- Background glow -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-(--color-primary)/20 via-(--surface-base) to-(--surface-base)"
    ></div>

    <main class="relative mx-auto max-w-3xl px-6 sm:px-12 lg:px-8">
      <div class="mb-10">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-2 h-4 w-4" />
          Back to articles
        </NuxtLink>
      </div>

      <article v-if="page" class="prose prose-invert prose-blue max-w-none">
        <ContentRenderer v-if="page" :value="page" />
      </article>

      <div v-else class="py-20 text-center">
        <h1 class="mb-4 text-3xl font-bold text-(--text-primary)">
          Post not found
        </h1>
        <p class="text-(--text-secondary)">
          The article you are looking for does not exist.
        </p>
      </div>
    </main>
  </div>
</template>
