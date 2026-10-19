<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: page } = await useFetch(`/api/blog/${slug}`);

const hasToc = computed(() => Boolean(page.value?.toc?.length));

useSeoMeta({
  title: () => page.value?.title || 'Blog Post',
  description: () => page.value?.description || 'Read more about this topic',
  ogImage: () => page.value?.meta?.image,
  twitterImage: () => page.value?.meta?.image,
});
</script>

<template>
  <div class="relative mx-auto max-w-7xl">
    <div class="mb-10">
      <NuxtLink
        to="/blog"
        class="text-text-secondary hover:text-text-primary inline-flex items-center text-sm font-medium transition-colors"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="mr-2 size-4"
          aria-hidden="true"
        />
        Back to articles
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
        <div
          v-if="page.meta?.image"
          class="bg-surface-elevated ring-border-subtle mb-10 overflow-hidden rounded-3xl shadow-lg ring-1"
        >
          <NuxtImg
            :src="page.meta.image"
            :alt="page.meta.alt || page.title"
            class="aspect-video max-h-125 w-full object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

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
      <h1 class="text-text-primary mb-4 text-3xl font-bold">Post not found</h1>
      <p class="text-text-secondary">
        The article you are looking for does not exist.
      </p>
    </div>
  </div>
</template>
