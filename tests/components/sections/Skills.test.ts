import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import Skills from '../../../app/components/sections/Skills.vue';

// Mock useGetFetch directly - it's more reliable than registerEndpoint for custom composables
mockNuxtImport('useGetFetch', () => {
  return (path: string) => {
    if (path === '/api/skills') {
      return Promise.resolve({
        data: ref([
          {
            name: 'Vue',
            category: 'Frontend',
            icon: 'i-skill-icons:vuejs-dark',
          },
          {
            name: 'Node.js',
            category: 'Backend',
            icon: 'i-skill-icons:nodejs-dark',
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

describe('Skills Section', () => {
  it('should render skills grouped by category', async () => {
    const component = await mountSuspended(Skills);

    // With the mock returning data immediately, we don't need vi.waitFor
    expect(component.text()).toContain('Frontend');
    expect(component.text()).toContain('Backend');
    expect(component.text()).toContain('Vue');
    expect(component.text()).toContain('Node.js');
  });
});
