import type { Service } from '../../app/types';

export default defineEventHandler(async (): Promise<Service[]> => {
  return [
    {
      id: '001',
      name: 'Front-End Engineering',
      description:
        'Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.',
      icon: 'i-lucide-code-xml',
      categories: [
        'React',
        'Vue',
        'Next.js',
        'Tailwind CSS',
        'TypeScript',
        '6+',
      ],
    },
    {
      id: '002',
      name: 'Back-End Engineering',
      description:
        'Strategic, data-driven backend architectures designed to scale and connect with your target audience.',
      icon: 'i-lucide-square-terminal',
      categories: ['Node.js', 'Python', 'Go', 'Databases', 'APIs'],
    },
    {
      id: '003',
      name: 'APIs Development',
      description:
        'Robust API solutions tailored for high performance and seamless integrations across multiple platforms.',
      icon: 'i-lucide-send-to-back',
      categories: ['REST', 'GraphQL', 'Microservices', 'API Gateway'],
    },
    {
      id: '004',
      name: 'AI Integration',
      description:
        'Cutting-edge AI capabilities wrapped seamlessly into your business processes and user experiences.',
      icon: 'i-lucide-brain',
      categories: ['LLMs', 'OpenAI', 'LangChain', 'RAG'],
    },
    {
      id: '005',
      name: 'Code Check',
      description:
        'Rigorous code review procedures to ensure maintainability, security, and consistent best practices.',
      icon: 'i-lucide-shield-check',
      categories: ['Code Review', 'Testing', 'Security', 'Refactoring'],
    },
    {
      id: '006',
      name: 'Accessibility a11y',
      description:
        'Accessible interfaces built to support a wide range of devices and diverse user needs inclusive of all.',
      icon: 'i-lucide-accessibility',
      categories: ['WCAG', 'Screen Readers', 'Keyboard Navigation', 'ARIA'],
    },
  ];
});
