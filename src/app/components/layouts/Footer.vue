<script setup lang="ts">
import { ref } from 'vue';
import { homePageData, globalData } from '~/data';

const copied = ref(false);

/**
 * Copy email address to clipboard. Notify after copy.
 */
const copyEmailAddress = () => {
  const email = useEnv().emailAddress;
  navigator.clipboard.writeText(email);
  copied.value = true;
  useToast().add({
    title: globalData.copyEmail.successTitle,
    description: globalData.copyEmail.successDescription,
    color: 'primary',
  });

  setTimeout(() => {
    copied.value = false;
  }, 3000);
};
</script>

<template>
  <footer
    id="footer"
    class="border-border-subtle bg-surface-float/60 mt-20 border-t py-16 transition-colors duration-300"
  >
    <div class="mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-0">
      <div
        class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end"
      >
        <div class="flex flex-col text-center md:text-left">
          <h2 class="text-text-primary mb-3 text-3xl font-bold tracking-tight">
            {{ homePageData.footer.heading
            }}<span class="text-primary">{{
              homePageData.footer.headingHighlight
            }}</span>
          </h2>

          <p
            class="text-text-secondary mx-auto mb-8 max-w-xl text-base leading-relaxed md:mx-0"
          >
            {{ homePageData.footer.description }}
          </p>

          <div
            class="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
          >
            <UButton
              color="primary"
              variant="solid"
              class="btn-primary"
              @click="copyEmailAddress"
            >
              <UIcon
                :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                class="size-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>
                {{
                  copied
                    ? globalData.copyEmail.buttonCopied
                    : globalData.copyEmail.buttonDefault
                }}
              </span>
            </UButton>
            <UButton
              to="#projects"
              color="neutral"
              variant="outline"
              class="btn-secondary group"
            >
              <span>{{ homePageData.hero.secondaryButton }}</span>
              <UIcon
                name="i-lucide-arrow-down"
                class="text-text-tertiary group-hover:text-primary size-4.5 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </UButton>
          </div>
        </div>

        <div
          class="text-text-tertiary flex flex-col text-center text-sm font-medium md:text-right"
        >
          <p class="mb-1">
            © {{ new Date().getFullYear() }} {{ homePageData.footer.copyright }}
          </p>
          <p>
            {{ homePageData.footer.developedBy }}
            <NuxtLink
              to="/about"
              class="hover:text-primary text-text-primary transition-colors"
            >
              {{ homePageData.footer.authorName }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
