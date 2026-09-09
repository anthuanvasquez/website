import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiGuardHandler from '../../server/middleware/api-guard';

vi.hoisted(() => {
  // @ts-expect-error - mock global
  globalThis.defineEventHandler = (handler) => handler;
  // @ts-expect-error - mock global
  globalThis.createError = (err) => {
    const error = new Error(err.statusMessage || 'Error');
    // @ts-expect-error - dynamic property
    error.statusCode = err.statusCode;
    // @ts-expect-error - dynamic property
    error.statusMessage = err.statusMessage;
    return error;
  };
  // @ts-expect-error - mock global
  globalThis.getHeader = (
    event: { headers?: Record<string, string> },
    name: string
  ) => {
    const key = name.toLowerCase();
    const headers = event.headers || {};
    return (
      headers[key] ??
      headers[name] ??
      Object.entries(headers).find(([h]) => h.toLowerCase() === key)?.[1]
    );
  };
});

const createMockEvent = (
  path: string,
  headers: Record<string, string> = {}
) => ({
  path,
  headers,
});

describe('server/middleware/api-guard', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    const config = useRuntimeConfig();
    config.allowedOrigin = 'https://anthuanvasquez.net';
    config.internalApiSecret = 'test-internal-secret';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    const config = useRuntimeConfig();
    config.allowedOrigin = '';
    config.internalApiSecret = '';
  });

  it('should ignore non-API routes', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/about');

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should ignore root route', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/');

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should allow development bypass when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    const event = createMockEvent('/api/experiences');

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should bypass guard with valid x-internal-secret in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/chatbot/chat', {
      'x-internal-secret': 'test-internal-secret',
    });

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should not bypass guard when x-internal-secret does not match in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/chatbot/chat', {
      'x-internal-secret': 'wrong-secret',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 403,
        statusMessage: 'Forbidden: Missing Origin or Referer',
      })
    );
  });

  it('should not bypass guard when internalApiSecret is empty even if header matches', () => {
    process.env.NODE_ENV = 'production';
    useRuntimeConfig().internalApiSecret = '';
    const event = createMockEvent('/api/chatbot/chat', {
      'x-internal-secret': '',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 403,
        statusMessage: 'Forbidden: Missing Origin or Referer',
      })
    );
  });

  it('should reject with 403 when both origin and referer are missing in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/experiences');

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 403,
        statusMessage: 'Forbidden: Missing Origin or Referer',
      })
    );
  });

  it('should reject with 500 when allowedOrigin is not configured in production', () => {
    process.env.NODE_ENV = 'production';
    useRuntimeConfig().allowedOrigin = '';
    const event = createMockEvent('/api/experiences', {
      origin: 'https://anthuanvasquez.net',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 500,
        statusMessage: 'Server configuration error: Allowed Origin not set',
      })
    );
  });

  it('should reject with 500 when allowedOrigin configuration is an invalid URL', () => {
    process.env.NODE_ENV = 'production';
    useRuntimeConfig().allowedOrigin = 'not-a-valid-url';
    const event = createMockEvent('/api/experiences', {
      origin: 'https://anthuanvasquez.net',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 500,
        statusMessage: 'Server configuration error: Invalid Allowed Origin',
      })
    );
  });

  it('should reject with 403 when request origin is an invalid URL in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/experiences', {
      origin: 'invalid-url',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 403,
        statusMessage: 'Forbidden: Invalid request source',
      })
    );
  });

  it('should reject with 403 when origin host does not match allowed host', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/experiences', {
      origin: 'https://unauthorized-domain.com',
    });

    expect(() => apiGuardHandler(event as never)).toThrowError(
      expect.objectContaining({
        statusCode: 403,
        statusMessage: 'Forbidden: Unauthorized origin',
      })
    );
  });

  it('should allow request when origin host matches allowed host in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/experiences', {
      origin: 'https://anthuanvasquez.net',
    });

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should allow request when referer matches and origin is missing in production', () => {
    process.env.NODE_ENV = 'production';
    const event = createMockEvent('/api/experiences', {
      referer: 'https://anthuanvasquez.net/projects?query=test',
    });

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });

  it('should allow request when allowedOrigin and origin include matching ports', () => {
    process.env.NODE_ENV = 'production';
    useRuntimeConfig().allowedOrigin = 'http://localhost:3000';
    const event = createMockEvent('/api/experiences', {
      origin: 'http://localhost:3000',
    });

    expect(() => apiGuardHandler(event as never)).not.toThrow();
  });
});
