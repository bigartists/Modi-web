import { CONFIG } from 'src/config-global';

import { DeploymentDetailView } from 'src/sections/deployment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Deployment detail | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  // const { ns, name } = useParams();
  // return <>{/* {ns}详情页{name} */}</>;
  return <DeploymentDetailView />;
}
