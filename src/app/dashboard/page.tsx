import { CONFIG } from 'src/config-global';

import { TerminalView } from 'src/sections/terminal/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <TerminalView title="Page dashboard" />;
}
