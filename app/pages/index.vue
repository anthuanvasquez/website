<script setup lang="ts">
import { ref } from 'vue';
import { homePageData, globalData } from '~/data';

const copied = ref(false);

/**
 * Copy email address to clipboard. Notify after copy.
 */
const copyEmailAddress = () => {
  const email = useRuntimeConfig().public.emailAddress as string;
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
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24"
  >
    <div class="container mx-auto max-w-7xl px-4 md:px-0">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div class="max-w-2xl text-left lg:pr-8">
          <Motion
            as="div"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <p
              class="wave-container text-text-secondary mb-4 inline-flex items-center text-lg font-medium"
            >
              {{ homePageData.hero.greeting }}
              <span class="wave-hand ml-2 text-2xl">{{
                homePageData.hero.emoji
              }}</span>
            </p>
          </Motion>
          <Motion
            as="div"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <h1
              class="mb-6 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
            >
              <span class="text-primary block">{{
                homePageData.hero.roleLine1
              }}</span>
              <span class="text-primary block">{{
                homePageData.hero.roleLine2
              }}</span>
            </h1>
          </Motion>
          <Motion
            as="div"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.3 }"
          >
            <p
              class="text-text-secondary mb-10 max-w-xl text-lg leading-relaxed font-normal sm:text-xl"
            >
              {{ homePageData.hero.description }}
            </p>
          </Motion>

          <Motion
            as="div"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.4 }"
            class="flex flex-col gap-4 sm:flex-row"
          >
            <UButton
              size="lg"
              color="primary"
              variant="solid"
              class="justify-center rounded-xl px-8 py-3 text-base font-semibold transition-transform hover:scale-105"
              @click="copyEmailAddress"
            >
              {{
                copied
                  ? globalData.copyEmail.buttonCopied
                  : globalData.copyEmail.buttonDefault
              }}
            </UButton>
            <UButton
              to="#projects"
              size="lg"
              color="neutral"
              variant="outline"
              class="ring-text-tertiary hover:bg-surface-elevated justify-center rounded-xl px-8 py-3 text-base font-semibold ring-1"
            >
              {{ homePageData.hero.secondaryButton }}
            </UButton>
          </Motion>
        </div>

        <Motion
          as="div"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.7, ease: 'easeOut' }"
          class="relative mt-12 flex justify-center lg:mt-0 lg:justify-end"
        >
          <div
            class="group relative h-72 w-72 sm:h-96 sm:w-96 lg:h-[450px] lg:w-[450px]"
          >
            <!-- Ambient blurred glow (animated on hover) -->
            <div
              class="from-primary via-tertiary to-secondary absolute inset-0 scale-[1.05] rounded-full bg-linear-to-tr opacity-30 blur-2xl transition-all duration-700 ease-out group-hover:scale-[1.1] group-hover:opacity-60 group-hover:blur-3xl"
            ></div>

            <div
              class="ring-border-subtle bg-surface-elevated group-hover:ring-primary/50 relative h-full w-full overflow-hidden rounded-full shadow-2xl ring-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            >
              <NuxtImg
                src="/yo.jpeg"
                alt="Anthuan Vasquez"
                class="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                sizes="sm:100vw md:50vw lg:400px"
              />
            </div>
          </div>
        </Motion>
      </div>
    </div>

    <!-- Scroll down indicator -->
    <Motion
      as="a"
      href="#knowledge"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.6, ease: 'easeOut' }"
      class="text-text-tertiary hover:text-primary absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center justify-center transition-colors"
      aria-label="Scroll down to next section"
    >
      <UIcon name="i-lucide-arrow-down" class="size-8 animate-bounce" />
    </Motion>
  </div>

  <Section
    id="knowledge"
    :title="homePageData.sections.knowledge.title"
    :subtitle="homePageData.sections.knowledge.subtitle"
  >
    <Skills />
  </Section>

  <Section
    id="experiences"
    :title="homePageData.sections.experiences.title"
    :subtitle="homePageData.sections.experiences.subtitle"
  >
    <Experiences />

    <p
      class="experience-animate text-text-secondary mx-auto mt-12 max-w-lg text-center text-sm leading-relaxed font-normal italic"
    >
      {{ homePageData.sections.experiences.footerNote }}
    </p>
  </Section>

  <Section
    id="projects"
    :title="homePageData.sections.projects.title"
    :subtitle="homePageData.sections.projects.subtitle"
  >
    <Projects />
  </Section>

  <Section
    id="services"
    :title="homePageData.sections.services.title"
    :subtitle="homePageData.sections.services.subtitle"
  >
    <Services />
  </Section>

  <Section
    id="location"
    :title="homePageData.sections.location.title"
    :subtitle="homePageData.sections.location.subtitle"
  >
    <div class="container mx-auto max-w-7xl px-4 md:px-0">
      <p
        class="text-text-secondary mx-auto mb-12 max-w-2xl text-center leading-relaxed font-normal"
      >
        {{ homePageData.sections.location.description }}
      </p>
      <div
        class="hover:ring-primary/50 bg-surface-base relative h-[500px] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-white/10 transition-all"
      >
        <MapRD />
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
