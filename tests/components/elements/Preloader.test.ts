import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Preloader from '~/components/elements/Preloader.vue';

describe('Preloader', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders preloader and video on initial visit', async () => {
    const component = await mountSuspended(Preloader);

    const preloader = component.find('[data-testid="preloader"]');
    expect(preloader.exists()).toBe(true);

    const video = component.find('[data-testid="preload-video"]');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('/preload.mp4');

    const progress = component.find('[data-testid="preload-progress"]');
    expect(progress.exists()).toBe(true);
    expect(progress.text()).toBe('0%');
  });

  it('does not render if session already recorded preload_seen', async () => {
    sessionStorage.setItem('preload_seen', 'true');
    const component = await mountSuspended(Preloader);

    const preloader = component.find('[data-testid="preloader"]');
    expect(preloader.exists()).toBe(false);
  });

  it('hides and sets sessionStorage when skip button is clicked', async () => {
    const component = await mountSuspended(Preloader);

    const skipButton = component.find('[data-testid="skip-button"]');
    expect(skipButton.exists()).toBe(true);

    await skipButton.trigger('click');

    expect(sessionStorage.getItem('preload_seen')).toBe('true');
  });
});
