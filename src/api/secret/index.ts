import useSWR from 'swr';
import { useMemo } from 'react';
import useSWRMutation from 'swr/mutation';

import { fetcher, postFetcher } from 'src/utils/axios';

import { ISecret } from 'src/pages/Secret/type';

export const useGetSecrets = (params: any) => {
  const URL = '/secret';
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
      secrets: (data?.result as ISecret[]) || [],
      secretsLoading: isLoading,
      secretsError: error,
      secretsValidating: isValidating,
      secretsEmpty: !isLoading && !data?.result?.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const usePostaSecret = () => {
  const URL = '/secret';
  async function postaSecret(
    url: string,
    {
      arg,
    }: {
      arg: {
        Name: string;
        Namespace: string;
        Type: string;
        Data: { key: string; value: string }[];
      };
    }
  ) {
    return postFetcher(url, arg);
  }
  const { trigger, isMutating } = useSWRMutation(URL, postaSecret, {
    onSuccess: (data, variables) => console.log('onSuccess', data, variables),
    onError: (error, variables) => console.log('onError', error, variables),
  });
  return { trigger, isMutating };
};
