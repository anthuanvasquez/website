<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  skills: string;
}

interface Props {
  projects: Project[];
}

defineProps<Props>();
</script>

<template>
  <div class="col-span-12 mt-6 mb-2">
    <h3
      class="font-firacode text-text-tertiary mb-4 text-sm tracking-widest uppercase"
    >
      // Showcase Projects
    </h3>

    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="project in projects"
        :key="project.name"
        class="bg-surface-float hover:bg-surface-elevated flex flex-col justify-between rounded-xl p-5 ring-1 ring-white/5 transition-all"
      >
        <div>
          <h4 class="font-firacode text-text-primary mb-2 text-base font-bold">
            {{ project.name }}
          </h4>
          <p
            class="text-text-secondary mb-4 text-sm leading-relaxed font-normal"
          >
            {{ project.description }}
          </p>
        </div>
        <p class="text-text-secondary text-sm">
          <span class="text-primary me-2 font-medium">Skills:</span>
          <span class="font-firacode text-text-tertiary text-xs">{{
            project.skills
          }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.transition-all {
  interpolate-size: allow-keywords;
  transition-property: max-height, opacity;
}
</style>
