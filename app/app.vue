<script setup lang="ts">
import { seoData } from '~/data';

useSeoMeta({
  title: 'Anthuan Vásquez | Full-Stack Engineer',
  description: seoData.description,
  ogTitle: seoData.ogTitle,
  ogDescription: seoData.description,
  ogImage: seoData.image,
  ogUrl: seoData.mySite,
  twitterCard: 'summary_large_image',
  twitterTitle: seoData.ogTitle,
  twitterDescription: seoData.twitterDescription,
  twitterImage: seoData.image,
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk && !titleChunk.includes('Anthuan')
      ? `${titleChunk} · Anthuan Vásquez`
      : titleChunk || 'Anthuan Vásquez | Full-Stack Engineer';
  },
  htmlAttrs: {
    lang: 'en',
  },
});
</script>

<template>
  <UApp>
    <NuxtLayout />
  </UApp>
</template>
