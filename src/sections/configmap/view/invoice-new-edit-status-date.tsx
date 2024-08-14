// import {  useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { useGetNamespaces } from 'src/actions/namespace';

import { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { SecretTypeOptions } from '../type';

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  // const {  watch } = useFormContext();
  const { namespaces } = useGetNamespaces();

  // const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField name="name" label="secret name" />

      <RHFSelect
        fullWidth
        name="namespace"
        label="namespace"
        InputLabelProps={{ shrink: true }}
        // PaperPropsSx={{ textTransform: 'capitalize' }}
      >
        {namespaces?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect
        fullWidth
        name="type"
        label="type"
        InputLabelProps={{ shrink: true }}
        // PaperPropsSx={{ textTransform: 'capitalize' }}
      >
        {SecretTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      {/* <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Date create"
            value={field.value}
            onChange={newValue => {
              field.onChange(newValue)
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      /> */}
    </Stack>
  );
}
