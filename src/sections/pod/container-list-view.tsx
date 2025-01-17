'use client';

import type { IProductItem } from 'src/types/product';
import type { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';

import { useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, gridClasses, GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fDate, fDateZn, fTime, fTimeZn } from 'src/utils/format-time';

import { useCombinedStore } from 'src/store';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetDeployments, useScaleDeployment } from 'src/actions/deployment';

import { Iconify } from 'src/components/iconify';

import { RenderCellNsName, RenderCellStatus } from './product-table-row';
import { PodDrawer } from './components/podDrawer';
import Log from './log';
import Shell from './shell'

// ----------------------------------------------------------------------

const HIDE_COLUMNS = { category: false };

export function ContainerList({ containers, namespace, podname }: any) {
  const router = useRouter();

  const { deployments, deploymentsLoading } = useGetDeployments({
    ns: namespace,
  });
  const [currentCName, setCName] = useState<string>();

  const [tableData, setTableData] = useState<IProductItem[]>([]);
  const [showDrawer, setDrawerVisbile] = useState<boolean>(false);
  
  const showShellDrawer = useBoolean();

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (containers?.length) {
      setTableData(containers as any);
    }
  }, [containers]);

  const dataFiltered = tableData;

  const showLogs = useCallback((name: string) => {
    setCName(name);
    setDrawerVisbile(true);
  }, []);

  const showShell = useCallback((name: string) => {
    setCName(name);
    showShellDrawer.onTrue()
  },[])

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      maxWidth: 260,
      hideable: false,
    },

    {
      field: 'image',
      headerName: 'Images',
      flex: 1,
      minWidth: 260,
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
          icon={<Iconify icon="solar:documents-bold-duotone" />} 
          label="View Logs"
          onClick={() => showLogs(params.row.name)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:clapperboard-edit-bold" />}
          label="Execute Shell"
          onClick={() => showShell(params.row.Name)}
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

  return (
    <Card
      sx={{
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        height: { xs: 800, md: 2 },
        flexDirection: { md: 'column' },
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        rows={dataFiltered}
        getRowId={(row) => `${row.Name}~${row.CreateTime}`}
        columns={columns}
        loading={deploymentsLoading}
        getRowHeight={() => 'auto'}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        // onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
      />
      <PodDrawer open={showDrawer} onClose={() => setDrawerVisbile(false)}>
        {showDrawer && <Log namespace={namespace} podname={podname} containerName={currentCName} />}
      </PodDrawer>

      <PodDrawer open={showShellDrawer.value} onClose={showShellDrawer.onFalse} title={podname}>
        {showShellDrawer.value && <Shell namespace={namespace} podname={podname} containerName={currentCName} />}
      </PodDrawer>
    </Card>
  );
}
