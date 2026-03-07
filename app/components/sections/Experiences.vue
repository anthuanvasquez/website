<script setup lang="ts">
import type { Experience } from '~/types';
import { gsap } from 'gsap';

const activeIndex = ref(0);
const { data: experiences } =
  await useGetFetch<Experience[]>('/api/experiences');

const experienceContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  nextTick(() => {
    if (experienceContainer.value) {
      ctx = gsap.context(() => {
        gsap.from('.experience-animate', {
          scrollTrigger: {
            trigger: experienceContainer.value,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }, experienceContainer.value);
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div
    class="container mx-auto max-w-7xl px-4 md:px-0"
    ref="experienceContainer"
  >
    <p
      class="experience-animate mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal text-(--text-secondary)"
    >
      Over the past 10+ years. I've the opportunity to work with wide range of
      projects, collaborating with diverse teams and clients.
    </p>

    <div class="rounded-xl border border-white/10 p-6">
      <div
        v-if="experiences && experiences.length > 0"
        class="experience-animate mx-auto flex w-full flex-col gap-8 md:flex-row md:gap-12"
      >
        <!-- Left side: Tabs -->
        <div
          class="flex w-full flex-row overflow-x-auto border-b border-white/10 md:w-1/4 md:flex-col md:overflow-x-visible md:border-b-0 md:pl-0"
        >
          <button
            v-for="(experience, index) in experiences"
            :key="index"
            class="shrink-0 px-5 py-3 text-left text-sm font-medium whitespace-nowrap transition-all md:border-l-2 md:text-base md:whitespace-normal"
            :class="
              activeIndex === index
                ? 'border-(--color-primary) bg-(--surface-elevated) text-(--color-primary) md:border-b-0'
                : 'border-transparent text-(--text-secondary) hover:bg-(--surface-float) hover:text-white md:border-b-0'
            "
            @click="activeIndex = index"
          >
            {{ experience.name }}
          </button>
        </div>

        <!-- Right side: Content -->
        <div class="pt-2 md:w-3/4 md:pt-0">
          <div v-if="experiences[activeIndex]">
            <h3 class="mb-1 text-2xl font-bold text-(--text-primary)">
              {{ experiences[activeIndex]?.position }}
              <span class="text-(--color-primary)">
                @ {{ experiences[activeIndex]?.name }}
              </span>
            </h3>
            <p class="font-firacode mb-8 text-sm text-(--text-tertiary)">
              {{ experiences[activeIndex]?.date }}
            </p>

            <ul v-if="experiences[activeIndex]?.projects" class="space-y-6">
              <li
                v-for="(project, pIndex) in experiences[activeIndex].projects"
                :key="pIndex"
                class="flex items-start"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-1 mr-4 h-5 w-5 shrink-0 text-(--color-primary)"
                />
                <div>
                  <span
                    class="block text-base leading-relaxed text-(--text-secondary)"
                  >
                    {{ project.description }}
                  </span>
                  <span
                    v-if="project.skills"
                    class="font-firacode mt-2 block text-xs text-(--text-tertiary)"
                  >
                    Skills:
                    <span class="text-(--text-secondary)">
                      {{ project.skills }}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
