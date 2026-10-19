import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { Marked } from 'marked';

export function resolveRuntimePath(relativePath: string): string {
  const candidates = [
    path.resolve(process.cwd(), relativePath),
    path.resolve(process.cwd(), '.output', relativePath),
  ];
  return (
    candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0]!
  );
}

const CONTENT_DIR = resolveRuntimePath('content');
const PUBLIC_DIR = resolveRuntimePath('public');

function resolveImage(image?: unknown): string | undefined {
  if (typeof image !== 'string' || !image.trim()) return undefined;
  if (image.startsWith('/')) {
    const filePath = path.join(PUBLIC_DIR, image);
    if (!fs.existsSync(filePath)) return undefined;
  }
  return image;
}

export function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[`*_~<>]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
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
  toc: TocItem[];
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

interface KindleHighlightToken {
  type: 'kindleHighlight';
  raw: string;
  text: string;
  note?: string;
}

const kindleHighlightExtension = {
  name: 'kindleHighlight',
  level: 'inline' as const,
  start(src: string) {
    return src.indexOf('==');
  },
  tokenizer(src: string): KindleHighlightToken | undefined {
    const match = /^==(?!=)([\s\S]+?)==(?:\^\[([^\]]+)\])?/.exec(src);
    if (!match || !match[1]) return undefined;
    return {
      type: 'kindleHighlight',
      raw: match[0],
      text: match[1].trim(),
      note: match[2]?.trim(),
    };
  },
  renderer(token: { text: string; note?: string }) {
    if (!token.note) {
      return `<mark class="kindle-highlight">${token.text}</mark>`;
    }

    return (
      `<span class="kindle-note-wrapper" tabindex="0">` +
      `<mark class="kindle-highlight has-note">${token.text}<span class="kindle-note-badge" aria-hidden="true">✦</span></mark>` +
      `<span class="kindle-note-popover" role="tooltip">` +
      `<span class="kindle-note-label">// Note</span>` +
      `<span class="kindle-note-body">${token.note}</span>` +
      `</span>` +
      `</span>`
    );
  },
};

export function renderMarkdownHtml(content: string): {
  html: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  const parser = new Marked({
    extensions: [kindleHighlightExtension],
    renderer: {
      code({ text, lang }) {
        const language = lang && hljs.getLanguage(lang) ? lang : undefined;
        const highlighted = language
          ? hljs.highlight(text, { language }).value
          : hljs.highlightAuto(text).value;
        const langClass = language ? ` language-${language}` : '';
        return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>\n`;
      },
      heading({ tokens, depth, text }) {
        const innerHtml = this.parser.parseInline(tokens);
        const cleanText = text.replace(/[`*_~]/g, '').trim();
        const baseId = slugifyHeading(cleanText) || `section-${toc.length + 1}`;
        const count = slugCounts.get(baseId) ?? 0;
        slugCounts.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count}`;

        if (depth === 2 || depth === 3) {
          toc.push({ id, text: cleanText, depth });
        }

        return `<h${depth} id="${id}" class="scroll-mt-28">${innerHtml}</h${depth}>\n`;
      },
    },
  });

  const html = parser.parse(content) as string;
  return { html, toc };
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
  const { html, toc } = renderMarkdownHtml(content);

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
    toc,
  };
}
