import { validateEnv } from '~/utils/env';

export default defineNitroPlugin(() => {
  try {
    const config = useRuntimeConfig();
    validateEnv(config);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error(error);
      throw error;
    } else {
      console.warn(error);
    }
  }
});
