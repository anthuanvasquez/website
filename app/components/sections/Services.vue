<script setup lang="ts">
import type { Service } from '../../types';
import { gsap } from 'gsap';

const { data: services } = await useGetFetch<Service[]>('api/services');

const servicesContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  nextTick(() => {
    if (servicesContainer.value) {
      ctx = gsap.context(() => {
        gsap.from('.service-card', {
          scrollTrigger: {
            trigger: servicesContainer.value,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        });
      }, servicesContainer.value);
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="container max-w-7xl mx-auto px-4 md:px-0" ref="servicesContainer">
    <div
      v-if="services"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-card h-full"
      >
        <div
          class="group flex h-full flex-col items-center justify-center rounded-2xl bg-[var(--surface-elevated)] p-8 text-center ring-1 ring-white/5 transition-all duration-400 hover:-translate-y-2 hover:bg-[var(--surface-float)] hover:ring-[var(--color-primary)]/30"
        >
          <div
            class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--surface-base)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-primary)]"
          >
            <UIcon v-if="service?.icon" :name="service.icon" class="h-8 w-8" />
          </div>

          <h3
            class="font-firacode text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-300 group-hover:text-white"
          >
            {{ service.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
