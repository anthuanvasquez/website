<script setup lang="ts">
import type { Service } from '../types';

const {
  data: services,
  error,
  pending,
} = await useGetFetch<Service[]>('api/services');
</script>

<template>
  <div class="container mx-auto px-4 md:px-0">
    <div
      v-if="services"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(service, index) in services"
        :key="index"
        class="group flex flex-col items-center justify-center rounded-2xl bg-[var(--surface-elevated)] p-8 text-center ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-float)] hover:ring-[var(--color-primary)]/30"
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
</template>
