'use client';

import Stack from '@mui/material/Stack';

import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme, useColorScheme } from '@mui/material/styles';

import { paper, varAlpha } from 'src/theme/styles';
import { defaultFont } from 'src/theme/core/typography';
import { SettingsDrawerProps, useSettingsContext } from 'src/components/settings';
import { FontOptions } from 'src/components/settings/drawer/font-options';
import { Scrollbar } from 'src/components/scrollbar';
import { Box, Typography, Tooltip, Badge, IconButton  } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// import { Scrollbar } from '../../scrollbar';
// import { FontOptions } from './font-options';
// import { useSettingsContext } from '../context';

// import type { SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function PodDrawer({ children, open, onClose, title }: any) {
  const theme = useTheme();

  const renderHead = (
    <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {title? title : ''}
      </Typography>

      <Tooltip title="Close">
        <IconButton  onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

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
      {renderHead}
      <Scrollbar>
        <Stack spacing={6} >
          {children}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
