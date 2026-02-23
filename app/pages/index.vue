<template>
  <div class="relative flex min-h-screen items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <!-- Left content -->
        <div class="max-w-2xl text-left lg:pr-8">
          <p class="mb-4 inline-flex items-center text-lg font-medium text-[var(--text-secondary)]">
            Hey, I'm Anthuan <span class="ml-2 text-2xl">👋</span>
          </p>
          <h1 class="mb-6 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span class="block text-[var(--color-primary)]">Full-Stack</span>
            <span class="block text-[var(--text-primary)]">Engineer</span>
          </h1>
          <p class="mb-10 max-w-xl text-lg leading-relaxed font-normal text-[var(--text-secondary)] sm:text-xl">
            I'm a Full-Stack JavaScript Engineer living in DR, and I focus on making digital experiences that are easy to use, enjoyable, and get the job done.
          </p>

          <div class="flex gap-4 sm:flex-row flex-col">
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
          </div>
        </div>

        <!-- Right content (Image) -->
        <div class="mt-12 flex relative justify-center lg:mt-0 lg:justify-end">
          <div class="relative h-72 w-72 sm:h-96 sm:w-96 lg:h-[450px] lg:w-[450px]">
            <!-- Decorative outer ring -->
            <div class="absolute inset-0 scale-[1.15] animate-[spin_60s_linear_infinite] rounded-full border border-[var(--color-primary)]/30"></div>

            <!-- Image container -->
            <div class="relative h-full w-full overflow-hidden rounded-full border-4 border-[var(--surface-base)] bg-[var(--surface-elevated)] shadow-2xl">
              <NuxtImg
                src="/me.jpg"
                alt="Anthuan Vasquez"
                class="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                sizes="sm:100vw md:50vw lg:400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Section title="Knowledge" subtitle="A Vast Of">
    <Skills />
  </Section>

  <Section title="Experiences" subtitle="Latest">
    <Experiences />
  </Section>

  <Section title="Projects" subtitle="Built">
    <Projects />
  </Section>

  <Section title="I Can Do" subtitle="What">
    <Services />
  </Section>

  <div class="container mx-auto pb-20">
    <div
      class="relative h-full rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-white/5 p-8 text-center"
    >
      <MapRD />
    </div>
  </div>
</template>
