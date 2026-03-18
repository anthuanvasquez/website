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
    title: 'Data Engineering',
    colorClass: 'border-red-400',
    description:
      'Visit the Data Engineering Vault. Key topics include Data Engineering Concepts, Tools and Technologies, Practices, Modern Data Engineering and many more.',
    links: [],
  },
  {
    title: 'Personal Knowledge Management',
    colorClass: 'border-blue-400',
    description: '',
    links: [
      { text: 'Second Brain', href: '#' },
      { text: 'Obsidian', href: '#' },
      { text: 'Managing My Business with Obsidian', href: '#' },
      { text: 'Zettelkasten', href: '#' },
      { text: 'Permanent Notes', href: '#' },
      { text: 'Public Second Brain with Quartz', href: '#' },
      { text: 'How to Build a Second Brain', href: '#' },
      { text: 'Smart Note Taking', href: '#' },
      { text: 'PKM Workflow', href: '#' },
    ],
  },
  {
    title: 'Deep Life',
    colorClass: 'border-pink-400',
    description: '',
    links: [
      { text: 'Digital Minimalism', href: '#' },
      { text: 'Deep Work', href: '#' },
      { text: 'What Makes a Happy Life', href: '#' },
      { text: 'Thoughts on Journaling', href: '#' },
      { text: 'Stoic', href: '#' },
      { text: 'Routines', href: '#' },
      { text: 'Reading Books for a Happy Life', href: '#' },
      { text: 'Minimalism', href: '#' },
      { text: 'Pathless Path', href: '#' },
      { text: 'Dumb Phone', href: '#' },
      { text: 'What I Have Learned Abroad', href: '#' },
    ],
  },
  {
    title: 'Writing & Reading',
    colorClass: 'border-purple-400',
    description: '',
    links: [
      { text: 'Writing is Thinking', href: '#' },
      { text: 'Markdown', href: '#' },
      { text: 'On Writing', href: '#' },
      { text: 'Reading Books for a Happy Life', href: '#' },
      { text: 'Creative Writing', href: '#' },
      { text: 'Distract-Free Typewriter', href: '#' },
      { text: 'Type of Notetakers', href: '#' },
      { text: 'Markdown vs Rich Text', href: '#' },
      { text: 'Plaintext Files', href: '#' },
      { text: 'Types of Content Online', href: '#' },
    ],
  },
  {
    title: 'Productivity',
    colorClass: 'border-indigo-400',
    description: '',
    links: [
      { text: 'Getting Things Done (GTD)', href: '#' },
      { text: 'My Gigs', href: '#' },
      { text: 'No Meetings (Async)', href: '#' },
      { text: 'Deep Work', href: '#' },
      { text: 'Music for Focus', href: '#' },
      { text: 'Creativity vs Productivity', href: '#' },
      { text: 'Hell Yeah or No', href: '#' },
      { text: 'Ultradian Rhythm', href: '#' },
    ],
  },
  {
    title: 'Neovim',
    colorClass: 'border-green-400',
    description: '',
    links: [
      { text: 'Vim', href: '#' },
      { text: 'Neovim Setup', href: '#' },
      { text: 'Vim Motions', href: '#' },
      { text: 'Query Databases in Vim', href: '#' },
      { text: 'Vim Language', href: '#' },
      { text: 'Vim for Obsidian', href: '#' },
      { text: 'Why Vim is More Than Just an Editor', href: '#' },
      { text: 'Vim Anywhere', href: '#' },
      { text: 'Unix Philosophy', href: '#' },
      { text: 'Dotfiles', href: '#' },
      { text: 'TUIs', href: '#' },
    ],
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
    class="relative min-h-screen overflow-hidden bg-gray-900 pt-32 pb-24 text-gray-300"
  >
    <!-- Background glow similar to homepage -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-gray-900 to-gray-900"
    ></div>

    <div class="relative mx-auto max-w-4xl space-y-24 px-6 sm:px-12 lg:px-8">
      <!-- HERO SECTION -->
      <section class="space-y-6 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-300 md:text-5xl"
        >
          Second
          <span
            class="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >Brain</span
          >
        </h1>
        <h2 class="text-xl font-semibold text-rose-400 sm:text-2xl">
          Crafted, Curated, Connected, Compounded
        </h2>

        <div
          class="mx-auto max-w-3xl rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-8"
        >
          <p class="text-base leading-relaxed text-gray-300 sm:text-lg">
            Welcome to my public Second Brain, a crafted knowledge vault where
            my notes, ideas, and insights are carefully
            <span class="font-bold text-white">curated, connected,</span> and
            <span class="font-bold text-white">compounded</span> over time. This
            vault is modeled as a digital
            <a
              href="#"
              class="border-b border-gray-400 transition-colors hover:text-white"
              >Zettelkasten</a
            >
            and
            <a
              href="#"
              class="border-b border-gray-400 transition-colors hover:text-white"
              >Garden</a
            >.
          </p>
        </div>
      </section>

      <!-- MAP OF CONTENT -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">Map of Content</h2>
        <p class="max-w-3xl leading-relaxed text-gray-300">
          My Second Brain is continuously growing, and while I have some
          essential
          <a
            href="#"
            class="border-b border-gray-400 transition-colors hover:text-white"
            >Map of Content (MOC)</a
          >
          starting points listed below, there are many more topics to discover
          as you explore. Feel free to dive into any of the following areas:
        </p>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="cat in mocCategories"
            :key="cat.title"
            class="flex flex-col rounded-xl border-l-4 bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
            :class="cat.colorClass"
          >
            <h3 class="mb-4 text-xl font-bold text-sky-200">{{ cat.title }}</h3>
            <div class="mb-4 h-px w-full bg-slate-700"></div>

            <p v-if="cat.description" class="text-sm text-gray-300">
              <span
                v-html="
                  cat.description.replace(
                    'Data Engineering Vault',
                    '<a href=\'#\' class=\'border-b border-gray-400 hover:text-white transition-colors\'>Data Engineering Vault</a>'
                  )
                "
              ></span>
            </p>

            <div v-if="cat.links.length" class="text-sm text-gray-300">
              <template v-for="(link, idx) in cat.links" :key="link.text">
                <a
                  :href="link.href"
                  class="border-b border-gray-500 transition-colors hover:text-white"
                  >{{ link.text }}</a
                ><span v-if="idx < cat.links.length - 1">, </span>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT THIS SECOND BRAIN -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">
          About This Second Brain
        </h2>
        <p class="max-w-3xl leading-relaxed text-gray-300">
          For the quality of these notes and what to expect, check out the
          <a
            href="#"
            class="border-b border-gray-400 transition-colors hover:text-white"
            >Disclaimer</a
          >. Otherwise, learn more about the principles behind this knowledge
          vault and how it's organized to provide lasting value.
        </p>

        <div class="grid gap-6 sm:grid-cols-3">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="flex flex-col rounded-xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
          >
            <div class="mb-4 text-2xl">{{ pillar.icon }}</div>
            <h3 class="mb-3 text-xl font-bold text-sky-200">
              {{ pillar.title }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-300">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- RECENT NOTES -->
      <section class="space-y-8">
        <h2 class="text-2xl font-bold text-rose-400">Recent Notes</h2>

        <div class="flex flex-col space-y-4">
          <NuxtLink
            v-for="note in notes"
            :key="note.path"
            :to="note.path"
            class="group flex flex-col gap-2 py-2 transition-colors sm:flex-row sm:items-center sm:gap-6"
          >
            <span class="text-sm whitespace-nowrap text-gray-400">{{
              formatDate(note.meta?.date || note.date)
            }}</span>
            <span
              class="border-b border-transparent text-base font-medium text-gray-300 transition-all group-hover:border-gray-400 group-hover:text-white"
            >
              {{ note.title }}
            </span>
          </NuxtLink>

          <div v-if="!notes?.length" class="py-10 text-center">
            <p class="text-lg text-gray-400">No notes available right now.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
