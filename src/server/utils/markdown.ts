import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

export interface MarkdownMetadata {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  alt?: string;
  duration?: string;
  tags?: string[];
  published?: boolean;
  [key: string]: unknown;
}

export interface MarkdownItem extends MarkdownMetadata {
  slug: string;
  path: string;
  meta: MarkdownMetadata;
}

export interface MarkdownDocument {
  meta: MarkdownMetadata;
  title: string;
  description: string;
  html: string;
  slug: string;
}

/**
 * Normalizes a filename to a clean slug.
 * Removes .md extension and optional leading sorting numbers (e.g. 1-hello-world -> hello-world).
 */
export function normalizeSlug(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d+[-_.]/, '');
}

/**
 * Returns all markdown files in a given content subfolder.
 */
export function getAllMarkdown(folder: string): MarkdownItem[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'));

  const items: MarkdownItem[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data } = matter(raw);
    const slug = normalizeSlug(file);

    return {
      slug,
      path: `/${folder}/${slug}`,
      meta: data as MarkdownMetadata,
      ...(data as MarkdownMetadata),
    };
  });

  return items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

/**
 * Retrieves and renders a single markdown file by folder and slug.
 */
export function getMarkdownBySlug(
  folder: string,
  slug: string
): MarkdownDocument | null {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'));

  const matchedFile = files.find(
    (file) => file.replace(/\.md$/, '') === slug || normalizeSlug(file) === slug
  );

  if (!matchedFile) return null;

  const raw = fs.readFileSync(path.join(dir, matchedFile), 'utf-8');
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;

  return {
    meta: data as MarkdownMetadata,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    html,
    slug,
  };
}
