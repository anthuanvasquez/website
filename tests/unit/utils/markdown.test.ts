import { describe, it, expect } from 'vitest';
import {
  normalizeSlug,
  getAllMarkdown,
  getMarkdownBySlug,
} from '../../../server/utils/markdown';

describe('Markdown Utilities (Unit)', () => {
  describe('normalizeSlug', () => {
    it('should strip leading numbers, separators, and extension', () => {
      expect(normalizeSlug('1-hello-world.md')).toBe('hello-world');
      expect(normalizeSlug('02_my_post.md')).toBe('my_post');
      expect(normalizeSlug('3.clean-slug.md')).toBe('clean-slug');
      expect(normalizeSlug('just-a-slug.md')).toBe('just-a-slug');
    });
  });

  describe('getAllMarkdown', () => {
    it('should load all blog posts with metadata', () => {
      const posts = getAllMarkdown('blog');
      expect(posts.length).toBeGreaterThan(0);

      const first = posts[0];
      expect(first).toHaveProperty('slug');
      expect(first).toHaveProperty('path');
      expect(first).toHaveProperty('title');
    });

    it('should return empty array for non-existent folder', () => {
      const items = getAllMarkdown('non-existent-folder');
      expect(items).toEqual([]);
    });
  });

  describe('getMarkdownBySlug', () => {
    it('should load and render a post by normalized slug', () => {
      const post = getMarkdownBySlug('blog', 'hello-world');
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Welcome to My Blog');
      expect(post?.html).toContain('<h1');
      expect(post?.html).toContain('Hello World');
    });

    it('should load and render a post by exact filename without extension', () => {
      const post = getMarkdownBySlug('blog', '1-hello-world');
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Welcome to My Blog');
    });

    it('should load and render a second brain note', () => {
      const note = getMarkdownBySlug('brain', 'second-brain');
      expect(note).not.toBeNull();
      expect(note?.title).toBe('Welcome to my Second Brain');
      expect(note?.html).toContain('My Second Brain');
    });

    it('should return null for non-existent slug', () => {
      const result = getMarkdownBySlug('blog', 'missing-post');
      expect(result).toBeNull();
    });
  });
});
