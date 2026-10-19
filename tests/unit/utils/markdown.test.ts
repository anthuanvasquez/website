import { describe, it, expect } from 'vitest';
import {
  normalizeSlug,
  getAllMarkdown,
  getMarkdownBySlug,
  renderMarkdownHtml,
} from '../../../src/server/utils/markdown';

describe('Markdown Utilities (Unit)', () => {
  describe('normalizeSlug & renderMarkdownHtml', () => {
    it('should strip leading numbers, separators, and extension', () => {
      expect(normalizeSlug('1-hello-world.md')).toBe('hello-world');
      expect(normalizeSlug('02_my_post.md')).toBe('my_post');
      expect(normalizeSlug('3.clean-slug.md')).toBe('clean-slug');
      expect(normalizeSlug('just-a-slug.md')).toBe('just-a-slug');
    });

    it('should render Obsidian-compatible Kindle highlights and inline notes', () => {
      const { html } = renderMarkdownHtml(
        'Check ==this highlight== and ==this annotated phrase==^[My Kindle note]!'
      );
      expect(html).toContain(
        '<mark class="kindle-highlight">this highlight</mark>'
      );
      expect(html).toContain('class="kindle-highlight has-note"');
      expect(html).toContain(
        '<span class="kindle-note-body">My Kindle note</span>'
      );
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
});

describe('getMarkdownBySlug (Unit)', () => {
  it('should load and render a post by normalized slug and omit non-existent local image', () => {
    const post = getMarkdownBySlug('blog', 'hello-world');
    expect(post?.title).toBe('Bienvenido a Mi Blog');
    expect(post?.meta.image).toBeUndefined();
    expect(post?.html).toContain('Hello World');
  });

  it('should load and render a post with local image, syntax highlighting, and TOC', () => {
    const post = getMarkdownBySlug('blog', '2-git-commands');
    expect(post?.meta.image).toBe('/images/blog/git-commands.jpg');
    expect(post?.html).toContain('<code class="hljs language-bash">');
    expect(post?.toc[0]).toEqual({
      id: '1-git-cherry-pick',
      text: '1. git cherry-pick',
      depth: 2,
    });
    expect(post?.html).toContain('id="1-git-cherry-pick"');
  });

  it('should load and render a second brain note with table of contents', () => {
    const note = getMarkdownBySlug('brain', 'second-brain');
    expect(note?.title).toBe('Welcome to my Second Brain');
    expect(note?.toc).toEqual([
      { id: 'que-sigue', text: '¿Qué sigue?', depth: 2 },
    ]);
  });

  it('should return null for non-existent slug', () => {
    expect(getMarkdownBySlug('blog', 'missing-post')).toBeNull();
  });
});
