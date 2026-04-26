import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import ThemeToggle from '../../../app/components/elements/ThemeToggle.vue';

// Mock state for colorMode
const colorModeMock = {
  value: 'light',
  preference: 'system',
};

// Mock Nuxt's useColorMode
mockNuxtImport('useColorMode', () => {
  return () => colorModeMock;
});

describe('ThemeToggle', () => {
  it('should render correctly in light mode', async () => {
    colorModeMock.value = 'light';
    const component = await mountSuspended(ThemeToggle);

    // Verify button exists
    const button = component.find('[data-testid="theme-toggle"]');
    expect(button.exists()).toBe(true);

    // Verify aria-label is correct
    expect(button.attributes('aria-label')).toBe('Toggle theme');

    // Verify it contains the sun icon (iconify format)
    expect(component.html()).toContain('i-lucide:sun');
  });

  it('should render correctly in dark mode', async () => {
    colorModeMock.value = 'dark';
    const component = await mountSuspended(ThemeToggle);

    // Verify it contains the moon icon (iconify format)
    expect(component.html()).toContain('i-lucide:moon');
  });

  it('should update preference when clicked', async () => {
    colorModeMock.value = 'light';
    colorModeMock.preference = 'light';

    const component = await mountSuspended(ThemeToggle);
    const button = component.find('[data-testid="theme-toggle"]');

    // Click triggers isDark computed setter
    await button.trigger('click');

    expect(colorModeMock.preference).toBe('dark');
  });
});
