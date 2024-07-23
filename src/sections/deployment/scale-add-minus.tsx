import { Box, Stack, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ScaleButtons({
  handleClick,
  count,
}: {
  handleClick: (flag: 'add' | 'minus') => () => void;
  count: number;
}) {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
        <Typography variant="h6"> Scale </Typography>

        <IconButton
          size="small"
          color="primary"
          onClick={handleClick('add')}
          sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Iconify icon="mingcute:add-line" />
        </IconButton>
        <Box>{count}</Box>
        <IconButton
          size="small"
          color="primary"
          onClick={handleClick('minus')}
          sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Stack>
    </div>
  );
}
