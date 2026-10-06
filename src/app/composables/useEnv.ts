import { validatePublicEnv, type PublicEnv } from '~/utils/env';

/**
 * Type-safe public environment configuration for components and composables.
 */
export function useEnv(): PublicEnv {
  const config = useRuntimeConfig();
  return validatePublicEnv(config.public);
}
