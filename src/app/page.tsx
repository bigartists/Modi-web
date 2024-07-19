'use client';

import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useEventListener } from 'src/hooks/use-event-listener';

import { syncToken } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  useEventListener('storage', syncToken);
  const router = useRouter();

  useEffect(() => {
    router.push(CONFIG.auth.redirectPath);
  }, [router]);

  return null;
}
