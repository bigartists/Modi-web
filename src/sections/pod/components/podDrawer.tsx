'use client';

import Stack from '@mui/material/Stack';

import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme, useColorScheme } from '@mui/material/styles';

import { paper, varAlpha } from 'src/theme/styles';
import { defaultFont } from 'src/theme/core/typography';
import { SettingsDrawerProps, useSettingsContext } from 'src/components/settings';
import { FontOptions } from 'src/components/settings/drawer/font-options';
import { Scrollbar } from 'src/components/scrollbar';

// import { Scrollbar } from '../../scrollbar';
// import { FontOptions } from './font-options';
// import { useSettingsContext } from '../context';

// import type { SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function PodDrawer({ children, open, onClose }: any) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      title="Logs"
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({
            theme,
            color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
          }),
          height: 600,
          width: '100vw',
        },
      }}
    >
      <Scrollbar>
        <Stack spacing={6} sx={{ p: 2.5, pb: 5 }}>
          {children}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
