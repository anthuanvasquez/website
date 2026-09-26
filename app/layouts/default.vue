<template>
  <Html lang="en">
    <Body>
      <a
        href="#main-content"
        class="focus:bg-primary focus:ring-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:font-semibold focus:text-black focus:shadow-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" class="min-h-screen">
        <div
          class="bg-surface-base relative min-h-screen overflow-hidden pt-32 pb-24"
        >
          <div
            class="from-primary/20 via-surface-base to-surface-base absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]"
          ></div>
          <div class="relative mx-auto max-w-4xl px-6 sm:px-12 lg:px-8">
            <NuxtPage />
            <Chatbot />
          </div>
        </div>
      </main>
      <Footer />
    </Body>
  </Html>
</template>
