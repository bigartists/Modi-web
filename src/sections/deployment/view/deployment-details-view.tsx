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
import { useGetDeployment } from 'src/actions/deployment';
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
import { PodList } from '../pod-list-view';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'pods', label: 'Pods', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  { value: 'services', label: 'Services', icon: <Iconify icon="solar:heart-bold" width={24} /> },
  {
    value: 'ingresses',
    label: 'Ingresses',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'conditions',
    label: 'Conditions',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'recentEvents',
    label: 'Recent Events',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'recentResources',
    label: 'Recent Resources',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export function DeploymentDetailView() {
  let { user } = useMockedUser();
  const { ns, name } = useParams();

  const { deployment, deploymentLoading } = useGetDeployment({
    ns,
    deployment: name,
  });

  user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    photoURL: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-25.webp',
    phoneNumber: '+1 416-555-0198',
    country: 'Canada',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  const tabs = useTabs('pods');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Deployment Info"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.deployment.root },
          { name: user?.displayName },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ mb: 3, height: 220 }}>
        <ProfileCover coverUrl={_userAbout.coverUrl} deployment={deployment} />

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

      {/* {tabs.value === 'pods' && <ProfileHome info={_userAbout} posts={_userFeeds} />} */}
      {tabs.value === 'pods' && <PodList pods={deployment?.Pods} />}

      {tabs.value === 'services' && <h1>followers</h1>}

      {tabs.value === 'ingresses' && <h1>friends</h1>}

      {tabs.value === 'conditions' && <h1>gallery</h1>}
    </DashboardContent>
  );
}
