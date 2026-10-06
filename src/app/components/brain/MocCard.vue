<script setup lang="ts">
defineProps<{
  title: string;
  colorClass: string;
  description: string;
  links: { text: string; href: string }[];
}>();
</script>

<template>
  <div
    class="flex flex-col rounded-xl border-l-4 bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
    :class="colorClass"
  >
    <h3 class="mb-4 text-xl font-bold text-sky-200">{{ title }}</h3>
    <div class="mb-4 h-px w-full bg-slate-700"></div>

    <p v-if="description" class="text-text-secondary text-sm">
      <span v-html="description"></span>
    </p>

    <div v-if="links?.length" class="text-text-secondary text-sm">
      <template v-for="(link, idx) in links" :key="link.text">
        <a
          :href="link.href"
          class="border-border-subtle hover:text-text-primary border-b transition-colors"
          >{{ link.text }}</a
        ><span v-if="idx < links.length - 1">, </span>
      </template>
    </div>
  </div>
</template>
