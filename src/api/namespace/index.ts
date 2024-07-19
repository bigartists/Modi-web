import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from 'src/utils/axios';

export function useGetNamespaces() {
  const URL = '/ns';
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    refreshInterval: 100000,
  });

  const memoizedValue = useMemo(
    () => ({
      namespaces: (data?.result as string[]) || [],
      namespacesLoading: isLoading,
      namespacesError: error,
      namespacesValidating: isValidating,
      namespacesEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
