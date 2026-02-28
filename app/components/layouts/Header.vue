<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';

const route = useRoute();
const isLinksPage = computed(() => route.path === '/links');
const isBlogPage = computed(() => route.path.startsWith('/blog'));

const navigation = [
  { name: 'Resume', href: '/anthuan_vasquez_resume.pdf' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anthuanvasquez/' },
  { name: 'GitHub', href: 'https://github.com/anthuanvasquez' },
];

const subNavigation = [
  { name: 'Knowledge', href: '#knowledge' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Location', href: '#location' },
];

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <Motion
    v-if="!isLinksPage"
    as="div"
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
  >
    <header
      class="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300"
    >
      <div class="mx-auto max-w-7xl">
        <div
          :class="[
            'grid transition-all duration-300 ease-in-out',
            isScrolled
              ? 'pointer-events-none -translate-y-2 grid-rows-[0fr] opacity-0'
              : 'translate-y-0 grid-rows-[1fr] opacity-100',
          ]"
        >
          <div class="overflow-hidden">
            <nav
              class="mb-2 flex items-center justify-between rounded-full bg-(--surface-elevated)/70 px-6 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
              aria-label="Global"
            >
              <div class="flex lg:flex-1">
                <a
                  href="/"
                  class="-m-1.5 p-1.5 transition-opacity hover:opacity-80"
                >
                  <span class="text-primary font-firacode text-xl font-bold"
                    >{{ '<av />' }}</span
                  >
                </a>
              </div>

              <div class="flex lg:hidden">
                <button
                  type="button"
                  class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-(--text-secondary) transition-colors hover:text-white"
                  @click="mobileMenuOpen = true"
                >
                  <span class="sr-only">Open main menu</span>
                  <UIcon
                    name="i-lucide-menu"
                    class="size-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div class="hidden lg:flex lg:items-center lg:gap-x-8">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="text-sm font-medium text-(--text-secondary) transition-colors hover:text-(--text-primary) hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  :target="item.href.includes('http') ? '_blank' : '_self'"
                >
                  {{ item.name }}
                </a>

                <div class="h-4 w-px bg-white/10"></div>
                <LangSwitcher />
              </div>
            </nav>
          </div>
        </div>

        <!-- Bottom Sub Navigation (Sections) -->
        <nav
          v-if="!isBlogPage"
          class="no-scrollbar mx-auto flex w-full max-w-xl origin-top items-center justify-start overflow-x-auto rounded-full bg-(--surface-elevated)/80 px-6 py-2.5 shadow-lg ring-1 ring-white/5 backdrop-blur-md transition-transform duration-300 ease-in-out md:w-auto md:justify-center lg:gap-x-8"
          aria-label="Section Navigation"
        >
          <div class="flex items-center gap-x-6">
            <a
              v-for="item in subNavigation"
              :key="item.name"
              :href="item.href"
              class="font-firacode text-xs font-medium tracking-widest whitespace-nowrap text-(--text-tertiary) uppercase transition-colors hover:text-(--text-primary) hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              {{ item.name }}
            </a>
          </div>
        </nav>
      </div>

      <Dialog
        :open="mobileMenuOpen"
        as="div"
        class="lg:hidden"
        @close="mobileMenuOpen = false"
      >
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-(--surface-base) p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="text-primary font-firacode text-xl font-bold">{{ '<av />' }}</span>
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-(--text-secondary) transition-colors hover:text-white"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <UIcon name="i-lucide-x" class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-white/10">
              <!-- Main Navigation -->
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium text-(--text-secondary) transition-colors hover:bg-(--surface-elevated) hover:text-white"
                >
                  {{ item.name }}
                </a>
              </div>

              <!-- Sections Navigation -->
              <div v-if="!isBlogPage" class="space-y-2 py-6">
                <span
                  class="font-firacode mb-4 block px-3 text-xs tracking-widest text-(--text-tertiary) uppercase"
                  >Sections</span
                >
                <a
                  v-for="item in subNavigation"
                  :key="item.name"
                  :href="item.href"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium text-(--text-secondary) transition-colors hover:bg-(--surface-elevated) hover:text-(--color-primary)"
                >
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </Motion>
</template>
