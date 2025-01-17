import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { alpha } from '@mui/material/styles';

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Typography,
} from '@mui/material';

import { useGetStreamPodLogs } from 'src/actions/streamPodLogs';
import { useGetPodContainers, useGetPodLogs } from 'src/actions/deployment';
import { TerminalPanel } from '../terminal/TerminalPanel';
import { Terminal } from './terminal/Terminal';

// ----------------------------------------------------------------------

export default function Shell({ namespace, podname, containerName }: any) {


  // const { trigger: getStreamPodLogs, logs: streamLogs } = useGetStreamPodLogs();
  const { logs, logsLoading } = useGetPodLogs({
    ns: namespace,
    pname: podname,
    cname: containerName,
  });

  return (
    <Box
      sx={{
        m:2,
        p:2,
        borderRadius: 2,
        height: 500,
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        bgcolor: (theme) => theme.palette.common.white, 
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
        <Terminal wsEndpoint={`${process.env.NEXT_PUBLIC_ASSET_URL}/modi/v1/podws?ns=${namespace}&pod=${podname}&container=${containerName}`} className="h-full w-full " />
    </Box>
  );
}
