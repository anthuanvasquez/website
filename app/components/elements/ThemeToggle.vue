<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>

<template>
  <ClientOnly>
    <button
      class="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-subtle) bg-(--surface-elevated)/50 text-(--text-secondary) transition-all hover:bg-(--surface-elevated) hover:text-(--text-primary) hover:shadow-lg focus:outline-none"
      @click="isDark = !isDark"
      aria-label="Toggle theme"
    >
      <div class="relative h-5 w-5">
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
      </div>

      <!-- Subtle highlight effect -->
      <span
        class="absolute inset-0 rounded-lg bg-white/5 opacity-0 transition-opacity group-hover:opacity-100"
      ></span>
    </button>
  </ClientOnly>
</template>
