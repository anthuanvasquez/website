import type { Experience } from '~/types';

export default defineEventHandler(async (event): Promise<Experience[]> => {
  return [
    {
      name: 'CEVALDOM',
      position: 'Software Development Engineer',
      description: 'JavaScript & Angular',
      date: '2024 - NOW',
      coding: '3000hrs+',
      projects: [
        {
          name: 'CORE System UI/UX',
          description:
            'CORE System is a web application that allows users to manage their projects and tasks.',
          skills:
            'Angular, TypeScript, Node.js, TailwindCSS, GitLab, UX, Accessibility, CI/CD',
        },
        {
          name: 'POC Keycloak Authentication',
          description:
            'CORE System is a web application that allows users to manage their projects and tasks.',
          skills: 'Keycloak, Angular, TypeScript, Node.js, GitLab, CI/CD',
        },
        {
          name: 'CEVALDOM MVP Website',
          description:
            'CORE System is a web application that allows users to manage their projects and tasks.',
          skills: 'Astro, React, TypeScript, Node.js, Shadcn/UI',
        },
      ],
    },
    {
      name: 'Minnek',
      position: 'Technical Lead',
      description: 'JavaScript & Node.js',
      date: '2020 - 2024',
      coding: '3000hrs+',
      projects: [
        {
          name: 'Minnek Digital Website',
          description: 'Ecommerce migration from Yahoo to Big Commerce.',
          skills:
            'JavaScript, jQuery, UX, SEO, Performance, Core Web Vitals, Node.js, GraphQL, Accessibility WCAG',
        },
        {
          name: 'Averills Sharper Uniforms',
          description: 'Ecommerce migration from Yahoo to Big Commerce.',
          skills:
            'JavaScript, jQuery, UX, SEO, Performance, Core Web Vitals, Node.js, GraphQL, Accessibility WCAG',
        },
        {
          name: 'Spicy Lingerie',
          description:
            'Ecommerce migration from Yahoo to Big Commerce. Re-design UI/UX, Improve store performance with Core Web Vitals, Optimize for SEO, Accessibility WCAG.',
          skills:
            'Big Commerce, Stencil CLI, JavaScript, jQuery, SASS, UX, SEO, Performance, Core Web Vitals, Node.js, GraphQL, Accessibility WCAG',
        },
      ],
    },
    {
      name: 'FlashCookies',
      position: 'Senior Front-End Developer',
      description: 'JavaScript, Laravel & Vue',
      date: '2019 - 2020',
      coding: '800hrs+',
      projects: [
        {
          name: 'Drop Shipping Store UI/UX',
          description:
            'CORE System is a web application that allows users to manage their projects and tasks.',
          skills:
            'Angular, TypeScript, Node.js, TailwindCSS, GitLab, UX, Accessibility, CI/CD, GitLab, UX, Accessibility, CI/CD',
        },
      ],
    },
    {
      name: 'Snow.dog',
      position: 'Senior Front-End Developer',
      description: 'JavaScript, PHP & Magento CE',
      date: '2016 - 2019',
      coding: '2800hrs+',
      projects: [
        {
          name: 'Zeragownia',
          description:
            'CORE System is a web application that allows users to manage their projects and tasks.',
          skills:
            'Angular, TypeScript, Node.js, TailwindCSS, GitLab, UX, Accessibility, CI/CD, GitLab, UX, Accessibility, CI/CD',
        },
      ],
    },
  ];
});
