<script setup lang="ts">
import { ref } from 'vue';

const copied = ref(false);

/**
 * Copy email address to clipboard. Notify after copy.
 */
const copyEmailAddress = () => {
  const email = useRuntimeConfig().public.emailAddress as string;
  navigator.clipboard.writeText(email);
  copied.value = true;
  useToast().add({
    title: 'Success',
    description: 'Email copied to clipboard',
    color: 'primary',
  });

  setTimeout(() => {
    copied.value = false;
  }, 3000);
};
</script>

<template>
  <footer id="footer" class="border-surface-elevated mt-20 border-t py-12">
    <div class="container mx-auto max-w-7xl px-4 md:px-0">
      <div
        class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end"
      >
        <div class="flex flex-col text-center md:text-left">
          <h2 class="text-text-primary mb-6 text-3xl font-bold tracking-tight">
            Interested in working together<span class="text-primary">?</span>
          </h2>

          <div class="flex items-center justify-center gap-4 md:justify-start">
            <UButton
              color="primary"
              variant="solid"
              class="justify-center rounded-lg px-6 py-2.5 font-medium transition-transform hover:scale-105"
              @click="copyEmailAddress"
            >
              {{ copied ? 'Email Copied!' : 'Get In Touch' }}
            </UButton>
            <UButton
              to="#projects"
              size="lg"
              color="neutral"
              variant="outline"
              class="ring-text-tertiary hover:bg-surface-elevated justify-center rounded-xl px-8 py-3 text-base font-semibold ring-1"
            >
              Browse Projects
            </UButton>
          </div>
        </div>

        <div
          class="text-text-tertiary flex flex-col text-center text-sm font-medium md:text-right"
        >
          <p class="mb-1">
            © {{ new Date().getFullYear() }} All Rights Reserved.
          </p>
          <p>
            Developed with <span class="text-primary">♥</span> by
            <a
              href="/"
              class="hover:text-primary text-text-primary transition-colors"
            >
              Anthuan
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
