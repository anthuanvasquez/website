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
      name: 'React / NextJS',
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
      name: 'GraphQL',
      category: 'Backend',
      icon: 'i-skill-icons-graphql-dark',
    },
    {
      name: 'MongoDB',
      category: 'Backend',
      icon: 'i-skill-icons-mongodb',
    },
    {
      name: 'PostgreSQL / SQL',
      category: 'Backend',
      icon: 'i-skill-icons-postgresql-dark',
    },
    {
      name: 'Prisma / Drizzle',
      category: 'Backend',
      icon: 'i-skill-icons-prisma',
    },
    {
      name: 'Git / GitHub',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-git',
    },
    {
      name: 'Docker',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-docker',
    },
    {
      name: 'AWS',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-aws-dark',
    },
    {
      name: 'Linux',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-linux-dark',
    },
    {
      name: 'Vercel / Netlify',
      category: 'Tools & DevOps',
      icon: 'i-skill-icons-vercel-dark',
    },
    {
      name: 'UX / UI Design',
      category: 'Design & Soft Skills',
    },
    {
      name: 'Effective Communication',
      category: 'Design & Soft Skills',
    },
    {
      name: 'Team Collaboration',
      category: 'Design & Soft Skills',
    },
    {
      name: 'Leadership',
      category: 'Design & Soft Skills',
    },
    {
      name: 'Problem Solving',
      category: 'Design & Soft Skills',
    },
  ];
});
