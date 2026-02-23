import type { Project } from '../../app/types';

export default defineEventHandler(async (): Promise<Project[]> => {
  return [
    {
      name: 'TaskFlow',
      description:
        'Task management system with drag-and-drop, real-time collaboration, and responsive layout.',
      skills: 'Vue, Nuxt, Tailwind',
      link: '#',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=TaskFlow+Dashboard',
    },
    {
      name: 'EcoCart',
      description:
        'E-commerce platform promoting eco-friendly products with payment integration.',
      skills: 'React, NextJS, Stripe',
      link: '#',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=EcoCart+Store',
    },
    {
      name: 'Timeline',
      description:
        'Interactive scheduling and calendar application for managing complex internal team workflows.',
      skills: 'Angular, Node.js',
      link: '#',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Timeline+Calendar',
    },
    {
      name: 'Maps Delivery',
      description:
        'A food delivery tracking application using real-time geolocation and route optimization.',
      skills: 'Vue, Google Maps API',
      link: '#',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Maps+Delivery',
    },
  ];
});
