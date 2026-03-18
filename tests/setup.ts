import { vi } from 'vitest';

// Mock GSAP and its plugins
const gsapMock = {
  registerPlugin: vi.fn(),
  from: vi.fn(),
  to: vi.fn(),
  set: vi.fn(),
  context: vi.fn((cb) => {
    if (typeof cb === 'function') cb();
    return { revert: vi.fn(), add: vi.fn() };
  }),
  timeline: vi.fn(() => ({
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
  })),
};

const ScrollTriggerMock = {
  register: vi.fn(),
  create: vi.fn(),
  getAll: vi.fn(() => []),
  refresh: vi.fn(),
};

// We must use vi.mock with a factory that returns the structure expected by the app
vi.mock('gsap', () => ({
  gsap: gsapMock,
  default: gsapMock,
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: ScrollTriggerMock,
  default: ScrollTriggerMock,
}));

// Mock matchMedia for GSAP and other UI libs
globalThis.matchMedia =
  globalThis.matchMedia ||
  (() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
