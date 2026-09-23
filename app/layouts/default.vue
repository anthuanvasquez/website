<template>
  <Html lang="en">
    <Body>
      <Header />
      <main class="min-h-screen">
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
