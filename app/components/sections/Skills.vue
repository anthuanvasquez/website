<script setup lang="ts">
import type { Skill } from '~/types';

const { data: skills } = await useAPI<Skill[]>('/api/skills');

const groupedSkills = computed(() => {
  if (!skills.value) return {};

  return skills.value.reduce(
    (acc, skill) => {
      (acc[skill.category] ??= []).push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
});

const { container: skillsContainer, isRevealed } = useReveal();
</script>

<template>
  <div
    ref="skillsContainer"
    class="reveal-group container mx-auto max-w-7xl px-4 md:px-0"
    :class="{ 'is-revealed': isRevealed }"
  >
    <div
      v-if="skills"
      class="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="(group, categoryName, categoryIndex) in groupedSkills"
        :key="categoryName"
        class="reveal-item"
        :style="{ '--reveal-delay': `${categoryIndex * 150}ms` }"
      >
        <h3 class="text-text-primary mb-6 text-xl font-bold">
          {{ categoryName }}
        </h3>
        <ul class="flex flex-col gap-4">
          <li v-for="(skill, index) in group" :key="index">
            <div
              class="text-text-secondary hover:text-text-primary inline-flex items-center transition-all hover:-translate-y-0.5"
            >
              <UIcon
                v-if="skill.icon"
                :name="skill.icon"
                class="me-3 inline-block h-5 w-5 shrink-0"
              />
              <span class="text-base leading-relaxed font-normal">
                {{ skill.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
