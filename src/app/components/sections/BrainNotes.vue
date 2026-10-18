<script setup lang="ts">
import { homePageData } from '~/data';
import type { ContentItem } from '~/types';

defineProps<{
  notes: ContentItem[];
}>();

const { container: brainContainer, isRevealed } = useReveal();
</script>

<template>
  <div
    ref="brainContainer"
    class="reveal-group mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-0"
    :class="{ 'is-revealed': isRevealed }"
  >
    <p
      class="reveal-item text-text-secondary mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal"
    >
      {{ homePageData.sections.brain.description }}
    </p>

    <div
      class="reveal-item divide-border-subtle border-border-subtle w-full divide-y border-y"
      style="--reveal-delay: 150ms"
    >
      <NuxtLink
        v-for="note in notes"
        :key="note.path"
        :to="note.path"
        data-testid="home-brain-item"
        class="group hover:bg-surface-elevated/50 -mx-4 flex items-center gap-4 rounded-xl px-4 py-4 transition-colors"
      >
        <UIcon
          name="i-lucide-brain"
          class="text-tertiary size-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        />

        <span
          class="text-text-primary group-hover:text-tertiary flex-1 text-base font-medium transition-colors sm:text-lg"
        >
          {{ note.title || note.slug }}
        </span>

        <UIcon
          name="i-lucide-arrow-up-right"
          class="text-text-tertiary group-hover:text-tertiary size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>

    <div
      class="reveal-item mt-10 flex justify-center"
      style="--reveal-delay: 300ms"
    >
      <UButton
        to="/brain"
        color="neutral"
        variant="outline"
        class="btn-secondary group"
      >
        <span>{{ homePageData.sections.brain.actionLabel }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="text-text-tertiary group-hover:text-tertiary size-4.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </UButton>
    </div>
  </div>
</template>
