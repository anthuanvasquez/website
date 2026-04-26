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
  <div
    class="bg-surface-base relative min-h-screen overflow-hidden pt-32 pb-24"
  >
    <!-- Background glow similar to homepage -->
    <div
      class="from-primary/20 via-surface-base to-surface-base absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]"
    ></div>

    <div class="relative mx-auto max-w-4xl px-6 sm:px-12 lg:px-8">
      <div class="mb-16 text-center">
        <h1
          class="text-text-primary mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          Latest
          <span
            class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent"
            >Articles</span
          >
        </h1>
        <p class="text-text-secondary mx-auto max-w-2xl text-lg">
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
            <time
              :datetime="post.date"
              class="font-firacode text-text-secondary"
            >
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
              class="text-text-primary mt-3 text-2xl leading-6 font-semibold transition-colors group-hover:text-blue-400"
            >
              <NuxtLink :to="post.path">
                <span class="absolute inset-0" />
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-text-tertiary mt-5 line-clamp-3 text-sm leading-6">
              {{ post.description }}
            </p>
          </div>
        </article>

        <div v-if="!posts?.length" class="py-20 text-center">
          <p class="text-text-secondary text-lg">
            No posts available right now.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
