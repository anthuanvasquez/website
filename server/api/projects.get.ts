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
      name: 'Timevent',
      description:
        'A modern, aesthetic web application that displays a countdown timer to your next upcoming Google Calendar event.',
      skills: 'Node.js, Google Calendar API, React, TypeScript, Tailwind CSS',
      link: 'https://github.com/anthuanvasquez/timevent',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Timevent',
    },
  ];
});
