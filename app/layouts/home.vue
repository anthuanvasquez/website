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
        <NuxtPage />
        <Chatbot />
      </main>
      <Footer />
    </Body>
  </Html>
</template>
