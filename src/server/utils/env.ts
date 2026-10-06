import type { H3Event } from 'h3';
import { validateEnv, type AppEnv } from '~/utils/env';

/**
 * Returns validated and type-safe server runtime configuration.
 */
export function useServerEnv(event?: H3Event): AppEnv {
  const config = event ? useRuntimeConfig(event) : useRuntimeConfig();
  return validateEnv(config);
}
