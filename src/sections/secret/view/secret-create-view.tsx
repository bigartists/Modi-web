import { Card } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import InvoiceNewEditForm from './invoice-new-edit-form';

// ----------------------------------------------------------------------

export default function SecretCreateView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Secret"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Secret', href: paths.dashboard.secret.root },
          { name: 'New secret' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceNewEditForm />
    </DashboardContent>
  );
}
