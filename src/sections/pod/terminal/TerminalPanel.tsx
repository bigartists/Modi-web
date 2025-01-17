import { Box, IconButton, Tab, Tabs, useTheme } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { useState, useRef } from 'react';
import { Terminal, useTerminalStore } from './Terminal';

const MAX_TERMINALS = 3;

interface TerminalPanelProps {
  wsEndpoint: string;
  height?: string | number;
}

export const TerminalPanel = ({ wsEndpoint, height = '800px' }: TerminalPanelProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [terminals, setTerminals] = useState([0]);
  const { showTerminal, toggleTerminal } = useTerminalStore();

  const handleAddTerminal = () => {
    if (terminals.length < MAX_TERMINALS) {
      setTerminals([...terminals, terminals.length]);
      setActiveTab(terminals.length);
    }
  };

  return showTerminal ? (
    <Box
      className="h-full w-full"
      sx={{
        height,
        bgcolor: theme.palette.background.paper,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ flex: 1, minHeight: 48 }}
        >
          {terminals.map((_, index) => (
            <Tab
              key={index}
              icon={<Iconify icon="mingcute:terminal-box-line" />}
              label={`Terminal ${terminals.length > 1 ? index + 1 : ''}`}
              sx={{ minHeight: 48 }}
            />
          ))}
        </Tabs>
       
        {terminals.length < MAX_TERMINALS && (
          <Iconify icon="mingcute:add-line" onClick={handleAddTerminal} />
        )}
        <Iconify icon="mingcute:close-line" onClick={() => toggleTerminal(false)} />
      </Box>

      {terminals.map((_, index) => (
        <Box
          key={index}
          sx={{
            height: 'calc(100% - 48px)',
            display: activeTab === index ? 'block' : 'none',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Terminal wsEndpoint={wsEndpoint} className="h-full w-full" />
        </Box>
      ))}
    </Box>
  ) : null;
};
