'use client';

import type { UseSetStateReturn } from 'src/hooks/use-set-state';
import type { IProductItem, IProductTableFilters } from 'src/types/product';
import type {
  GridSlots,
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { useCombinedStore } from 'src/store';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetDeployments, useScaleDeployment } from 'src/actions/deployment';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { RenderCellNsName, RenderCellStatus } from './product-table-row';
import ScaleButtons from './scale-add-minus';
import { Label } from 'src/components/label';
import { fDate, fDateZn, fTime, fTimeZn } from 'src/utils/format-time';

interface CustomToolbarProps {
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

// ----------------------------------------------------------------------

const HIDE_COLUMNS = { category: false };

export function PodList({ pods }: any) {
  const confirmRows = useBoolean();
  const { ns: namespaceName, name: deploymentName } = useParams();

  const router = useRouter();

  const { namespace, updateNamespace } = useCombinedStore();

  const { deployments, deploymentsLoading } = useGetDeployments({
    ns: namespace,
  });

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (pods?.length) {
      setTableData(pods as any);
    }
  }, [pods]);

  const dataFiltered = tableData;

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  const toPod = useCallback(
    (name: string, ns: string) => () => {
      if (ns && ns.length) {
        updateNamespace(ns);
      }
      // router.push(`/pod/${ns}/${name}`);
      // router.push(`/deployment/info/${ns}/${name}`);
      // router.push(paths.dashboard.deployment.detail(ns, name));
      router.push(`/dashboard/deployment/${ns}/${name}`);
    },
    [router, updateNamespace]
  );

  const columns: GridColDef[] = [
    {
      field: 'Phase',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => (
        <Label variant="soft" color={(params.row.Phase === 'Running' && 'success') || 'default'}>
          {params.row.Phase}
        </Label>
      ),
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      maxWidth: 260,
      hideable: false,
      renderCell: (params) => (
        <RenderCellNsName
          params={params}
          handleClick={toPod(params.row.Name, params.row.Namespace)}
        />
      ),
    },
    {
      field: 'Namespace',
      headerName: 'Namespace',
    },

    {
      field: 'Images',
      headerName: 'Images',
      flex: 1,
      minWidth: 260,
    },

    {
      field: 'CreateTime',
      headerName: 'Create at',
      width: 180,
      renderCell: (params) => (
        <Stack spacing={0.5}>
          <Box component="span">{fDateZn(params.row.CreateTime)}</Box>
          <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
            {fTimeZn(params.row.CreateTime)}
          </Box>
        </Stack>
      ),
    },
    {
      field: 'NodeName',
      headerName: 'NodeName',
      width: 180,
    },
    {
      field: 'IsReady',
      headerName: 'IsReady',
      width: 180,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.Name)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.Name)}
        />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        //   label="Delete"
        //   onClick={() => {
        //     handleDeleteRow(params.row.id)
        //   }}
        //   sx={{ color: 'error.main' }}
        // />,
      ],
    },
  ];
  const { trigger: scaleDeployment } = useScaleDeployment();

  const scaleDep = useCallback(
    (flag: 'add' | 'minus') => async () => {
      await scaleDeployment({
        ns: (namespaceName as string) || '',
        deployment: (deploymentName as string) || '',
        dec: flag === 'minus',
      });
    },
    [deploymentName, namespaceName, scaleDeployment]
  );

  return (
    <Card
      sx={{
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        height: { xs: 800, md: 2 },
        flexDirection: { md: 'column' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 4,
          py: 2.5,
        }}
      >
        <ScaleButtons handleClick={scaleDep} count={pods?.length} />
      </Box>

      <DataGrid
        disableRowSelectionOnClick
        rows={dataFiltered}
        getRowId={(row) => `${row.Name}~${row.CreateTime}`}
        columns={columns}
        loading={deploymentsLoading}
        getRowHeight={() => 'auto'}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
      />
    </Card>
  );
}
