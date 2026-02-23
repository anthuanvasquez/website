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
    <h3 class="font-firacode text-sm uppercase tracking-widest text-[var(--text-tertiary)] mb-4">// Showcase Projects</h3>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li
        v-for="project in projects"
        :key="project.name"
        class="rounded-xl flex flex-col justify-between bg-[var(--surface-float)] ring-1 ring-white/5 p-5 transition-all hover:bg-[var(--surface-elevated)]"
      >
        <div>
          <h4 class="font-firacode text-base font-bold text-[var(--text-primary)] mb-2">
            {{ project.name }}
          </h4>
          <p class="text-sm font-normal text-[var(--text-secondary)] leading-relaxed mb-4">
               {{ project.description }}
          </p>
        </div>
        <p class="text-sm text-[var(--text-secondary)]">
          <span class="me-2 font-medium text-[var(--text-primary)]">Skills:</span>
          <span class="text-xs font-firacode text-[var(--text-tertiary)]">{{
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
