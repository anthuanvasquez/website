<template>
  <div
    class="relative flex min-h-screen items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24"
  >
    <div class="container mx-auto max-w-7xl px-4 md:px-0">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <!-- Left content -->
        <div class="max-w-2xl text-left lg:pr-8">
          <Motion
            as="div"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <p
              class="mb-4 inline-flex items-center text-lg font-medium text-[var(--text-secondary)]"
            >
              Hey, I'm Anthuan <span class="ml-2 text-2xl">👋</span>
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
              <span class="block text-[var(--color-primary)]">Full-Stack</span>
              <span class="block text-[var(--text-primary)]">Engineer</span>
            </h1>
          </Motion>
          <Motion
            as="div"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: 0.3 }"
          >
            <p
              class="mb-10 max-w-xl text-lg leading-relaxed font-normal text-[var(--text-secondary)] sm:text-xl"
            >
              A Full-Stack Engineer living in DR, and I focus on making digital
              experiences that are easy to use, enjoyable, and get the job done.
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
              class="justify-center rounded-xl px-8 py-3 text-base font-semibold"
            >
              Get In Touch
            </UButton>
            <UButton
              size="lg"
              color="neutral"
              variant="outline"
              class="justify-center rounded-xl px-8 py-3 text-base font-semibold ring-1 ring-[var(--text-tertiary)] hover:bg-[var(--surface-elevated)]"
            >
              Browse Projects
            </UButton>
          </Motion>
        </div>

        <!-- Right content (Image) -->
        <Motion
          as="div"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.7, ease: 'easeOut' }"
          class="relative mt-12 flex justify-center lg:mt-0 lg:justify-end"
        >
          <div
            class="relative h-72 w-72 sm:h-96 sm:w-96 lg:h-[450px] lg:w-[450px]"
          >
            <!-- Decorative outer ring -->
            <div
              class="absolute inset-0 scale-[1.15] animate-[spin_60s_linear_infinite] rounded-full border border-[var(--color-primary)]/30"
            ></div>

            <!-- Image container -->
            <div
              class="relative h-full w-full overflow-hidden rounded-full border-4 border-[var(--surface-base)] bg-[var(--surface-elevated)] shadow-2xl"
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
  </div>

  <Section id="knowledge" title="Knowledge" subtitle="A Vast Of">
    <Skills />
  </Section>

  <Section id="experiences" title="Experiences" subtitle="Latest">
    <Experiences />
  </Section>

  <Section id="projects" title="Projects" subtitle="Built">
    <Projects />
  </Section>

  <Section id="services" title="I Can Do" subtitle="What">
    <Services />
  </Section>

  <Section id="location" title="Where I'm Based" subtitle="Location">
    <div class="container mx-auto max-w-7xl px-4 pb-20 md:px-0">
      <p
        class="mx-auto mb-12 max-w-2xl text-center leading-relaxed font-normal text-[var(--text-secondary)]"
      >
        I'm proudly located in the Dominican Republic, right in the heart of the
        Caribbean. From this tropical paradise, I collaborate with clients
        across time zones — bringing a global perspective and timely delivery to
        every project.
      </p>
      <div
        class="relative h-[500px] w-full overflow-hidden rounded-2xl bg-[var(--surface-base)] shadow-sm ring-1 ring-white/10 transition-all hover:ring-[var(--color-primary)]/50"
      >
        <MapRD />
      </div>
    </div>
  </Section>
</template>
