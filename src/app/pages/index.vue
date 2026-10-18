<script setup lang="ts">
import { ref } from 'vue';
import { homePageData, globalData } from '~/data';
import type { ContentItem } from '~/types';

const copied = ref(false);

const [{ data: blogPosts }, { data: brainNotes }] = await Promise.all([
  useAPI<ContentItem[]>('/api/blog'),
  useAPI<ContentItem[]>('/api/brain'),
]);

const latestPosts = computed(() =>
  (blogPosts.value || []).filter((post) => post.published !== false).slice(0, 3)
);

const latestNotes = computed(() =>
  (brainNotes.value || [])
    .filter((note) => note.published !== false)
    .slice(0, 4)
);

/**
 * Copy email address to clipboard. Notify after copy.
 */
const copyEmailAddress = () => {
  const email = useEnv().emailAddress;
  if (!email) {
    useToast().add({
      title: 'Error',
      description: 'No email address configured',
      color: 'error',
    });
    return;
  }

  navigator.clipboard.writeText(email);
  copied.value = true;
  useToast().add({
    title: globalData.copyEmail.successTitle,
    description: globalData.copyEmail.successDescription,
    color: 'primary',
  });

  setTimeout(() => {
    copied.value = false;
  }, 3000);
};

definePageMeta({
  layout: 'home',
});
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24"
  >
    <div class="mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-0">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Left Column: Dual-Tone Headline & Actions -->
        <div class="m-auto max-w-2xl text-left lg:m-0 lg:pr-4">
          <!-- Dual-Tone Headline -->
          <div
            class="motion-safe:animate-enter-left"
            style="animation-delay: 200ms"
          >
            <h1
              class="mb-6 font-sans text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
            >
              <span class="text-text-primary block">{{
                homePageData.hero.headlineLine
              }}</span>
              <span class="text-text-muted">
                {{ homePageData.hero.headlineTail }}
              </span>
            </h1>
          </div>

          <!-- Description -->
          <div
            class="motion-safe:animate-enter-left"
            style="animation-delay: 300ms"
          >
            <p
              class="text-text-secondary mb-10 max-w-xl text-lg leading-relaxed font-normal sm:text-xl"
            >
              {{ homePageData.hero.description }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div
            class="motion-safe:animate-enter-up flex flex-col gap-4 sm:flex-row"
            style="animation-delay: 400ms"
          >
            <!-- Primary Action: Copy Email -->
            <!-- Primary Action: Copy Email -->
            <UButton
              color="primary"
              variant="solid"
              class="btn-primary"
              @click="copyEmailAddress"
            >
              <UIcon
                :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                class="size-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>
                {{
                  copied
                    ? globalData.copyEmail.buttonCopied
                    : globalData.copyEmail.buttonDefault
                }}
              </span>
            </UButton>

            <!-- Secondary Action: See what I've Built -->
            <UButton
              to="#projects"
              color="neutral"
              variant="outline"
              class="btn-secondary group"
            >
              <span>{{ homePageData.hero.secondaryButton }}</span>
              <UIcon
                name="i-lucide-arrow-down"
                class="text-text-tertiary group-hover:text-primary size-4.5 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </UButton>
          </div>
        </div>

        <!-- Right Column: Editorial Hero Artwork (Unboxed centerpiece) -->
        <div
          class="motion-safe:animate-enter-scale relative mt-12 flex justify-center lg:mt-0 lg:justify-end"
        >
          <div class="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <!-- Luminous ambient multi-color glow -->
            <div
              class="from-primary/30 via-tertiary/25 to-secondary/30 rounded-6xl pointer-events-none absolute -inset-6 -z-10 bg-linear-to-tr opacity-60 blur-3xl transition-opacity duration-700 hover:opacity-85"
            ></div>

            <!-- Free-standing editorial frame: tall aspect, soft squircle, no card border box -->
            <div
              class="ring-border-subtle hover:ring-primary/50 group rounded-5xl relative aspect-4/5 w-full overflow-hidden shadow-2xl ring-1 transition-all duration-500 ease-out hover:scale-102"
            >
              <NuxtImg
                src="/yo.jpeg"
                alt="Anthuan Vásquez"
                class="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 460px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll down indicator -->
    <a
      href="#projects"
      class="motion-safe:animate-enter-up text-text-tertiary hover:text-primary absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center justify-center transition-colors"
      style="animation-delay: 600ms"
      aria-label="Scroll down to next section"
    >
      <UIcon
        name="i-lucide-arrow-down"
        class="size-8 motion-safe:animate-bounce"
        aria-hidden="true"
      />
    </a>
  </div>

  <Section
    id="projects"
    :title="homePageData.sections.projects.title"
    :subtitle="homePageData.sections.projects.subtitle"
  >
    <Projects />
  </Section>

  <Section
    v-if="latestPosts.length > 0"
    id="blog"
    :title="homePageData.sections.blog.title"
    :subtitle="homePageData.sections.blog.subtitle"
  >
    <BlogPosts :posts="latestPosts" />
  </Section>

  <Section
    v-if="latestNotes.length > 0"
    id="brain"
    :title="homePageData.sections.brain.title"
    :subtitle="homePageData.sections.brain.subtitle"
  >
    <BrainNotes :notes="latestNotes" />
  </Section>

  <Section
    id="location"
    :title="homePageData.sections.location.title"
    :subtitle="homePageData.sections.location.subtitle"
  >
    <div class="mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-0">
      <p
        class="text-text-secondary mx-auto mb-12 max-w-2xl text-center leading-relaxed font-normal"
      >
        {{ homePageData.sections.location.description }}
      </p>
      <div
        class="hover:ring-primary/50 bg-surface-base ring-border-subtle relative h-125 w-full overflow-hidden rounded-2xl shadow-sm ring-1 transition-all"
      >
        <MapRD />
      </div>

      <!-- Places to Visit Grid -->
      <div class="mt-14">
        <div
          class="mb-8 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p
              class="font-firacode text-text-tertiary text-xs tracking-widest uppercase"
            >
              // {{ homePageData.sections.location.placesHeading }}
            </p>
            <p class="text-text-secondary mt-1 text-sm sm:text-base">
              {{ homePageData.sections.location.placesSubtitle }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <a
            v-for="place in homePageData.sections.location.places"
            :key="place.name"
            :href="place.href"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'group relative flex flex-col justify-between rounded-2xl p-6 ring-1 transition-all duration-300 hover:-translate-y-1',
              place.isHomeBase
                ? 'bg-surface-elevated ring-primary/50 hover:bg-surface-float hover:ring-primary shadow-primary/5 shadow-lg'
                : 'bg-surface-elevated/50 ring-border-subtle hover:bg-surface-float hover:ring-primary/30',
            ]"
          >
            <div>
              <div class="mb-4 flex items-center justify-between gap-2">
                <span class="font-firacode text-text-tertiary text-xs">
                  {{ place.region }}
                </span>

                <span
                  v-if="place.isHomeBase"
                  class="font-firacode bg-primary/15 text-primary ring-primary/30 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1"
                >
                  <span
                    class="bg-primary size-1.5 animate-pulse rounded-full"
                    aria-hidden="true"
                  ></span>
                  {{ place.badge }}
                </span>

                <UIcon
                  v-else
                  name="i-lucide-arrow-up-right"
                  class="text-text-tertiary group-hover:text-primary size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>

              <div class="flex items-center justify-between gap-2">
                <h3
                  class="text-xl font-bold tracking-tight transition-colors"
                  :class="
                    place.isHomeBase
                      ? 'text-primary'
                      : 'text-text-primary group-hover:text-primary'
                  "
                >
                  {{ place.name }}
                </h3>

                <UIcon
                  v-if="place.isHomeBase"
                  name="i-lucide-arrow-up-right"
                  class="text-primary size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>

              <p
                class="text-text-secondary mt-3 text-sm leading-relaxed font-normal"
              >
                {{ place.description }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Section>
</template>

<style scoped>
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.wave-hand {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: wave 2.5s infinite;
}
</style>
