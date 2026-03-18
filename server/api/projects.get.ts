import type { Project } from '~/types';

export default defineEventHandler(async (): Promise<Project[]> => {
  return [
    {
      name: 'Devlogs',
      description:
        'Generates daily commit reports and sends them to Discord or whatever you want.',
      skills: 'Node.js, Discord API, Telegram API',
      link: 'https://github.com/anthuanvasquez/devlogs',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Devlogs',
    },
    {
      name: 'Countdown',
      description:
        'A simple modern countdown to show the time until your next upcoming activity.',
      skills: 'Node.js, React, TypeScript, Tailwind CSS, Vite',
      link: 'https://github.com/anthuanvasquez/countdown',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Countdown',
    },
  ];
});
