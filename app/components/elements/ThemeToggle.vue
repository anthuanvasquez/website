<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <ClientOnly>
    <button
      data-testid="theme-toggle"
      class="group border-border-subtle bg-surface-elevated/50 text-text-secondary hover:bg-surface-elevated hover:text-text-primary focus-visible:ring-primary focus-visible:ring-offset-surface-base relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      aria-label="Toggle theme"
      :aria-pressed="isDark"
      @click="isDark = !isDark"
    >
      <span class="relative block h-5 w-5">
        <UIcon
          v-if="!isDark"
          name="i-lucide-sun"
          class="absolute inset-0 size-5 scale-100 rotate-0 transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
        <UIcon
          v-else
          name="i-lucide-moon"
          class="absolute inset-0 size-5 scale-100 rotate-0 transition-all group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
        />
      </span>

      <!-- Subtle highlight effect -->
      <span
        class="absolute inset-0 rounded-lg bg-white/5 opacity-0 transition-opacity group-hover:opacity-100"
      ></span>
    </button>
  </ClientOnly>
</template>
