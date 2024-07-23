import { CONFIG } from 'src/config-global';

import { DeploymentListView } from 'src/sections/deployment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `deployment list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <DeploymentListView />;
}
