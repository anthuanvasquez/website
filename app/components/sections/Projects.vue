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
      class="experience-animate text-text-secondary mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal"
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
        data-testid="project-card"
        class="project-card group flex flex-col gap-4"
      >
        <!-- Image Container -->
        <a
          :href="project.link || '#'"
          target="_blank"
          class="bg-surface-elevated aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm ring-1 ring-white/5 transition-transform duration-300 group-hover:-translate-y-1"
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
            class="bg-surface-base flex h-full w-full items-center justify-center"
          >
            <span
              class="font-firacode text-text-tertiary text-sm tracking-widest uppercase"
            >
              No Image
            </span>
          </div>
        </a>

        <!-- Text Area -->
        <div class="flex flex-col px-2">
          <div class="mb-3 flex items-center gap-3">
            <h3
              data-testid="project-title"
              class="text-text-primary group-hover:text-text-primary text-2xl font-bold transition-colors"
            >
              {{ project.name }}
            </h3>
            <a
              :href="project.link || '#'"
              target="_blank"
              class="bg-surface-base text-primary ring-primary hover:bg-primary hover:text-text-primary inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 transition-all"
            >
              <UIcon
                name="i-heroicons-arrow-up-right-20-solid"
                class="h-4 w-4"
              />
            </a>
          </div>
          <p class="text-text-secondary text-base leading-relaxed font-normal">
            {{ project.description }}
          </p>
          <div v-if="project.skills" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="skill in project.skills.split(',')"
              :key="skill.trim()"
              class="font-firacode bg-primary/10 text-primary ring-primary/20 rounded-full px-3 py-1 text-xs font-medium ring-1"
            >
              {{ skill.trim() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
