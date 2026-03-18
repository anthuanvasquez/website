<script setup lang="ts">
const { data: notes } = await useAsyncData('brain-notes', () => {
  return queryCollection('brain').all();
});

useHead({
  title: 'Second Brain | Anthuan Vásquez',
  meta: [
    {
      name: 'description',
      content: 'My digital garden and second brain notes.',
    },
  ],
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-900 pt-32 pb-24">
    <!-- Background glow similar to homepage -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900"
    ></div>

    <div class="relative mx-auto max-w-4xl px-6 sm:px-12 lg:px-8">
      <div class="mb-16 text-center">
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
        >
          Second
          <span
            class="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >Brain</span
          >
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-400">
          Welcome to my digital garden. A collection of notes, snippets, and
          thoughts.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="note in notes"
          :key="note.path"
          :to="note.path"
          class="group relative flex flex-col items-start justify-between rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
        >
          <h3
            class="text-xl leading-6 font-semibold text-white transition-colors group-hover:text-blue-400"
          >
            {{ note.title }}
          </h3>
          <p
            v-if="note.description"
            class="mt-3 line-clamp-2 text-sm text-gray-300"
          >
            {{ note.description }}
          </p>
        </NuxtLink>

        <div v-if="!notes?.length" class="col-span-full py-20 text-center">
          <p class="text-lg text-gray-400">No notes available right now.</p>
        </div>
      </div>
    </div>
  </div>
</template>
