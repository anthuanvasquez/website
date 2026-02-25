<template>
  <footer
    id="footer"
    class="mt-20 border-t border-[var(--surface-elevated)] py-12"
  >
    <div class="container mx-auto max-w-7xl px-4 md:px-0">
      <div
        class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end"
      >
        <!-- Left Side: Title & Actions -->
        <div class="flex flex-col text-center md:text-left">
          <h2
            class="mb-6 text-3xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Interested in working together<span
              class="text-[var(--color-primary)]"
              >?</span
            >
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
              color="neutral"
              variant="outline"
              class="justify-center rounded-lg bg-[var(--surface-base)] px-6 py-2.5 font-medium text-[var(--text-primary)] ring-1 ring-[var(--surface-elevated)] transition-all hover:bg-[var(--surface-elevated)]"
              to="#footer"
            >
              Browse Projects
            </UButton>
          </div>
        </div>

        <!-- Right Side: Copyright -->
        <div
          class="flex flex-col text-center text-sm font-medium text-[var(--text-tertiary)] md:text-right"
        >
          <p class="mb-1">
            © {{ new Date().getFullYear() }} All Rights Reserved.
          </p>
          <p>
            Developed with <span class="text-[var(--color-primary)]">♥</span> by
            <a
              href="https://anthuanvasquez.net"
              class="text-[var(--text-primary)] transition-colors hover:text-[var(--color-primary)]"
              >Anthuan</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const copied = ref(false);

/**
 * Copy email address to clipboard. Notify after copy.
 */
const copyEmailAddress = () => {
  const email = 'info@purplefolio.com'; // using the one from the image reference if user wishes, or the previous placeholder
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
