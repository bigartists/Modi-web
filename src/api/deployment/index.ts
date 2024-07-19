import useSWR from 'swr';
import { useMemo } from 'react';
import useSWRMutation from 'swr/mutation';

import { fetcher, postFetcher } from 'src/utils/axios';

import { IPodItem, IDeploymentItem } from 'src/pages/Deployment/type';

export const useGetDeployments = (params: any) => {
  const URL = '/deployments';
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
      deployments: (data?.result as IDeploymentItem[]) || [],
      deploymentsLoading: isLoading,
      deploymentsError: error,
      deploymentsValidating: isValidating,
      deploymentsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const useGetPodContainers = (params: { ns: string; pname: string }) => {
  const URL = params
    ? [
        '/pod/containers',
        {
          params,
        },
      ]
    : '/pod/containers';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      containers: data?.result || '',
      containersLoading: isLoading,
      containersError: error,
      containersValidating: isValidating,
      containersEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const useGetPodLogs = (params: { ns: string; pname: string; cname: string }) => {
  const URL = params
    ? [
        '/pod/logs',
        {
          params,
        },
      ]
    : '/pod/logs';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      logs: data?.result || '',
      logsLoading: isLoading,
      logsError: error,
      logsValidating: isValidating,
      logsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const useGetPods = (params: { ns: string; deployment: string }) => {
  const URL = params
    ? [
        '/pods',
        {
          params,
        },
      ]
    : '/pods';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      pods: (data?.result as IPodItem[]) || [],
      podsLoading: isLoading,
      podsError: error,
      podsValidating: isValidating,
      podsEmpty: !isLoading && !data?.result?.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const useScaleDeployment = () => {
  const URL = '/deployment/update/scale';
  async function scaleDeploymentFunc(
    url: string,
    {
      arg,
    }: {
      arg: {
        ns: string;
        deployment: string;
        dec: boolean;
      };
    }
  ) {
    return postFetcher(url, arg);
  }
  const { trigger, isMutating } = useSWRMutation(URL, scaleDeploymentFunc, {
    onSuccess: (data, variables) => console.log('onSuccess', data, variables),
    onError: (error, variables) => console.log('onError', error, variables),
  });
  return { trigger, isMutating };
};
