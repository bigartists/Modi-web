import { CONFIG } from 'src/config-global';

import { PodListView } from 'src/sections/pod/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Pod list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <PodListView />;
}
