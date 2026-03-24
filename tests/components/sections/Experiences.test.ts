import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import Experiences from '../../../app/components/sections/Experiences.vue';

// Mock useGetFetch directly
mockNuxtImport('useGetFetch', () => {
  return (path: string) => {
    if (path === '/api/experiences') {
      return Promise.resolve({
        data: ref([
          {
            name: 'Company A',
            position: 'Senior Dev',
            date: '2022 - Present',
            activities: ['Project A details'],
          },
          {
            name: 'Company B',
            position: 'Lead Dev',
            date: '2020 - 2022',
            activities: ['Project B details'],
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

describe('Experiences Section', () => {
  it('should render experiences and handle tab switching', async () => {
    const component = await mountSuspended(Experiences);

    expect(component.text()).toContain('Senior Dev');
    expect(component.text()).toContain('@ Company A');

    // Switch tabs
    const buttons = component.findAll('button');
    const companyBButton = buttons.find((b) => b.text().includes('Company B'));
    if (!companyBButton) throw new Error('Company B button not found');

    await companyBButton.trigger('click');

    expect(component.text()).toContain('Lead Dev');
    expect(component.text()).toContain('@ Company B');
    expect(component.text()).toContain('Project B details');
  });
});
