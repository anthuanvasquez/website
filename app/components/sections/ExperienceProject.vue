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
      class="font-firacode mb-4 text-sm tracking-widest text-(--text-tertiary) uppercase"
    >
      // Showcase Projects
    </h3>

    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="project in projects"
        :key="project.name"
        class="flex flex-col justify-between rounded-xl bg-(--surface-float) p-5 ring-1 ring-white/5 transition-all hover:bg-(--surface-elevated)"
      >
        <div>
          <h4
            class="font-firacode mb-2 text-base font-bold text-(--text-primary)"
          >
            {{ project.name }}
          </h4>
          <p
            class="mb-4 text-sm leading-relaxed font-normal text-(--text-secondary)"
          >
            {{ project.description }}
          </p>
        </div>
        <p class="text-sm text-(--text-secondary)">
          <span class="text-primary me-2 font-medium">Skills:</span>
          <span class="font-firacode text-xs text-(--text-tertiary)">{{
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
