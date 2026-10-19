import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import BlogPosts from '~/components/sections/BlogPosts.vue';
import BrainNotes from '~/components/sections/BrainNotes.vue';

describe('Home Blog & Brain List Sections', () => {
  it('renders BlogPosts as a list with date and post title', async () => {
    const component = await mountSuspended(BlogPosts, {
      props: {
        posts: [
          {
            slug: 'hello-world',
            path: '/blog/hello-world',
            title: 'Welcome to My Blog',
            date: '2026-02-02',
          },
        ],
      },
    });

    expect(component.findAll('[data-testid="home-blog-item"]')).toHaveLength(1);
    expect(component.text()).toContain('Welcome to My Blog');
  });

  it('renders BrainNotes as a list with brain icon and note title', async () => {
    const component = await mountSuspended(BrainNotes, {
      props: {
        notes: [
          {
            slug: 'second-brain',
            path: '/brain/second-brain',
            title: 'Welcome to my Second Brain',
          },
        ],
      },
    });

    expect(component.findAll('[data-testid="home-brain-item"]')).toHaveLength(
      1
    );
    expect(component.text()).toContain('Welcome to my Second Brain');
  });
});
