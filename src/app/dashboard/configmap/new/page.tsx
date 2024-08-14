import { CONFIG } from 'src/config-global';

import { ConfigmapCreateView } from 'src/sections/configmap/view';

// ----------------------------------------------------------------------

export const metadata = { title: `secret create | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ConfigmapCreateView />;
}
