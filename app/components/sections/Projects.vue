<script setup lang="ts">
import type { Project } from '~/types';
import { gsap } from 'gsap';

const { data: projects } = await useGetFetch<Project[]>('/api/projects');

const projectsContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  nextTick(() => {
    if (projectsContainer.value) {
      ctx = gsap.context(() => {
        gsap.from('.project-card', {
          scrollTrigger: {
            trigger: projectsContainer.value,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }, projectsContainer.value);
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 md:px-0" ref="projectsContainer">
    <p
      class="experience-animate mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal text-(--text-secondary)"
    >
      These are personal projects I've developed independently. Due to
      confidentiality agreements, enterprise projects from my professional
      experience are not showcased here.
    </p>

    <div
      v-if="projects"
      class="mb-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
    >
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card group flex flex-col gap-4"
      >
        <!-- Image Container -->
        <a
          :href="project.link || '#'"
          target="_blank"
          class="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-(--surface-elevated) shadow-sm ring-1 ring-white/5 transition-transform duration-300 group-hover:-translate-y-1"
        >
          <NuxtImg
            v-if="project.image"
            :src="project.image"
            :alt="project.name"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="sm:100vw md:50vw"
            loading="lazy"
          />
          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-(--surface-base)"
          >
            <span
              class="font-firacode text-sm tracking-widest text-(--text-tertiary) uppercase"
            >
              No Image
            </span>
          </div>
        </a>

        <!-- Text Area -->
        <div class="flex flex-col px-2">
          <div class="mb-3 flex items-center gap-3">
            <h3
              class="text-2xl font-bold text-(--text-primary) transition-colors group-hover:text-white"
            >
              {{ project.name }}
            </h3>
            <a
              :href="project.link || '#'"
              target="_blank"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--surface-base) text-(--color-primary) ring-1 ring-(--color-primary) transition-all hover:bg-(--color-primary) hover:text-white"
            >
              <UIcon
                name="i-heroicons-arrow-up-right-20-solid"
                class="h-4 w-4"
              />
            </a>
          </div>
          <p
            class="text-base leading-relaxed font-normal text-(--text-secondary)"
          >
            {{ project.description }}
          </p>
          <p
            class="font-firacode mt-2 text-xs leading-relaxed font-normal text-(--text-secondary)"
          >
            {{ project.skills }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
