import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import Services from '../../../app/components/sections/Services.vue';

// Mock useGetFetch directly
mockNuxtImport('useGetFetch', () => {
  return (path: string) => {
    if (path === '/api/services') {
      return Promise.resolve({
        data: ref([
          {
            id: '01',
            name: 'Service 1',
            icon: 'i-heroicons-code-bracket',
            description: 'Description 1',
            categories: ['Category 1', 'Category 2'],
          },
          {
            id: '02',
            name: 'Service 2',
            icon: 'i-heroicons-server',
            description: 'Description 2',
            categories: ['Category 3'],
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

describe('Services Section', () => {
  it('should render services correctly inside the accordion', async () => {
    const component = await mountSuspended(Services);

    // Verify accordion exists
    const accordion = component.find('[data-testid="service-accordion"]');
    expect(accordion.exists()).toBe(true);

    // Verify service items are rendered
    expect(component.text()).toContain('01');
    expect(component.text()).toContain('Service 1');

    expect(component.text()).toContain('02');
    expect(component.text()).toContain('Service 2');
  });
});
