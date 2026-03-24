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
      class="experience-animate text-text-secondary mx-auto mb-12 max-w-lg text-center leading-relaxed font-normal"
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
            data-testid="experience-tab"
            class="shrink-0 px-5 py-3 text-left text-sm font-medium whitespace-nowrap transition-all md:border-l-2 md:text-base md:whitespace-normal"
            :class="
              activeIndex === index
                ? 'border-primary bg-surface-elevated text-primary md:border-b-0'
                : 'text-text-secondary hover:bg-surface-float hover:text-text-primary border-transparent md:border-b-0'
            "
            @click="activeIndex = index"
          >
            {{ experience.name }}
          </button>
        </div>

        <!-- Right side: Content -->
        <div class="pt-2 md:w-3/4 md:pt-0">
          <div v-if="experiences[activeIndex]">
            <h3 class="text-text-primary mb-1 text-2xl font-bold">
              {{ experiences[activeIndex]?.position }}
              <span class="text-primary">
                @ {{ experiences[activeIndex]?.name }}
              </span>
            </h3>
            <p class="font-firacode text-text-tertiary mb-8 text-sm">
              {{ experiences[activeIndex]?.date }}
            </p>

            <ul v-if="experiences[activeIndex]?.activities" class="space-y-4">
              <li
                v-for="(activity, aIndex) in experiences[activeIndex]
                  .activities"
                :key="aIndex"
                class="flex items-start"
              >
                <UIcon
                  name="i-lucide-check"
                  class="text-primary mt-1 mr-4 h-5 w-5 shrink-0"
                />
                <span
                  class="text-text-secondary block text-base leading-relaxed"
                >
                  {{ activity }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
