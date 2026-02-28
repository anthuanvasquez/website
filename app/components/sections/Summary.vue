<script setup lang="ts">
const age = ref(36);
const bornAge = ref(1987);
const yearsOfExperience = ref(0);
const initYear = ref(2010);

onMounted(() => {
  const currentYear = new Date().getFullYear();
  age.value = currentYear - bornAge.value;
  yearsOfExperience.value = currentYear - initYear.value;
});
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="columns-3 gap-8">
      <p class="mb-3 text-lg">
        Hi, I'm Anthuan Vásquez, a {{ age }} years old Developer.
      </p>
      <p class="mb-3 text-lg">
        I'm a guy passionate for the technology, honest and a self-taught
        Front-End Developer. I consider myself as a person with initiative, who
        loves to take on new responsibilities, learning new things and face
        great challanges.
      </p>
      <p class="mb-3 text-lg">
        With over {{ yearsOfExperience }} years of experience in the web
        industry. I am qualified in evaluating business requirements and
        outreach plans for current and future success. I'm a self-taught
        Front-End Developer with an emphasis on scalability, robustness and high
        availability. I've been working with WordPress since January 2010 with
        version 2.9. I have worked in all versions since. In December 2014 I
        started my first steps in Magento version 1.9.
      </p>
      <p class="mb-3 text-lg">
        I have worked with different brands, different needs and different
        roles, like to work with different aspects of the front-end.
      </p>
      <p class="mb-3 text-lg">
        I specialize in the visual appearance of the websites or rather in their
        design, taking into account the technical requirements, functionality
        and user considerations, besides working with the back-end in the
        creation of modules / plugins in Magento and WordPress. As a Front-End
        developer, I have a great understanding of what it means, to provide
        high availability of Web applications and user experience.
      </p>

      <h3 class="text-2xl font-bold">I'm Currently.</h3>

      <p class="mb-3 text-lg">
        Working as a Freelance Front End Web Developer.
      </p>
      <p class="mb-3 text-lg">
        Collaborating on some
        <a href="https://github.com/anthuanvasquez">open-source</a> projects.
      </p>
      <p class="mb-3 text-lg">
        Producing music as <a href="https://oidoperfecto.net">Oido Perfecto</a>.
      </p>
      <p class="mb-3 text-lg">Building my personal brand :).</p>
      <p class="mb-3 text-lg">
        Reading
        <a href="https://github.com/getify/You-Dont-Know-JS">You Don't JS</a>
        Series,
        <a href="http://shop.oreilly.com/product/9780596517748.do"
          >JavaScript: The Good Parts</a
        >, <a href="https://www.the1thing.com/">The One Thing</a>,
        <a
          href="https://www.amazon.com/Elon-Musk-SpaceX-Fantastic-Future-ebook/dp/B00KVI76ZS"
          >Elon Musk</a
        >
        books.
      </p>
      <p class="mb-3 text-lg">Fan of Dragon Ball Z, Super :)</p>
      <p class="mb-3 text-lg">Being a father.</p>
      <p class="mb-3 text-lg">Learning new things.</p>
    </div>
  </div>
</template>
