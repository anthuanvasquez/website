import { describe, it, expect } from 'vitest';
import { validatePublicEnv, validateEnv } from '../../../app/utils/env';

describe('utils/env', () => {
  it('provides default empty strings when empty object is passed to validatePublicEnv', () => {
    const result = validatePublicEnv({});
    expect(result).toEqual({
      baseUrl: '',
      emailAddress: '',
      mapboxAccessToken: '',
    });
  });

  it('correctly parses provided public env values', () => {
    const input = {
      baseUrl: 'https://anthuanvasquez.net',
      emailAddress: 'anthuanvasquez@gmail.com',
      mapboxAccessToken: 'pk.test-token',
    };
    const result = validatePublicEnv(input);
    expect(result).toEqual(input);
  });

  it('throws an error for invalid types in public env', () => {
    expect(() => validatePublicEnv({ baseUrl: 12345 })).toThrow(
      /Public Env Validation Error/
    );
  });

  it('parses valid server and public env with defaults in dev/test', () => {
    const result = validateEnv(
      {
        allowedOrigin: '',
        internalApiSecret: '',
        chatSessionSecret: '',
        groqApiKey: '',
        public: {
          baseUrl: '',
          emailAddress: '',
          mapboxAccessToken: '',
        },
      },
      { isProduction: false }
    );

    expect(result.allowedOrigin).toBe('');
    expect(result.public.baseUrl).toBe('');
  });

  it('throws when required production variables are missing in production mode', () => {
    expect(() =>
      validateEnv(
        {
          allowedOrigin: '',
          internalApiSecret: 'secret',
          chatSessionSecret: '',
          groqApiKey: 'groq-key',
          public: {
            baseUrl: 'https://anthuanvasquez.net',
            emailAddress: 'test@example.com',
            mapboxAccessToken: 'token',
          },
        },
        { isProduction: true }
      )
    ).toThrow(/Env Validation Error/);
  });

  it('succeeds in production mode when required variables are present', () => {
    const validProdConfig = {
      allowedOrigin: 'https://anthuanvasquez.net',
      internalApiSecret: 'internal-secret',
      chatSessionSecret: 'super-secure-chat-session-secret-1234',
      groqApiKey: 'groq-key',
      public: {
        baseUrl: 'https://anthuanvasquez.net',
        emailAddress: 'anthuanvasquez@gmail.com',
        mapboxAccessToken: 'mapbox-token',
      },
    };

    const result = validateEnv(validProdConfig, { isProduction: true });
    expect(result).toEqual(validProdConfig);
  });
});
