<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').all();
});

useHead({
  title: 'Blog | Anthuan Vásquez',
  meta: [
    {
      name: 'description',
      content: 'Thoughts on software development, architecture, and design.',
    },
  ],
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-900 pt-32 pb-24">
    <!-- Background glow similar to homepage -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900"
    ></div>

    <div class="relative mx-auto max-w-4xl px-6 sm:px-12 lg:px-8">
      <div class="mb-16 text-center">
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
        >
          Latest
          <span
            class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >Articles</span
          >
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-400">
          Thoughts, tutorials, and insights about full-stack development,
          software architecture, and the modern web ecosystem.
        </p>
      </div>

      <div class="space-y-8">
        <article
          v-for="post in posts"
          :key="post.path"
          class="group relative flex flex-col items-start justify-between rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
        >
          <div class="mb-4 flex items-center gap-x-4 text-xs">
            <time :datetime="post.date" class="font-firacode text-gray-400">
              {{
                new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
            </time>
          </div>
          <div class="group relative">
            <h3
              class="mt-3 text-2xl leading-6 font-semibold text-white transition-colors group-hover:text-blue-400"
            >
              <NuxtLink :to="post.path">
                <span class="absolute inset-0" />
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
              {{ post.description }}
            </p>
          </div>
        </article>

        <div v-if="!posts?.length" class="py-20 text-center">
          <p class="text-lg text-gray-400">No posts available right now.</p>
        </div>
      </div>
    </div>
  </div>
</template>
