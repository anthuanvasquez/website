<script setup lang="ts">
import { aboutPageData } from '~/data';

useSeoMeta({
  title: 'About | Anthuan Vásquez',
  description:
    'Learn about anthuanvasquez.net, my background as a Senior Software Engineer, and the history of this website.',
  ogTitle: 'About | Anthuan Vásquez',
  ogDescription:
    'Learn about anthuanvasquez.net, my background as a Senior Software Engineer, and the history of this website.',
});
</script>

<template>
  <div class="relative mx-auto max-w-7xl space-y-20">
    <!-- Section 1: About this Website -->
    <section aria-labelledby="about-website-heading" class="space-y-8">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-text-secondary hover:text-text-primary inline-flex items-center text-sm font-medium transition-colors"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="mr-2 size-4"
            aria-hidden="true"
          />
          Back to Home
        </NuxtLink>
      </div>

      <div class="space-y-4">
        <p
          class="text-primary font-firacode text-xs font-semibold tracking-widest uppercase"
        >
          // {{ aboutPageData.eyebrow }}
        </p>
        <h1
          id="about-website-heading"
          class="text-text-primary text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          {{ aboutPageData.title }}
        </h1>
        <div class="max-w-3xl space-y-4 pt-2">
          <p
            v-for="(paragraph, idx) in aboutPageData.paragraphs"
            :key="idx"
            class="text-text-secondary text-lg leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- Tech Stack Badges -->
      <div
        class="bg-surface-elevated/50 ring-border-subtle rounded-2xl p-6 ring-1 backdrop-blur-sm"
      >
        <div
          class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p
              class="text-text-tertiary font-firacode mb-3 text-xs font-medium tracking-wider uppercase"
            >
              Built With
            </p>
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="tech in aboutPageData.techStack"
                :key="tech.name"
                class="bg-surface-base text-text-secondary ring-border-subtle inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium shadow-sm ring-1"
              >
                <UIcon
                  :name="tech.icon"
                  class="text-primary size-3.5"
                  aria-hidden="true"
                />
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <UButton
            :to="aboutPageData.repositoryUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="neutral"
            variant="outline"
            class="btn-secondary shrink-0 self-start lg:self-center"
          >
            <UIcon
              name="i-simple-icons-github"
              class="size-4.5"
              aria-hidden="true"
            />
            <span>View Source on GitHub</span>
          </UButton>
        </div>
      </div>
    </section>

    <!-- Section 2: About Me, Anthuan Vásquez -->
    <section
      aria-labelledby="about-me-heading"
      class="border-border-subtle border-t pt-16"
    >
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <!-- Bio Column -->
        <div class="space-y-6 lg:col-span-8">
          <h2
            id="about-me-heading"
            class="text-text-primary text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {{ aboutPageData.aboutMe.heading }}
          </h2>

          <div class="space-y-4">
            <p
              v-for="(paragraph, idx) in aboutPageData.aboutMe.paragraphs"
              :key="idx"
              class="text-text-secondary text-lg leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Portrait & Role Card -->
        <div class="lg:col-span-4">
          <div
            class="bg-surface-elevated/60 ring-border-subtle overflow-hidden rounded-3xl p-4 ring-1 backdrop-blur-sm"
          >
            <div class="aspect-4/5 w-full overflow-hidden rounded-2xl">
              <NuxtImg
                :src="aboutPageData.aboutMe.image"
                :alt="aboutPageData.aboutMe.name"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>

            <div class="mt-4 px-2 pb-1">
              <h3 class="text-text-primary text-lg font-bold tracking-tight">
                {{ aboutPageData.aboutMe.name }}
              </h3>
              <p class="text-primary font-firacode text-xs font-medium">
                {{ aboutPageData.aboutMe.role }}
              </p>
              <p class="text-text-tertiary mt-1 text-xs">
                {{ aboutPageData.aboutMe.location }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: A Brief History about this Website -->
    <section
      aria-labelledby="site-history-heading"
      class="border-border-subtle space-y-8 border-t pt-16"
    >
      <div class="space-y-2">
        <h2
          id="site-history-heading"
          class="text-text-primary text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ aboutPageData.history.heading }}
        </h2>
        <p class="text-text-secondary text-base leading-relaxed">
          {{ aboutPageData.history.description }}
        </p>
      </div>

      <ul
        class="divide-border-subtle border-border-subtle divide-y border-y"
        role="list"
      >
        <li
          v-for="item in aboutPageData.history.items"
          :key="item.year"
          class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <span
            class="font-firacode text-primary w-28 shrink-0 text-sm font-semibold"
          >
            {{ item.year }}:
          </span>
          <span class="text-text-secondary text-base leading-relaxed">
            {{ item.event }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
