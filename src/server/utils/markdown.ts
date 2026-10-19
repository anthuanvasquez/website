import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : undefined;
      const highlighted = language
        ? hljs.highlight(text, { language }).value
        : hljs.highlightAuto(text).value;
      const langClass = language ? ` language-${language}` : '';
      return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>\n`;
    },
  },
});

const CONTENT_DIR = path.resolve(process.cwd(), 'content');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function resolveImage(image?: unknown): string | undefined {
  if (typeof image !== 'string' || !image.trim()) return undefined;
  if (image.startsWith('/')) {
    const filePath = path.join(PUBLIC_DIR, image);
    if (!fs.existsSync(filePath)) return undefined;
  }
  return image;
}

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
    const meta: MarkdownMetadata = {
      ...(data as MarkdownMetadata),
      image: resolveImage(data.image),
    };

    return {
      slug,
      path: `/${folder}/${slug}`,
      meta,
      ...meta,
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
  const meta: MarkdownMetadata = {
    ...(data as MarkdownMetadata),
    image: resolveImage(data.image),
  };

  return {
    meta,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    html,
    slug,
  };
}
