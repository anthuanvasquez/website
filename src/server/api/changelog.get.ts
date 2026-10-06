import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type {
  ChangelogEra,
  ChangelogResponse,
  ChangelogSection,
} from '~/types';

interface ParserState {
  currentEra: ChangelogEra | null;
  currentSection: ChangelogSection | null;
  summaryLines: string[];
}

function flushSummary(state: ParserState) {
  if (
    state.currentEra &&
    state.summaryLines.length > 0 &&
    !state.currentEra.summary
  ) {
    state.currentEra.summary = state.summaryLines.join(' ').trim();
  }
  state.summaryLines = [];
}

function handleEraHeader(
  line: string,
  state: ParserState,
  eras: ChangelogEra[]
): boolean {
  const match = line.match(/^##\s+\[([^\]]+)\](?:\s*-\s*(.+))?/);
  if (!match || !match[1]) return false;

  if (state.currentEra) {
    flushSummary(state);
    eras.push(state.currentEra);
  }

  state.currentEra = {
    version: match[1].trim(),
    date: (match[2] || '').trim(),
    summary: '',
    sections: [],
  };
  state.currentSection = null;
  state.summaryLines = [];
  return true;
}

function handleSectionHeader(line: string, state: ParserState): boolean {
  const match = line.match(/^###\s+(.+)/);
  if (!match || !match[1] || !state.currentEra) return false;

  flushSummary(state);
  state.currentSection = {
    title: match[1].trim(),
    items: [],
  };
  state.currentEra.sections.push(state.currentSection);
  return true;
}

function handleBulletItem(line: string, state: ParserState): boolean {
  const match = line.match(/^\s*-\s+(.+)/);
  if (!match || !match[1] || !state.currentEra) return false;

  const html = marked.parseInline(match[1].trim()) as string;
  if (!state.currentSection) {
    state.currentSection = { title: 'Overview', items: [] };
    state.currentEra.sections.push(state.currentSection);
  }
  state.currentSection.items.push(html);
  return true;
}

export function parseChangelogContent(content: string): ChangelogEra[] {
  const eras: ChangelogEra[] = [];
  const state: ParserState = {
    currentEra: null,
    currentSection: null,
    summaryLines: [],
  };

  for (const line of content.split('\n')) {
    if (handleEraHeader(line, state, eras)) continue;
    if (handleSectionHeader(line, state)) continue;
    if (handleBulletItem(line, state)) continue;

    const isSummary =
      !state.currentSection &&
      line.trim() &&
      !line.startsWith('#') &&
      !line.startsWith('---');

    if (isSummary) {
      state.summaryLines.push(line.trim());
    }
  }

  if (state.currentEra) {
    flushSummary(state);
    eras.push(state.currentEra);
  }

  return eras;
}

function getCurrentVersion(): string {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) return '2026';
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    return pkg.version || '2026';
  } catch {
    return '2026';
  }
}

export default defineEventHandler((): ChangelogResponse => {
  const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'CHANGELOG.md not found',
    });
  }

  const content = fs.readFileSync(changelogPath, 'utf-8');
  return {
    currentVersion: getCurrentVersion(),
    eras: parseChangelogContent(content),
  };
});
