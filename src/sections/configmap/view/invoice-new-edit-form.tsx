'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { usePostaSecret } from 'src/actions/secret';

import { Form as FormProvider } from 'src/components/hook-form';

import { ISecretType } from '../type';
import { arrayToObject } from '../utils';
import InvoiceNewEditDetails from './invoice-new-edit-details';
import InvoiceNewEditStatusDate from './invoice-new-edit-status-date';

// ----------------------------------------------------------------------

type Props = {
  currentInvoice?: any;
};

export default function InvoiceNewEditForm({ currentInvoice }: Props) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();
  const { trigger: postSecret } = usePostaSecret();

  const NewInvoiceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    namespace: Yup.string().required('Namespace is required'),
    type: Yup.string().required('Type is required'),
    items: Yup.lazy(() =>
      Yup.array().of(
        Yup.object({
          key: Yup.string().required('key is required'),
          value: Yup.string().required('value is required'),
        })
      )
    ),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      namespace: '',
      type: ISecretType.Opaque,
      items: [
        {
          key: '',
          value: '',
        },
      ],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSave.onFalse();
      router.push(paths.dashboard.secret.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSave.onFalse();
    }
  });

  // 获取secret
  // kubectl get secret grootsecret  -n groot -o jsonpath={.data.name} | base64 -d
  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    try {
      const result = await postSecret({
        Name: data.name,
        Namespace: data.namespace,
        Type: data.type,
        Data: arrayToObject(data.items || []),
      });
      console.log('🚀 ~ handleCreateAndSend ~ result:', result);
      // reset()
      loadingSend.onFalse();
      router.push(paths.dashboard.secret.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentInvoice ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
