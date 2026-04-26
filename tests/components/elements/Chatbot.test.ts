import {
  mockNuxtImport,
  mountSuspended,
  registerEndpoint,
} from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import Chatbot from '../../../app/components/elements/Chatbot.vue';

// Mock session token utility
mockNuxtImport('generateSessionToken', () => {
  return vi.fn().mockResolvedValue('mock-token');
});

describe('Chatbot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  it('should render the trigger button initially', async () => {
    const component = await mountSuspended(Chatbot);
    expect(component.find('[data-testid="chatbot-trigger"]').exists()).toBe(
      true
    );
  });

  it('should show notification after 2 seconds', async () => {
    const component = await mountSuspended(Chatbot);
    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(
      component.find('[data-testid="chatbot-notification"]').exists()
    ).toBe(true);
  });

  it('should open the chat dialog when trigger is clicked', async () => {
    const component = await mountSuspended(Chatbot);
    await component.find('[data-testid="chatbot-trigger"]').trigger('click');
    await nextTick();
    expect(document.body.innerHTML).toContain('Anthuan Assistant');
  });

  it('should send a message and show bot response', async () => {
    const uniqueResponse = 'AI-RESPONSE-SUCCESS';

    registerEndpoint('/api/chatbot/chat', {
      method: 'POST',
      handler: () => ({
        success: true,
        response: uniqueResponse,
      }),
    });

    const component = await mountSuspended(Chatbot);

    // Open chat
    await component.find('[data-testid="chatbot-trigger"]').trigger('click');
    await nextTick();

    // Find textarea and type message correctly
    const textarea = document.querySelector('[data-testid="chatbot-input"]');
    if (!textarea) throw new Error('Textarea not found');

    textarea.value = 'Tell me about your projects';
    textarea.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new Event('change'));
    await nextTick();

    // Find and click send button
    const sendButton = document.querySelector(
      '[data-testid="chatbot-send"]'
    ) as HTMLButtonElement;
    if (!sendButton) throw new Error('Send button not found');

    sendButton.click();

    // Wait for the response to appear in the DOM
    await vi.waitFor(
      () => {
        const bodyText = document.body.innerHTML;
        if (!bodyText.includes(uniqueResponse)) {
          throw new Error('Response not yet in DOM');
        }
      },
      { timeout: 4000, interval: 100 }
    );

    expect(document.body.innerHTML).toContain(uniqueResponse);
  });

  it('should show error message when API fails', async () => {
    registerEndpoint('/api/chatbot/chat', {
      method: 'POST',
      handler: () => {
        return { success: false, response: 'Oops! Something went wrong' };
      },
    });

    const component = await mountSuspended(Chatbot);
    await component.find('[data-testid="chatbot-trigger"]').trigger('click');
    await nextTick();

    const textarea = document.querySelector('[data-testid="chatbot-input"]');
    if (textarea) {
      textarea.value = 'Test error';
      textarea.dispatchEvent(new Event('input'));
      textarea.dispatchEvent(new Event('change'));
      await nextTick();

      const sendButton = document.querySelector(
        '[data-testid="chatbot-send"]'
      ) as HTMLButtonElement;
      sendButton.click();
    }

    await vi.waitFor(
      () => {
        if (!document.body.innerHTML.includes('Oops! Something went wrong')) {
          throw new Error('Error message not yet in DOM');
        }
      },
      { timeout: 4000 }
    );

    // Aserción explícita para satisfacer al linter (vitest/expect-expect)
    expect(document.body.innerHTML).toContain('Oops! Something went wrong');
  });
});
