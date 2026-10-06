import type { Skill } from '~/types';

export default defineEventHandler(async (): Promise<Skill[]> => {
  return [
    {
      name: 'JavaScript',
      category: 'Frontend',
      icon: 'i-skill-icons-javascript',
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      icon: 'i-skill-icons-typescript',
    },
    {
      name: 'Vue / Nuxt',
      category: 'Frontend',
      icon: 'i-skill-icons-nuxtjs-dark',
    },
    {
      name: 'React',
      category: 'Frontend',
      icon: 'i-skill-icons-react-dark',
    },
    {
      name: 'Angular',
      category: 'Frontend',
      icon: 'i-skill-icons-angular-dark',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      icon: 'i-skill-icons-tailwindcss-dark',
    },
    {
      name: 'Accessibility (WCAG)',
      category: 'Frontend',
      icon: 'i-lucide-accessibility',
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: 'i-skill-icons-nodejs-dark',
    },
    {
      name: 'Express / Nest',
      category: 'Backend',
      icon: 'i-skill-icons-expressjs-dark',
    },
    {
      name: 'REST APIs',
      category: 'Backend',
      icon: 'i-skill-icons:nestjs-dark',
    },
    {
      name: 'PostgreSQL',
      category: 'Backend',
      icon: 'i-skill-icons-postgresql-dark',
    },
    {
      name: 'Prisma ORM',
      category: 'Backend',
      icon: 'i-skill-icons-prisma',
    },
    {
      name: 'Git / GitHub',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-git',
    },
    {
      name: 'CI/CD (GitHub Actions)',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons:githubactions-dark',
    },
    {
      name: 'Observability & Monitoring',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons:grafana-dark',
    },
    {
      name: 'Docker',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-docker',
    },
    {
      name: 'Linux',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-linux-dark',
    },
    {
      name: 'UX / UI Design',
      category: 'Design & Soft Skills',
      icon: 'i-lucide-panels-top-left',
    },
    {
      name: 'Effective Communication',
      category: 'Design & Soft Skills',
      icon: 'i-lucide-headset',
    },
    {
      name: 'Team Collaboration',
      category: 'Design & Soft Skills',
      icon: 'i-lucide-user-group',
    },
    {
      name: 'Leadership',
      category: 'Design & Soft Skills',
      icon: 'i-lucide-crown',
    },
    {
      name: 'Problem Solving',
      category: 'Design & Soft Skills',
      icon: 'i-lucide-bug',
    },
  ];
});
