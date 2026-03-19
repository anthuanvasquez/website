import type { Experience } from '~/types';

export default defineEventHandler(async (): Promise<Experience[]> => {
  return [
    {
      name: 'CEVALDOM',
      position: 'Software Development Engineer',
      description: 'JavaScript & Angular',
      date: '2024 - NOW',
      coding: '3000hrs+',
      activities: [
        'Lead modernization of enterprise web apps for performance and scalability',
        'Define frontend architecture to improve DX and team velocity',
        'Ensure reliability in regulated, mission-critical systems',
        'Build core components for system integrations',
      ],
    },
    {
      name: 'Minnek',
      position: 'Technical Lead',
      description: 'JavaScript & Node.js',
      date: '2020 - 2024',
      coding: '3000hrs+',
      activities: [
        'Lead the team by delegating work strategically based on strengths and experience',
        'Translate user needs into technical solutions with the team',
        'Define goals, milestones, and roadmap to keep everyone aligned',
        'Ensure technical quality through healthy code reviews and DevOps best practices',
        'Collaborate with developers, designers, and stakeholders to deliver effective solutions',
        'Write clean, efficient, and maintainable code for modern web applications',
        'Build and maintain custom themes and plugins for BigCommerce',
        'Optimize web apps for performance, scalability, and security',
      ],
    },
    {
      name: 'FlashCookies',
      position: 'Senior Front-End Developer',
      description: 'JavaScript, Laravel & Vue',
      date: '2019 - 2020',
      coding: '800hrs+',
      activities: [
        'Build fast, responsive eCommerce interfaces with Vue.js',
        'Integrate frontend with APIs and payment/shipping services',
        'Optimize UX and performance to increase conversions',
      ],
    },
    {
      name: 'Snow.dog',
      position: 'Senior Front-End Developer',
      description: 'JavaScript, PHP & Magento CE',
      date: '2016 - 2019',
      coding: '2800hrs+',
      activities: [
        'Develop Magento-based stores with custom UI components that boost user engagement',
        'Translate complex designs into pixel-perfect, responsive, and accessible interfaces',
        'Modernize legacy jQuery codebases into modular, maintainable JavaScript with modern tooling',
      ],
    },
  ];
});
