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

    <p v-if="description" class="text-sm text-gray-300">
      <span v-html="description"></span>
    </p>

    <div v-if="links?.length" class="text-sm text-gray-300">
      <template v-for="(link, idx) in links" :key="link.text">
        <a
          :href="link.href"
          class="border-b border-gray-500 transition-colors hover:text-white"
          >{{ link.text }}</a
        ><span v-if="idx < links.length - 1">, </span>
      </template>
    </div>
  </div>
</template>
