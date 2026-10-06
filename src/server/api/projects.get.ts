import type { Project } from '~/types';

export default defineEventHandler(async (): Promise<Project[]> => {
  return [
    {
      name: 'Website',
      description: 'My personal website showcasing my projects and skills.',
      skills: 'Nuxt, Vue, Tailwind CSS, Langchain, Groq, LLM',
      link: 'https://github.com/anthuanvasquez/website',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Website',
    },
    {
      name: 'Agents Skills',
      description:
        'A platform for managing and tracking the skills of various agents.',
      skills: 'Markdown, Copilot, AI',
      link: 'https://github.com/anthuanvasquez/agents-skills',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Agents+Skills',
    },
    {
      name: 'Vision Night',
      description:
        'An event management platform for organizing and attending vision night events.',
      skills: 'TypeScript, Visual Code',
      link: 'https://github.com/anthuanvasquez/vscode-vision-night',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Vision+Night',
    },
    {
      name: 'DevBox',
      description:
        'A development environment setup tool for modern web projects.',
      skills: 'Linux, Bash, VM, Docker',
      link: 'https://github.com/anthuanvasquez/devbox',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=DevBox',
    },
    {
      name: 'Devlogs',
      description:
        'Generates daily commit reports and sends them to Discord or whatever you want.',
      skills: 'Node.js, Discord API, Telegram API',
      link: 'https://devlogs-eight.vercel.app/',
      image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Devlogs',
    },
    {
      name: 'MCP Server',
      description:
        'MCP server for managing and sharing professional information with LLMs.',
      skills: 'Node.js, TypeScript, MCP Toolkit',
      link: 'https://github.com/anthuanvasquez/website-mcp-server',
      image:
        'https://placehold.co/800x600/e2e8f0/1e293b?text=Website+MCP+Server',
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
