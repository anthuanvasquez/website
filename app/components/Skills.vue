<script setup lang="ts">
import type { Skill } from '../types';

const { data: skills } = await useGetFetch<Skill[]>('/api/skills');

const groupedSkills = computed(() => {
  if (!skills.value) return {};

  return skills.value.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
});
</script>

<template>
  <div class="container mx-auto">
    <div
      v-if="skills"
      class="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4"
    >
      <div v-for="(group, categoryName) in groupedSkills" :key="categoryName">
        <h3 class="mb-6 text-xl font-bold text-[var(--text-primary)]">
          {{ categoryName }}
        </h3>
        <ul class="flex flex-col gap-4">
          <li v-for="(skill, index) in group" :key="index">
            <div
              class="inline-flex items-center text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
            >
              <UIcon
                v-if="skill.icon"
                :name="skill.icon"
                class="me-3 inline-block h-5 w-5 shrink-0"
              />
              <span class="text-base font-normal leading-relaxed">
                {{ skill.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
