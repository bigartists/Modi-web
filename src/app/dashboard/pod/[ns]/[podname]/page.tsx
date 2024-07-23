import { CONFIG } from 'src/config-global';

import { PodDetailView } from 'src/sections/pod/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Deployment detail | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <PodDetailView />;
}
