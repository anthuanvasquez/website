<script setup lang="ts">
import type { Service } from '~/types';
import { gsap } from 'gsap';

const { data: services } = await useGetFetch<Service[]>('/api/services');

const accordionItems = computed(() => {
  return (services.value || []).map((service) => ({
    id: service.id,
    label: service.name,
    icon: service.icon,
    description: service.description,
    categories: service.categories,
  }));
});

const servicesContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  nextTick(() => {
    if (servicesContainer.value) {
      ctx = gsap.context(() => {
        gsap.from('.service-row', {
          scrollTrigger: {
            trigger: servicesContainer.value,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
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
  <div class="container mx-auto max-w-7xl px-4 md:px-0" ref="servicesContainer">
    <UAccordion
      v-if="accordionItems.length"
      :items="accordionItems"
      multiple
      :ui="{
        root: 'w-full flex flex-col gap-0 border-t border-surface-elevated',
        item: 'service-row border-b my-2 border-surface-elevated transition-colors hover:border-transparent',
        trigger:
          'group flex w-full items-center justify-between py-8 focus-visible:ring-0 text-left hover:bg-transparent p-0 transition-all',
        label: 'flex-1 text-left',
        body: 'pt-0 pb-8 pl-0',
      }"
    >
      <template #default="{ item }">
        <div
          class="flex w-full flex-1 flex-col gap-6 pr-4 md:flex-row md:items-center md:gap-8"
        >
          <!-- ID -->
          <span
            class="text-text-secondary w-12 shrink-0 text-left font-mono text-lg"
          >
            {{ item.id }}
          </span>

          <!-- Thumbnail Box -->
          <div
            class="bg-surface-elevated relative flex h-[90px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]"
          >
            <div
              class="from-primary/10 absolute inset-0 bg-gradient-to-br to-transparent"
            ></div>
            <UIcon
              :name="item.icon"
              class="text-primary relative z-10 h-10 w-10"
            />
          </div>

          <!-- Title -->
          <div class="flex-1 text-left">
            <h3
              class="text-text-primary text-2xl font-medium tracking-tight transition-colors duration-300"
            >
              {{ item.label }}
            </h3>
          </div>
        </div>
      </template>

      <template #trailing="{ open }">
        <div
          class="border-surface-elevated bg-surface-base group-hover:bg-surface-elevated flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-white/10"
          :class="open ? 'bg-surface-elevated' : ''"
        >
          <UIcon
            :name="open ? 'i-lucide-minus' : 'i-lucide-plus'"
            class="text-text-secondary h-5 w-5 transition-transform duration-300"
            :class="open ? 'rotate-180' : ''"
          />
        </div>
      </template>

      <template #content="{ item }">
        <div
          class="flex flex-col items-start gap-8 pt-6 pr-4 pb-4 text-left md:pl-28 lg:flex-row lg:pr-16"
        >
          <!-- Description -->
          <div class="flex-1">
            <p class="text-md text-text-secondary max-w-2xl leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Categories -->
          <div class="w-full shrink-0 lg:w-[320px]">
            <div class="text-text-tertiary mb-4 text-xs tracking-wider">
              Categories
            </div>
            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="cat in item.categories"
                :key="cat"
                class="bg-surface-elevated text-text-primary hover:border-primary/30 hover:text-text-primary rounded-full border border-white/5 px-5 py-2 text-sm font-medium shadow-sm transition-colors"
              >
                {{ cat }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>
