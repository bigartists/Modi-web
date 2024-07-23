import { CONFIG } from 'src/config-global';

import { SecretListView } from 'src/sections/secret/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <SecretListView />;
}
