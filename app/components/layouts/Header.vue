<script setup lang="ts">
import { navigationData } from '~/data';

const route = useRoute();
const isLinksPage = computed(() => route.path === '/links');
const mobileMenuOpen = ref(false);
</script>

<template>
  <header
    v-if="!isLinksPage"
    class="motion-safe:animate-enter-down fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300"
  >
    <div class="mx-auto max-w-7xl">
      <div class="grid transition-all duration-300 ease-in-out">
        <div class="overflow-hidden">
          <nav
            class="bg-surface-elevated/70 mb-2 flex items-center justify-between rounded-full px-6 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
            aria-label="Global"
          >
            <div class="flex lg:flex-1">
              <NuxtLink
                to="/"
                class="-m-1.5 p-1.5 transition-opacity hover:opacity-80"
                aria-label="Anthuan Vásquez - Home"
              >
                <span class="text-primary font-firacode text-xl font-bold"
                  >{{ '<av />' }}</span
                >
              </NuxtLink>
            </div>

            <div class="flex lg:hidden">
              <button
                type="button"
                class="text-text-secondary hover:text-text-primary focus-visible:ring-primary -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Open main menu"
                @click="mobileMenuOpen = true"
              >
                <span class="sr-only">Open main menu</span>
                <UIcon name="i-lucide-menu" class="size-6" aria-hidden="true" />
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
                  class="text-text-secondary hover:text-text-primary focus-visible:ring-primary flex items-center gap-x-2 rounded-md px-1 text-sm font-medium transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] focus-visible:ring-2 focus-visible:outline-none"
                >
                  <UIcon v-if="item.icon" :name="item.icon" class="size-4" />
                  {{ item.name }}
                </NuxtLink>

                <a
                  v-else
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-secondary hover:text-text-primary focus-visible:ring-primary flex items-center gap-x-2 rounded-md px-1 text-sm font-medium transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] focus-visible:ring-2 focus-visible:outline-none"
                  :aria-label="item.name"
                  :title="item.name"
                >
                  <UIcon v-if="item.icon" :name="item.icon" class="size-4" />
                  <span class="sr-only">(opens in new tab)</span>
                </a>
              </template>

              <div class="ml-2 h-4 w-px bg-white/10"></div>

              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      <USlideover
        v-model:open="mobileMenuOpen"
        side="right"
        :close="false"
        class="lg:hidden"
        :ui="{
          content:
            'bg-surface-base fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10',
        }"
      >
        <template #content>
          <div class="flex items-center justify-between">
            <NuxtLink
              to="/"
              class="-m-1.5 p-1.5"
              aria-label="Anthuan Vásquez - Home"
              @click="mobileMenuOpen = false"
            >
              <span class="text-primary font-firacode text-xl font-bold"
                >{{ '<av />' }}</span
              >
            </NuxtLink>

            <div class="flex items-center gap-x-3">
              <ThemeToggle />
              <button
                type="button"
                class="text-text-secondary hover:text-text-primary focus-visible:ring-primary -m-2.5 rounded-md p-2.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Close menu"
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
                  @click="mobileMenuOpen = false"
                >
                  <UIcon v-if="item.icon" :name="item.icon" class="size-5" />
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
        </template>
      </USlideover>
    </div>
  </header>
</template>
