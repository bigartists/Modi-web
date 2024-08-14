import type { ISecret } from 'src/types/secret';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from 'src/utils/axios';

export const useGetConfigmaps = (params: any) => {
  const URL = '/configmaps';
  const { data, isLoading, error, isValidating } = useSWR(
    [
      URL,
      {
        params,
      },
    ],
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      configmaps: (data?.result as ISecret[]) || [],
      configmapsLoading: isLoading,
      configmapsError: error,
      configmapsValidating: isValidating,
      configmapsEmpty: !isLoading && !data?.result?.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};
