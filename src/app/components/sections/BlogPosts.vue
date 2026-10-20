<script setup lang="ts">
import { homePageData } from '~/data';
import type { ContentItem } from '~/types';

defineProps<{
  posts: ContentItem[];
}>();

const { container: blogContainer, isRevealed } = useReveal();

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
</script>

<template>
  <div
    ref="blogContainer"
    class="reveal-group mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-0"
    :class="{ 'is-revealed': isRevealed }"
  >
    <p
      class="reveal-item text-text-secondary mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal"
    >
      {{ homePageData.sections.blog.description }}
    </p>

    <div
      class="reveal-item divide-border-subtle border-border-subtle w-full divide-y border-y"
      style="--reveal-delay: 150ms"
    >
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        data-testid="home-blog-item"
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

    <div
      class="reveal-item mt-10 flex justify-center"
      style="--reveal-delay: 300ms"
    >
      <UButton
        to="/blog"
        color="neutral"
        variant="outline"
        class="btn-secondary group"
      >
        <span>{{ homePageData.sections.blog.actionLabel }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="text-text-tertiary group-hover:text-primary size-4.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </UButton>
    </div>
  </div>
</template>
