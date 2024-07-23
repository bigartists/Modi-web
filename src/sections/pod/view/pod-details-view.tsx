'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card, { CardProps } from '@mui/material/Card';
import {
  Button,
  CardHeader,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetDeployment, useGetPod, useGetPodContainers } from 'src/actions/deployment';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import type { TableHeadCustomProps } from 'src/components/table';
import { TableHeadCustom } from 'src/components/table';

import { useMockedUser } from 'src/auth/hooks';

import { ProfileHome } from '../profile-home';
import { ProfileCover } from '../profile-cover';
import { ContainerList } from '../container-list-view';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'containers',
    label: 'Containers',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'conditions',
    label: 'Conditions',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'recentResources',
    label: 'Recent Resources',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export function PodDetailView() {
  const { ns, podname } = useParams();

  const { pod, podLoading } = useGetPod({
    ns: ns as string,
    pod: podname as string,
  });

  const { containers, containersLoading } = useGetPodContainers({
    ns: ns as string,
    pname: podname as string,
  });

  const tabs = useTabs('containers');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Pod Info"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'pods', href: paths.dashboard.pod.root },
          { name: podname as string, href: '' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ mb: 3, height: 220 }}>
        <ProfileCover coverUrl={_userAbout.coverUrl} pod={pod} />

        <Box
          display="flex"
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            px: { md: 3 },
            position: 'absolute',
            bgcolor: 'background.paper',
          }}
        >
          <Tabs value={tabs.value} onChange={tabs.onChange}>
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Box>
      </Card>

      {tabs.value === 'containers' && (
        <ContainerList containers={containers} namespace={ns} podname={podname} />
      )}

      {tabs.value === 'services' && <h1>followers</h1>}

      {tabs.value === 'ingresses' && <h1>friends</h1>}

      {tabs.value === 'conditions' && <h1>gallery</h1>}
    </DashboardContent>
  );
}
