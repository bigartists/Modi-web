import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { APP_TOKEN } from 'src/configs/globalConstants';

const sseUrl = '/modi/v1/pod/log/stream';

let singleControllerInstance = new AbortController();
const stopSession = () => {
  singleControllerInstance.abort();
};

export { stopSession as stopDebugSession };

export const useGetStreamPodLogs = () => {
  const [innerData, setInnerData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const streamFetch = useCallback(async (payload: { ns: string; pname: string; cname: string }) => {
    singleControllerInstance = new AbortController();
    const token = localStorage.getItem(APP_TOKEN);

    await fetchEventSource(sseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        Authorization: `Bearer ${token}`,
      },
      signal: singleControllerInstance.signal,
      body: JSON.stringify(payload),
      openWhenHidden: true,
      async onopen(resp) {
        const contentype = resp.headers.get('content-type') || '';
        console.log('contentype =>', contentype);
        console.log('resp =>', resp);
        if (resp.status === 401) {
          stopSession();
        }
        if (resp.ok && !contentype.includes('text/event-stream')) {
          const responseData = await resp.json();
          console.log('responseData =>', responseData);
          stopSession();
        }
      },
      onmessage(message: any) {
        // 切换应用 停止当前会话

        const { event, data } = message;

        switch (event) {
          case 'log':
            setInnerData((state) => state + data);
            break;
          default:
            break;
        }
      },
      onerror(err: any) {
        // errorItemFn(err?.msg || '抱歉，暂无法回答该问题')
        console.log('eventSource error: ', `${err}`);
        throw err;
      },
      onclose() {
        console.log('eventSource close');
      },
    });
  }, []);

  // useEffect(() => {
  //   streamFetch(params);
  // }, [params]);

  const memoizedValue = useMemo(
    () => ({
      logs: innerData || '',
      logsLoading: isLoading,
      logsError: error,
      trigger: streamFetch,
    }),
    [error, innerData, isLoading, streamFetch]
  );

  return memoizedValue;
};
