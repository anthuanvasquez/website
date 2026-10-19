<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const TARGET_DURATION_MS = 1500;

const isVisible = ref(true);
const isFading = ref(false);
const progress = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);

let startTime: number | null = null;
let animationFrameId: number | null = null;
let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

const finish = () => {
  if (isFading.value || !isVisible.value) return;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  progress.value = 100;
  isFading.value = true;
  document.body.style.overflow = '';

  try {
    sessionStorage.setItem('preload_seen', 'true');
  } catch {
    // Ignore storage restrictions in private browsing
  }

  setTimeout(() => {
    isVisible.value = false;
  }, 700);
};

const animateProgress = (timestamp: number) => {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const pct = Math.min(100, Math.floor((elapsed / TARGET_DURATION_MS) * 100));
  progress.value = pct;

  if (elapsed < TARGET_DURATION_MS && !isFading.value) {
    animationFrameId = requestAnimationFrame(animateProgress);
  } else {
    finish();
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    finish();
  }
};

onMounted(() => {
  try {
    if (!import.meta.dev && sessionStorage.getItem('preload_seen') === 'true') {
      isVisible.value = false;
      return;
    }
  } catch {
    // Ignore storage restrictions
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = false;
    return;
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onKeydown);

  // Safety fallback
  fallbackTimer = setTimeout(() => {
    finish();
  }, TARGET_DURATION_MS + 2000);

  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      // Ignore autoplay error
    });
  }

  animationFrameId = requestAnimationFrame(animateProgress);
});

onUnmounted(() => {
  if (fallbackTimer) clearTimeout(fallbackTimer);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div
    v-if="isVisible"
    data-testid="preloader"
    class="preloader-dark fixed inset-0 z-9999 flex items-center justify-center overflow-hidden transition-all duration-700 ease-out select-none"
    :class="{
      'pointer-events-none scale-102 opacity-0': isFading,
      'scale-100 opacity-100': !isFading,
    }"
  >
    <!-- Skip button -->
    <button
      type="button"
      data-testid="skip-button"
      class="border-border-subtle bg-surface-elevated/60 font-firacode text-text-tertiary hover:border-text-secondary hover:text-text-primary absolute top-6 right-6 z-50 rounded-lg border px-3.5 py-1.5 text-xs backdrop-blur transition"
      @click="finish"
    >
      Saltar [ESC]
    </button>

    <!-- Preload Video with smooth vignette feathering -->
    <div
      class="relative z-10 flex max-h-[80vh] max-w-[90vw] items-center justify-center"
    >
      <video
        ref="videoRef"
        data-testid="preload-video"
        src="/preload.mp4"
        autoplay
        muted
        playsinline
        class="max-h-[75vh] max-w-[85vw] object-contain"
        style="
          mask-image: radial-gradient(
            ellipse 65% 65% at 50% 50%,
            black 35%,
            transparent 75%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 65% 65% at 50% 50%,
            black 35%,
            transparent 75%
          );
        "
      />
    </div>

    <!-- Progress indicator at bottom right -->
    <div
      class="pointer-events-none fixed right-6 bottom-6 z-50 flex flex-col items-end sm:right-10 sm:bottom-10"
    >
      <span
        class="font-firacode text-text-tertiary mb-1 text-xs font-semibold tracking-widest uppercase md:text-sm"
      >
        Building...
      </span>
      <span
        data-testid="preload-progress"
        class="font-firacode text-primary text-7xl font-bold tracking-tighter tabular-nums sm:text-8xl md:text-9xl"
      >
        {{ progress }}%
      </span>
    </div>
  </div>
</template>
