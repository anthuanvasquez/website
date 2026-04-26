<script setup lang="ts">
import { summaryData } from '~/data';

const age = ref(36);
const bornAge = ref(1987);
const yearsOfExperience = ref(0);
const initYear = ref(2010);

onMounted(() => {
  const currentYear = new Date().getFullYear();
  age.value = currentYear - bornAge.value;
  yearsOfExperience.value = currentYear - initYear.value;
});

const replacePlaceholders = (text: string) => {
  return text
    .replace('{age}', age.value.toString())
    .replace('{experience}', yearsOfExperience.value.toString());
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="columns-3 gap-8">
      <p
        v-for="(paragraph, index) in summaryData.paragraphs"
        :key="index"
        class="mb-3 text-lg"
      >
        {{ replacePlaceholders(paragraph) }}
      </p>

      <h3 class="mt-6 mb-4 text-2xl font-bold">
        {{ summaryData.currentlyHeading }}
      </h3>

      <p
        v-for="(item, index) in summaryData.currentlyList"
        :key="'list-' + index"
        class="mb-3 text-lg"
      >
        <template v-if="item.url">
          {{ item.text.split(' as ')[0] }} as
          <a :href="item.url">{{
            item.text.split(' as ')[1]?.replace('.', '') || 'Link'
          }}</a
          >.
        </template>
        <template v-else-if="item.text.includes('open-source')">
          Collaborating on some
          <a :href="item.url || 'https://github.com/anthuanvasquez'"
            >open-source</a
          >
          projects.
        </template>
        <template v-else-if="item.books">
          {{ item.text }}
          <template v-for="(book, bIndex) in item.books" :key="bIndex">
            <a :href="book.url">{{ book.title }}</a
            >{{ bIndex < item.books.length - 1 ? ', ' : ' books.' }}
          </template>
        </template>
        <template v-else>
          {{ item.text }}
        </template>
      </p>
    </div>
  </div>
</template>
