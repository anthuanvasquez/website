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

const mocCategories = [
  {
    title: 'SWE & Architecture',
    colorClass: 'border-blue-400',
    description:
      'Design patterns, Clean Architecture, testing, and system design principles. The "how" we build software.',
    links: [],
  },
  {
    title: 'Computer Science',
    colorClass: 'border-red-400',
    description:
      'Algorithms, data structures, complexity (Big O), and the mathematical foundations of computing. The science base.',
    links: [],
  },
  {
    title: 'Languages',
    colorClass: 'border-yellow-400',
    description:
      'Syntax, deep dives, and idioms for TypeScript, Vue, SQL, Python, Go, and more.',
    links: [],
  },
  {
    title: 'Dev Tools & DevOps',
    colorClass: 'border-green-400',
    description:
      'Terminal setups, CLI workflows, Neovim, Git, Docker, AWS, and CI/CD pipelines.',
    links: [],
  },
  {
    title: 'PKM & Productivity',
    colorClass: 'border-purple-400',
    description:
      'Second Brain management, Zettelkasten workflows, Obsidian setups, GTD, and Deep Work.',
    links: [],
  },
];

const pillars = [
  {
    title: 'Crafted',
    icon: '🛠️',
    description:
      'Intentionally shaped notes to educate and inspire—built on strong principles of quality, clarity, and long-term value.',
  },
  {
    title: 'Connected',
    icon: '🔄',
    description:
      'Explore how thoughts are interconnected with the interactive graph and follow the backlinks to uncover unexpected relationships.',
  },
  {
    title: 'Compounded',
    icon: '📈',
    description:
      'With every note, idea, and insight, my Second Brain grows—compounding in value, just like a money investment.',
  },
];

// DUMMY IMPLEMENTATION FOR DATES UNTIL WE VERIFY WHERE DATES COME FROM IN YOUR CONTENT
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Mar 18, 2026'; // placeholder based on mockup
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-(--surface-base) pt-32 pb-24 text-(--text-secondary)"
  >
    <!-- Background glow similar to homepage -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-(--color-primary)/10 via-(--surface-base) to-(--surface-base)"
    ></div>

    <div class="relative mx-auto max-w-4xl space-y-24 px-6 sm:px-12 lg:px-8">
      <!-- HERO SECTION -->
      <section class="space-y-6 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-(--text-secondary) md:text-5xl"
        >
          Second
          <span
            class="bg-linear-to-r from-(--color-primary) to-(--color-secondary) bg-clip-text text-transparent"
            >Brain</span
          >
        </h1>
        <h2 class="text-xl font-semibold text-rose-400 sm:text-2xl">
          Crafted, Curated, Connected, Compounded
        </h2>

        <div
          class="mx-auto max-w-3xl rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-8"
        >
          <p
            class="text-base leading-relaxed text-(--text-secondary) sm:text-lg"
          >
            Welcome to my public Second Brain, a crafted knowledge vault where
            my notes, ideas, and insights are carefully
            <span class="font-bold text-(--text-primary)"
              >curated, connected,</span
            >
            and
            <span class="font-bold text-(--text-primary)">compounded</span> over
            time. This vault is modeled as a digital
            <a
              href="#"
              class="border-b border-(--border-subtle) transition-colors hover:text-(--text-primary)"
              >Zettelkasten</a
            >
            and
            <a
              href="#"
              class="border-b border-(--border-subtle) transition-colors hover:text-(--text-primary)"
              >Garden</a
            >.
          </p>
        </div>
      </section>

      <!-- MAP OF CONTENT -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">Map of Content</h2>
        <p class="max-w-3xl leading-relaxed text-(--text-secondary)">
          My Second Brain is continuously growing, and while I have some
          essential
          <a
            href="#"
            class="border-b border-(--border-subtle) transition-colors hover:text-(--text-primary)"
            >Map of Content (MOC)</a
          >
          starting points listed below, there are many more topics to discover
          as you explore. Feel free to dive into any of the following areas:
        </p>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BrainMocCard
            v-for="cat in mocCategories"
            :key="cat.title"
            :title="cat.title"
            :color-class="cat.colorClass"
            :description="cat.description"
            :links="cat.links"
          />
        </div>
      </section>

      <!-- ABOUT THIS SECOND BRAIN -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">
          About This Second Brain
        </h2>
        <p class="max-w-3xl leading-relaxed text-(--text-secondary)">
          For the quality of these notes and what to expect, check out the
          <a
            href="#"
            class="border-b border-(--border-subtle) transition-colors hover:text-(--text-primary)"
            >Disclaimer</a
          >. Otherwise, learn more about the principles behind this knowledge
          vault and how it's organized to provide lasting value.
        </p>

        <div class="grid gap-6 sm:grid-cols-3">
          <BrainFeatureCard
            v-for="pillar in pillars"
            :key="pillar.title"
            :title="pillar.title"
            :icon="pillar.icon"
            :description="pillar.description"
          />
        </div>
      </section>

      <!-- RECENT NOTES -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">Recent Notes</h2>

        <div class="flex flex-col space-y-4">
          <BrainRecentNote
            v-for="note in notes"
            :key="note.path"
            :title="note.title || ''"
            :path="note.path || ''"
            :date="formatDate(note.meta?.date as string)"
          />

          <div v-if="!notes?.length" class="py-10 text-center">
            <p class="text-lg text-(--text-tertiary)">
              No notes available right now.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
