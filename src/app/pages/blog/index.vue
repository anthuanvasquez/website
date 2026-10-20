<script setup lang="ts">
import type { ContentItem } from '~/types';

const { data: posts } = await useAPI<ContentItem[]>('/api/blog');

const publishedPosts = computed(() =>
  (posts.value || []).filter((post) => post.published !== false)
);

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

useHead({
  title: 'Blog | Anthuan Vásquez',
  meta: [
    {
      name: 'description',
      content: 'Thoughts on software development, architecture, and design.',
    },
  ],
});
</script>

<template>
  <div>
    <div class="mb-16 text-center">
      <h1
        class="text-text-primary mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
      >
        Latest
        <span
          class="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent"
          >Articles</span
        >
      </h1>
      <p class="text-text-secondary mx-auto max-w-2xl text-lg">
        Thoughts, tutorials, and insights about full-stack development, software
        architecture, and the modern web ecosystem.
      </p>
    </div>

    <div
      v-if="publishedPosts.length"
      class="divide-border-subtle border-border-subtle w-full divide-y border-y"
    >
      <NuxtLink
        v-for="post in publishedPosts"
        :key="post.path"
        :to="post.path"
        class="group hover:bg-surface-elevated/50 -mx-4 flex flex-col gap-1 rounded-xl px-4 py-4 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
      >
        <time
          :datetime="post.date"
          class="font-firacode text-text-tertiary w-32 shrink-0 text-sm"
        >
          {{ formatDate(post.date) }}
        </time>

        <span
          class="text-text-primary group-hover:text-primary flex-1 text-base font-medium transition-colors sm:text-lg"
        >
          {{ post.title || post.slug }}
        </span>

        <UIcon
          name="i-lucide-arrow-up-right"
          class="text-text-tertiary group-hover:text-primary hidden size-4 shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline-block"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-text-secondary text-lg">No posts available right now.</p>
    </div>
  </div>
</template>
