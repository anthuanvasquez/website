<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';
import LangSwitcher from './LangSwitcher.vue';

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
</script>

<template>
  <motion.div
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
  >
    <header
      class="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300"
    >
      <div class="mx-auto max-w-7xl">
        <nav
          class="flex items-center justify-between rounded-full bg-[var(--surface-elevated)]/70 px-6 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a
              href="/"
              class="-m-1.5 p-1.5 transition-opacity hover:opacity-80"
            >
              <span
                class="font-firacode text-xl font-bold text-[var(--color-primary)]"
                >//AV</span
              >
            </a>
          </div>

          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--text-secondary)] transition-colors hover:text-white"
              @click="mobileMenuOpen = true"
            >
              <span class="sr-only">Open main menu</span>
              <UIcon name="i-lucide-menu" class="size-6" aria-hidden="true" />
            </button>
          </div>

          <div class="hidden lg:flex lg:items-center lg:gap-x-8">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              :target="item.href.includes('http') ? '_blank' : '_self'"
            >
              {{ item.name }}
            </a>

            <div class="h-4 w-px bg-white/10"></div>
            <LangSwitcher />
          </div>
        </nav>

        <!-- Bottom Sub Navigation (Sections) -->
        <nav
          class="no-scrollbar mx-auto mt-2 flex w-full max-w-xl items-center justify-start overflow-x-auto rounded-full bg-[var(--surface-elevated)]/80 px-6 py-2.5 shadow-lg ring-1 ring-white/5 backdrop-blur-md md:w-auto md:justify-center lg:gap-x-8"
          aria-label="Section Navigation"
        >
          <div class="flex items-center gap-x-6">
            <a
              v-for="item in subNavigation"
              :key="item.name"
              :href="item.href"
              class="font-firacode text-xs font-medium tracking-widest whitespace-nowrap text-[var(--text-tertiary)] uppercase transition-colors hover:text-[var(--text-primary)] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
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
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--surface-base)] p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span
                class="font-firacode text-xl font-bold text-[var(--color-primary)]"
                >//AV</span
              >
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-[var(--text-secondary)] transition-colors hover:text-white"
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
                  class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-white"
                >
                  {{ item.name }}
                </a>
              </div>

              <!-- Sections Navigation -->
              <div class="space-y-2 py-6">
                <span
                  class="font-firacode mb-4 block px-3 text-xs tracking-widest text-[var(--text-tertiary)] uppercase"
                  >Sections</span
                >
                <a
                  v-for="item in subNavigation"
                  :key="item.name"
                  :href="item.href"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--color-primary)]"
                >
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </motion.div>
</template>
