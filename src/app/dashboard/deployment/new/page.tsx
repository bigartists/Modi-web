import { CONFIG } from 'src/config-global';

import { ProductCreateView } from 'src/sections/deployment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new deployment | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProductCreateView />;
}
