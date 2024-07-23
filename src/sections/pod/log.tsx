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

// ----------------------------------------------------------------------

export default function PodLog({ namespace, podname, containerName }: any) {
  console.log('🚀 ~ PodLog ~ namespace:', namespace, podname, containerName);

  // const { trigger: getStreamPodLogs, logs: streamLogs } = useGetStreamPodLogs();
  const { logs, logsLoading } = useGetPodLogs({
    ns: namespace,
    pname: podname,
    cname: containerName,
  });

  return (
    <Box
      sx={{
        m: 2,
        borderRadius: 2,
        height: '100%',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            margin: 2,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            color: (theme) => (theme.palette.mode === 'light' ? 'grey.800' : 'grey.400'),
          }}
        >
          {logs}
        </Typography>
      </Box>
    </Box>
  );
}
