export const useGetFetch = async <T>(path: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error } = await useFetch<T>(path, {
    baseURL: config.public.baseUrl,
    headers: {
      'x-internal-secret': config.internalApiSecret,
    },
  });

  return { data, pending, error };
};
