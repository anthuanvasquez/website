<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';
import { navigationData } from '~/data';

const route = useRoute();
const isLinksPage = computed(() => route.path === '/links');
const isBlogPage = computed(() => route.path.startsWith('/blog'));
const isBrainPage = computed(() => route.path.startsWith('/brain'));

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
              class="bg-surface-elevated/70 mb-2 flex items-center justify-between rounded-full px-6 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
              aria-label="Global"
            >
              <div class="flex lg:flex-1">
                <NuxtLink
                  to="/"
                  class="-m-1.5 p-1.5 transition-opacity hover:opacity-80"
                >
                  <span class="text-primary font-firacode text-xl font-bold"
                    >{{ '<AV />' }}</span
                  >
                </NuxtLink>
              </div>

              <div class="flex lg:hidden">
                <button
                  type="button"
                  class="text-text-secondary hover:text-text-primary -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors"
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
                <template
                  v-for="item in navigationData.mainNavigation"
                  :key="item.name"
                >
                  <NuxtLink
                    v-if="!item.external"
                    :to="item.href"
                    class="text-text-secondary hover:text-text-primary flex items-center gap-x-2 text-sm font-medium transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <UIcon v-if="item.icon" :name="item.icon" class="size-4" />
                    {{ item.name }}
                  </NuxtLink>

                  <a
                    v-else
                    :href="item.href"
                    target="_blank"
                    class="text-text-secondary hover:text-text-primary flex items-center gap-x-2 text-sm font-medium transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <UIcon v-if="item.icon" :name="item.icon" class="size-4" />
                    {{ item.name }}
                  </a>
                </template>

                <div class="ml-2 h-4 w-px bg-white/10"></div>

                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>

        <!-- Bottom Sub Navigation (Sections) -->
        <nav
          v-if="!isBlogPage && !isBrainPage"
          :class="[
            'no-scrollbar bg-surface-elevated/80 mx-auto flex w-full max-w-xl origin-top items-center justify-start overflow-x-auto rounded-full px-6 py-2.5 shadow-lg ring-1 ring-white/5 backdrop-blur-md transition-all duration-300 ease-in-out md:w-auto md:justify-center lg:gap-x-8',
            isScrolled
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0',
          ]"
          aria-label="Section Navigation"
        >
          <div class="flex items-center gap-x-6">
            <a
              v-for="item in navigationData.subNavigation"
              :key="item.name"
              :href="item.href"
              class="font-firacode text-text-tertiary hover:text-text-primary text-xs font-medium tracking-widest whitespace-nowrap uppercase transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
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
        <div class="bg-surface-base/60 fixed inset-0 z-50 backdrop-blur-sm" />

        <DialogPanel
          class="bg-surface-base fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="text-primary font-firacode text-xl font-bold"
                >{{ '<av />' }}</span
              >
            </a>

            <div class="flex items-center gap-x-3">
              <ThemeToggle />
              <button
                type="button"
                class="text-text-secondary hover:text-text-primary -m-2.5 rounded-md p-2.5 transition-colors"
                @click="mobileMenuOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <UIcon name="i-lucide-x" class="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-white/10">
              <!-- Main Navigation -->
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigationData.mainNavigation"
                  :key="item.name"
                  :href="item.href"
                  class="text-text-secondary hover:bg-surface-elevated hover:text-text-primary -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base leading-7 font-medium transition-colors"
                >
                  <UIcon v-if="item.icon" :name="item.icon" class="size-5" />
                  {{ item.name }}
                </a>
              </div>

              <!-- Sections Navigation -->
              <div v-if="!isBlogPage" class="space-y-2 py-6">
                <span
                  class="font-firacode text-text-tertiary mb-4 block px-3 text-xs tracking-widest uppercase"
                  >Sections</span
                >
                <a
                  v-for="item in navigationData.subNavigation"
                  :key="item.name"
                  :href="item.href"
                  @click="mobileMenuOpen = false"
                  class="text-text-secondary hover:bg-surface-elevated hover:text-primary -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-medium transition-colors"
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
