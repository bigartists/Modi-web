import { CONFIG } from 'src/config-global';

import { SecretCreateView } from 'src/sections/secret/view';

// ----------------------------------------------------------------------

export const metadata = { title: `secret create | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <SecretCreateView />;
}
