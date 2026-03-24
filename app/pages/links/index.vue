<script setup lang="ts">
const profile = {
  name: 'Anthuan Vásquez',
  title: 'Full Stack Engineer',
  location: 'Dominican Republic',
  bio: 'Building polished, innovative web experiences. Passionate about UI/UX and modern web technologies.',
  image: 'https://github.com/anthuanvasquez.png',
  handle: '@anthuanvasquez',
};

const resumeLink =
  'https://docs.google.com/document/d/e/2PACX-1vQVSF3BtZPxneS-ceNizZ1ai4s9sRpMT39al5b-GA4OjiVWR6OOHP1qFPsq83WsJn34-mArGZC9FFYy/pub';

const links = [
  {
    label: 'Check Out My Latest Projects',
    url: '/#projects',
    icon: 'i-lucide-briefcase',
  },
  {
    label: 'Read My Tech Blog',
    url: '/blog',
    icon: 'i-lucide-book-open',
  },
  {
    label: 'Contact Me',
    url: 'mailto:me@anthuanvasquez.net',
    icon: 'i-lucide-mail',
  },
  {
    label: 'Download My Resume',
    url: resumeLink,
    icon: 'i-lucide-file-text',
  },
];

const socials = [
  { icon: 'i-simple-icons-github', url: 'https://github.com/anthuanvasquez' },
  {
    icon: 'i-simple-icons-linkedin',
    url: 'https://linkedin.com/in/anthuanvasquez',
  },
  { icon: 'i-simple-icons-x', url: 'https://x.com/anthuanvasquezm' },
  {
    icon: 'i-simple-icons-instagram',
    url: 'https://instagram.com/anthuanvasquezm',
  },
];

useHead({
  title: 'Links | Anthuan Vásquez',
  meta: [
    {
      name: 'description',
      content:
        'Connect with Anthuan Vásquez. Find all my important links, social profiles, and latest updates in one place.',
    },
  ],
});
</script>

<template>
  <div
    class="flex min-h-screen w-full flex-col items-center px-4 py-16 font-sans text-(--text-primary)"
  >
    <div
      class="pointer-events-none fixed top-0 left-0 z-0 h-full w-full overflow-hidden"
    >
      <div
        class="absolute top-[-10%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-900/20 blur-[120px]"
      ></div>
    </div>

    <div
      class="animate-fade-in relative z-10 flex w-full max-w-md flex-col items-center gap-8"
    >
      <div class="flex flex-col items-center gap-4 text-center">
        <div class="group relative">
          <div
            class="absolute -inset-0.5 rounded-full bg-linear-to-r from-(--color-tertiary) to-(--color-primary) opacity-75 blur-sm transition duration-500 group-hover:opacity-100"
          ></div>
          <NuxtImg
            :src="profile.image"
            :alt="profile.name"
            class="relative h-28 w-28 rounded-full border-2 border-[#0a0a0a] object-cover shadow-xl"
            width="112"
            height="112"
          />
        </div>

        <div class="space-y-1">
          <h1 class="text-2xl font-bold tracking-tight text-(--text-primary)">
            {{ profile.name }}
          </h1>
          <p class="text-sm font-medium text-(--text-secondary)">
            {{ profile.title }} <span class="mx-1">·</span>
            {{ profile.location }}
          </p>
        </div>

        <p
          class="max-w-[90%] text-center text-sm leading-relaxed text-(--text-secondary)"
        >
          {{ profile.bio }} <br />
          <a
            href="https://github.com/anthuanvasquez"
            class="mt-2 inline-block text-blue-400 transition-colors hover:text-blue-300"
            >{{ profile.handle }}</a
          >
        </p>
      </div>

      <!-- Links Section -->
      <div class="flex w-full flex-col gap-4">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98]"
        >
          <div class="flex items-center gap-4">
            <!-- Optional Icon for each link if desired, currently hidden based on ref image style but data is there -->
            <!-- <UIcon :name="link.icon" class="w-5 h-5 text-(--text-secondary) group-hover:text-white transition-colors" /> -->
            <span
              class="font-medium text-(--text-primary) transition-colors group-hover:text-(--text-primary)"
              >{{ link.label }}</span
            >
          </div>

          <UIcon
            name="i-lucide-arrow-up-right"
            class="h-5 w-5 text-(--text-tertiary) transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--text-primary)"
          />
        </a>
      </div>

      <!-- Social Icons -->
      <div class="mt-4 flex items-center gap-6">
        <a
          v-for="(social, index) in socials"
          :key="index"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center rounded-full border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-110 hover:border-white/20 hover:bg-white/15"
          :aria-label="social.icon"
        >
          <UIcon
            :name="social.icon"
            class="h-6 w-6 text-(--text-secondary) transition-colors group-hover:text-(--text-primary)"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
