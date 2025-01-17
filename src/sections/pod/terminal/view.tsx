'use client';

import { DashboardContent } from 'src/layouts/dashboard';
import { TerminalPanel } from './TerminalPanel';
import "@xterm/xterm/css/xterm.css"
import "src/styles/tailwindconf.css"

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

export function TerminalView({ title = 'Blank' }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <TerminalPanel 
        wsEndpoint={`${process.env.NEXT_PUBLIC_ASSET_URL}/modi/v1/podws?ns=infra&pod=taichu-web-66f995596f-9m5sl&container=taichu-web`}
      />
    </DashboardContent>
  );
}
