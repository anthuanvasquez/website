<script setup lang="ts">
import type { ChangelogResponse } from '~/types';

const {
  data: changelog,
  pending,
  error,
} = await useAPI<ChangelogResponse>('/api/changelog');

useSeoMeta({
  title: 'About This Site | Anthuan Vásquez',
  description:
    'The technical evolution, architectural decisions, and living changelog of anthuanvasquez.net.',
  ogTitle: 'About This Site | Anthuan Vásquez',
  ogDescription:
    'The technical evolution, architectural decisions, and living changelog of anthuanvasquez.net.',
});

const getCategoryClass = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes('added')) {
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20';
  }
  if (lower.includes('changed') || lower.includes('performance')) {
    return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20';
  }
  if (lower.includes('fixed')) {
    return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20';
  }
  if (lower.includes('security')) {
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20';
  }
  if (lower.includes('tooling') || lower.includes('ci')) {
    return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20';
  }
  return 'bg-primary/10 text-primary ring-primary/20';
};

const techStack = [
  { name: 'Nuxt 4', icon: 'i-simple-icons-nuxtdotjs' },
  { name: 'Vue 3', icon: 'i-simple-icons-vuedotjs' },
  { name: 'Tailwind CSS v4', icon: 'i-simple-icons-tailwindcss' },
  { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
  { name: 'Nitro Engine', icon: 'i-lucide-zap' },
  { name: 'Mapbox GL', icon: 'i-simple-icons-mapbox' },
  { name: 'Vitest', icon: 'i-simple-icons-vitest' },
];
</script>

<template>
  <div class="relative mx-auto max-w-4xl space-y-16">
    <!-- Header / Colophon -->
    <header class="space-y-6">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-text-secondary hover:text-text-primary inline-flex items-center text-sm font-medium transition-colors"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="mr-2 h-4 w-4"
            aria-hidden="true"
          />
          Back to Home
        </NuxtLink>

        <span
          v-if="changelog?.currentVersion"
          class="font-firacode bg-primary/10 text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1"
        >
          <span class="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
          v{{ changelog.currentVersion }}
        </span>
      </div>

      <div class="space-y-3">
        <p
          class="text-primary font-firacode text-xs font-semibold tracking-widest uppercase"
        >
          Colophon & Living History
        </p>
        <h1
          class="text-text-primary text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          About This Site
        </h1>
        <p class="text-text-secondary max-w-2xl text-lg leading-relaxed">
          This site serves as both my personal portfolio and an active
          engineering sandbox. Built with a focus on high performance,
          accessibility, minimal external bloat, and living documentation.
        </p>
      </div>

      <!-- Tech Stack Badges -->
      <div
        class="bg-surface-elevated/50 ring-border-subtle rounded-2xl p-5 ring-1 backdrop-blur-sm"
      >
        <p
          class="text-text-tertiary mb-3 text-xs font-medium tracking-wider uppercase"
        >
          Current Technology Stack
        </p>
        <div class="flex flex-wrap gap-2.5">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="bg-surface-base text-text-secondary ring-border-subtle inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium shadow-sm ring-1"
          >
            <UIcon
              :name="tech.icon"
              class="text-primary h-3.5 w-3.5"
              aria-hidden="true"
            />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading / Error states -->
    <div v-if="pending" class="space-y-8">
      <div
        v-for="i in 3"
        :key="i"
        class="bg-surface-elevated/40 h-40 animate-pulse rounded-2xl"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-surface-elevated rounded-2xl p-8 text-center"
    >
      <UIcon
        name="i-lucide-alert-triangle"
        class="mx-auto mb-3 h-8 w-8 text-amber-500"
      />
      <h2 class="text-text-primary text-lg font-bold">
        Could not load changelog
      </h2>
      <p class="text-text-secondary mt-1 text-sm">
        Please check back shortly or review the source on GitHub.
      </p>
    </div>

    <!-- Timeline of Eras -->
    <section v-else aria-label="Site Evolution Timeline" class="space-y-12">
      <div class="border-border-subtle border-b pb-4">
        <h2 class="text-text-primary text-2xl font-bold tracking-tight">
          Evolution Timeline
        </h2>
        <p class="text-text-secondary mt-1 text-sm">
          A chronologically grouped record of all platform iterations, from the
          earliest HTML prototype to the modern Nuxt 4 release.
        </p>
      </div>

      <div
        class="border-border-subtle relative space-y-16 border-l pl-6 sm:pl-10"
      >
        <article
          v-for="era in changelog?.eras"
          :key="era.version"
          class="group relative"
        >
          <!-- Timeline Node -->
          <div
            class="bg-primary ring-surface-base absolute top-1.5 -left-[33px] h-4 w-4 rounded-full shadow-sm ring-4 transition-transform duration-200 group-hover:scale-125 sm:-left-[49px]"
            aria-hidden="true"
          ></div>

          <div class="space-y-4">
            <!-- Era Header -->
            <div class="flex flex-wrap items-center gap-3">
              <span
                class="font-firacode bg-primary/10 text-primary ring-primary/25 rounded-md px-2.5 py-1 text-sm font-bold ring-1"
              >
                {{ era.version }}
              </span>
              <time
                v-if="era.date"
                class="text-text-tertiary text-xs font-medium"
              >
                {{ era.date }}
              </time>
            </div>

            <!-- Era Summary -->
            <p
              v-if="era.summary"
              class="text-text-secondary text-base leading-relaxed"
            >
              {{ era.summary }}
            </p>

            <!-- Categorized Sections -->
            <div class="space-y-5 pt-2">
              <div
                v-for="section in era.sections"
                :key="section.title"
                class="bg-surface-elevated/40 ring-border-subtle rounded-xl p-4 ring-1"
              >
                <div class="mb-3 flex items-center gap-2">
                  <span
                    :class="[
                      'rounded-full px-2.5 py-0.5 text-xs font-medium ring-1',
                      getCategoryClass(section.title),
                    ]"
                  >
                    {{ section.title }}
                  </span>
                </div>

                <ul class="space-y-2 text-sm">
                  <li
                    v-for="(item, idx) in section.items"
                    :key="idx"
                    class="text-text-secondary flex items-start gap-2.5"
                  >
                    <span
                      class="text-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
                      aria-hidden="true"
                    ></span>
                    <!-- eslint-disable vue/no-v-html -->
                    <span
                      class="[&>strong]:text-text-primary [&>code]:font-firacode [&>code]:bg-surface-base [&>code]:text-primary leading-relaxed [&>code]:rounded [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:text-xs [&>strong]:font-semibold"
                      v-html="item"
                    ></span>
                    <!-- eslint-enable vue/no-v-html -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Repository Footer Note -->
    <aside
      class="bg-surface-elevated/60 ring-border-subtle rounded-2xl p-6 ring-1"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="space-y-1">
          <h3 class="text-text-primary text-base font-semibold">
            Open Source & Living Document
          </h3>
          <p class="text-text-secondary text-sm">
            This changelog and the entire codebase are open source and tracked
            on GitHub.
          </p>
        </div>
        <UButton
          to="https://github.com/anthuanvasquez/website"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="outline"
          class="shrink-0"
        >
          <UIcon
            name="i-simple-icons-github"
            class="mr-2 h-4 w-4"
            aria-hidden="true"
          />
          View on GitHub
        </UButton>
      </div>
    </aside>
  </div>
</template>
