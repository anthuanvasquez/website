export const useGetFetch = async <T>(path: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error } = await useFetch<T>(path, {
    baseURL: config.public.baseUrl,
  });

  return { data, pending, error };
};
