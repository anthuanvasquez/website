export const useReveal = () => {
  const container = ref<HTMLElement | null>(null);
  const isRevealed = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (!container.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isRevealed.value = true;
          observer?.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(container.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { container, isRevealed };
};
