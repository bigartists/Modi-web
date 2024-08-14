import { CONFIG } from 'src/config-global';

import { ConfigmapListView } from 'src/sections/configmap/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ConfigmapListView />;
}
