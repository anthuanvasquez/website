<script setup lang="ts">
import type { TocItem } from '~/types';

const props = defineProps<{
  items: TocItem[];
}>();

const activeId = ref<string>(props.items[0]?.id || '');
let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  observer?.disconnect();

  const headingElements = props.items
    .map((item) => document.getElementById(item.id))
    .filter((el): el is HTMLElement => Boolean(el));

  if (!headingElements.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
          break;
        }
      }
    },
    {
      rootMargin: '-96px 0px -70% 0px',
      threshold: 0,
    }
  );

  for (const el of headingElements) {
    observer.observe(el);
  }
};

onMounted(() => {
  setupObserver();
});

watch(
  () => props.items,
  async () => {
    activeId.value = props.items[0]?.id || '';
    await nextTick();
    setupObserver();
  }
);

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <aside
    v-if="items.length"
    aria-label="Table of contents"
    data-testid="table-of-contents"
  >
    <!-- Mobile / Tablet Collapsible TOC -->
    <details
      class="group bg-surface-elevated/50 ring-border-subtle rounded-2xl p-4 ring-1 backdrop-blur-sm lg:hidden"
    >
      <summary
        class="font-firacode text-text-primary flex cursor-pointer list-none items-center justify-between text-xs font-semibold tracking-widest uppercase"
      >
        <span class="flex items-center gap-2">
          <UIcon
            name="i-lucide-list"
            class="text-primary size-4"
            aria-hidden="true"
          />
          On this page
        </span>
        <UIcon
          name="i-lucide-chevron-down"
          class="text-text-tertiary size-4 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <nav class="border-border-subtle mt-4 border-t pt-3">
        <ul class="space-y-2 text-sm">
          <li
            v-for="item in items"
            :key="item.id"
            :class="item.depth === 3 ? 'pl-4' : ''"
          >
            <a
              :href="`#${item.id}`"
              class="text-text-secondary hover:text-primary block py-0.5 leading-snug transition-colors"
              :class="activeId === item.id ? 'text-primary font-semibold' : ''"
              @click="activeId = item.id"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </details>

    <!-- Desktop Sticky TOC -->
    <nav class="hidden lg:block">
      <p
        class="font-firacode text-text-tertiary mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
      >
        <UIcon
          name="i-lucide-list"
          class="text-primary size-3.5"
          aria-hidden="true"
        />
        On this page
      </p>

      <ul class="border-border-subtle space-y-2.5 border-l text-sm">
        <li v-for="item in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="-ml-px block border-l-2 py-0.5 leading-snug transition-colors"
            :class="[
              item.depth === 3 ? 'pl-7 text-xs' : 'pl-4',
              activeId === item.id
                ? 'border-primary text-primary font-semibold'
                : 'text-text-secondary hover:text-text-primary hover:border-text-tertiary border-transparent',
            ]"
            @click="activeId = item.id"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
