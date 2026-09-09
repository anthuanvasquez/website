export const useGetFetch = async <T>(path: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error } = await useFetch<T>(path, {
    baseURL: config.public.baseUrl,
    // Only send the internal secret during SSR; never expose it to the browser.
    headers: import.meta.server
      ? {
          'x-internal-secret': config.internalApiSecret,
        }
      : undefined,
  });

  return { data, pending, error };
};
