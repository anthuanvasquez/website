<script setup lang="ts">
const route = useRoute();
const slugParam = route.params.slug;
const slug = Array.isArray(slugParam)
  ? slugParam.join('/')
  : slugParam || 'second-brain';

const { data: page } = await useFetch(`/api/brain/${slug}`);

const hasToc = computed(() => Boolean(page.value?.toc?.length));

useSeoMeta({
  title: () => page.value?.title || 'Note',
  description: () => page.value?.description || 'A note from my second brain',
});
</script>

<template>
  <div class="relative mx-auto max-w-7xl">
    <div class="mb-10">
      <NuxtLink
        to="/brain"
        class="text-text-secondary hover:text-text-primary inline-flex items-center text-sm font-medium transition-colors"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="mr-2 size-4"
          aria-hidden="true"
        />
        Back to Second Brain
      </NuxtLink>
    </div>

    <div
      v-if="page"
      class="grid grid-cols-1 items-start gap-12"
      :class="hasToc ? 'lg:grid-cols-12' : ''"
    >
      <article
        class="prose prose-invert prose-blue max-w-none min-w-0"
        :class="hasToc ? 'lg:col-span-8 xl:col-span-9' : ''"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="markdown-content" v-html="page.html" />
      </article>

      <TableOfContents
        v-if="page.toc?.length"
        :items="page.toc"
        class="order-first lg:sticky lg:top-28 lg:order-last lg:col-span-4 xl:col-span-3"
      />
    </div>

    <div v-else class="py-20 text-center">
      <h1 class="text-text-primary mb-4 text-3xl font-bold">Note not found</h1>
      <p class="text-text-secondary">
        The note you are looking for does not exist or hasn't been exported yet.
      </p>
    </div>
  </div>
</template>
