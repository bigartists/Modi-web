import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  const {
    watch,

    formState: { errors },
  } = useFormContext();

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

  const from = useBoolean();

  const to = useBoolean();

  return (
    <Stack
      spacing={{ xs: 3, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={mdUp ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
            From:
          </Typography>

          <IconButton onClick={from.onTrue}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">{invoiceFrom.name}</Typography>
          <Typography variant="body2">{invoiceFrom.fullAddress}</Typography>
          <Typography variant="body2"> {invoiceFrom.phoneNumber}</Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
            To:
          </Typography>

          <IconButton onClick={to.onTrue}>
            <Iconify icon={invoiceTo ? 'solar:pen-bold' : 'mingcute:add-line'} />
          </IconButton>
        </Stack>

        {invoiceTo ? (
          <Stack spacing={1}>
            <Typography variant="subtitle2">{invoiceTo.name}</Typography>
            <Typography variant="body2">{invoiceTo.fullAddress}</Typography>
            <Typography variant="body2"> {invoiceTo.phoneNumber}</Typography>
          </Stack>
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.invoiceTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
