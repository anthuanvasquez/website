import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import Projects from '../../../app/components/sections/Projects.vue';

// Mock useGetFetch directly
mockNuxtImport('useGetFetch', () => {
  return (path: string) => {
    if (path === '/api/projects') {
      return Promise.resolve({
        data: ref([
          {
            name: 'Project 1',
            description: 'Description 1',
            link: 'https://example.com',
            image: '/project1.png',
            skills: 'Vue, Nuxt',
          },
          {
            name: 'Project 2',
            description: 'Description 2',
            link: 'https://example.com/2',
            image: '/project2.png',
            skills: 'React, Tailwind',
          },
        ]),
        pending: ref(false),
        error: ref(null),
      });
    }
    return Promise.resolve({
      data: ref(null),
      pending: ref(false),
      error: ref(null),
    });
  };
});

describe('Projects Section', () => {
  it('should render projects correctly', async () => {
    const component = await mountSuspended(Projects);

    // Verify projects are rendered
    const projectCards = component.findAll('[data-testid="project-card"]');
    expect(projectCards.length).toBe(2);

    // Verify first project content
    const firstProject = projectCards[0];
    expect(firstProject.text()).toContain('Project 1');
    expect(firstProject.text()).toContain('Description 1');
    expect(firstProject.text()).toContain('Vue');
    expect(firstProject.text()).toContain('Nuxt');

    // Check titles
    const titles = component.findAll('[data-testid="project-title"]');
    expect(titles[0].text()).toBe('Project 1');
    expect(titles[1].text()).toBe('Project 2');
  });
});
