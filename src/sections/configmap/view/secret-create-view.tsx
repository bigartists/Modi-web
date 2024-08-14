import { Card } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import InvoiceNewEditForm from './invoice-new-edit-form';

// ----------------------------------------------------------------------

export default function ConfigmapCreateView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Configmap"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Configmap', href: paths.dashboard.configmap.root },
          { name: 'New Configmap' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceNewEditForm />
    </DashboardContent>
  );
}
