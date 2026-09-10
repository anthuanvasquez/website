import { z } from 'zod';

export const serverEnvSchema = z.object({
  allowedOrigin: z.string().default(''),
  internalApiSecret: z.string().default(''),
  chatSessionSecret: z.string().default(''),
  groqApiKey: z.string().default(''),
});

export const publicEnvSchema = z.object({
  baseUrl: z.string().default(''),
  emailAddress: z.string().default(''),
  mapboxAccessToken: z.string().default(''),
});

export const envSchema = serverEnvSchema.extend({
  public: publicEnvSchema,
});

export const productionEnvSchema = envSchema.extend({
  allowedOrigin: z
    .string()
    .min(1, 'allowedOrigin (NUXT_ALLOWED_ORIGIN) is required in production'),
  chatSessionSecret: z
    .string()
    .min(
      1,
      'chatSessionSecret (NUXT_CHAT_SESSION_SECRET) is required in production'
    ),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type AppEnv = z.infer<typeof envSchema>;

/**
 * Validates public runtime configuration (safe for client and server).
 */
export function validatePublicEnv(config: unknown): PublicEnv {
  const result = publicEnvSchema.safeParse(config);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - public.${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`[Public Env Validation Error]:\n${issues}`);
  }
  return result.data;
}

/**
 * Validates full runtime configuration (server-side).
 */
export function validateEnv(
  config: unknown,
  options?: { isProduction?: boolean }
): AppEnv {
  const isProd = options?.isProduction ?? process.env.NODE_ENV === 'production';

  const schema = isProd ? productionEnvSchema : envSchema;
  const result = schema.safeParse(config);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`[Env Validation Error]:\n${issues}`);
  }

  return result.data;
}
