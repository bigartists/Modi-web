import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { fDataTimeZn } from 'src/utils/format-time';

import { varAlpha, bgGradient } from 'src/theme/styles';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function ProfileCover({ coverUrl, pod }: any) {
  const theme = useTheme();
  const { Name, Namespace, Images, Replicas, CreateTime, IsComplete, Phase, Pods, Message } = pod;

  return (
    <Box
      sx={{
        height: 1,
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.7)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 1)}`,
          imgUrl: coverUrl,
        }),
        color: 'common.white',
      }}
    >
      <>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            px: 3,
            pt: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              typography: 'h4',
              color: 'inherit',
              opacity: 0.48,
              flexShrink: 0,
            }}
          >
            Pod:
          </Box>
          <Box component="span" sx={{ color: 'inherit', flexShrink: 0, typography: 'h5' }}>
            {Name}
          </Box>
          <Box component="div" sx={{ color: 'inherit', flexShrink: 0, fontSize: 14 }}>
            {/* <Label variant="soft" color={(IsComplete === true && 'success') || 'default'}>
              {IsComplete === true ? 'Active' : 'Waiting...'}
            </Label> */}
            <Label variant="soft" color={(Phase === 'Running' && 'success') || 'default'}>
              {Phase}
            </Label>
          </Box>
        </Stack>
        <Stack spacing={1} sx={{ p: 3, typography: 'body2' }}>
          <Stack direction="row" alignItems="center" spacing={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box component="span" sx={{ color: 'inherit', opacity: 0.48, flexShrink: 0 }}>
                Namespace:
              </Box>
              <Box component="span" sx={{ color: 'inherit', flexShrink: 0 }}>
                {Namespace}
              </Box>
            </Stack>

            {/* <Stack direction="row" alignItems="center" spacing={1}>
              <Box component="span" sx={{ color: 'inherit', opacity: 0.48, flexShrink: 0 }}>
                Ready:
              </Box>
              <Box component="span" sx={{ color: 'inherit', flexShrink: 0 }}>
                {Replicas?.[0]}/{Replicas?.[1]}
              </Box>
            </Stack> */}

            <Stack direction="row" alignItems="center" spacing={1}>
              <Box component="span" sx={{ color: 'inherit', opacity: 0.48, flexShrink: 0 }}>
                CreateTime:
              </Box>
              <Box component="span" sx={{ color: 'inherit', flexShrink: 0 }}>
                {fDataTimeZn(CreateTime)}
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box component="span" sx={{ color: 'inherit', opacity: 0.48, flexShrink: 0 }}>
              Image:
            </Box>
            <Box component="span" sx={{ color: 'inherit', flexShrink: 0 }}>
              {Images}
            </Box>
          </Stack>
        </Stack>
      </>
    </Box>
  );
}
