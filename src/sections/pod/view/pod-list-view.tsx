'use client';

import type { IProductItem } from 'src/types/product';
import type {
  GridSlots,
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useState, useEffect, useCallback } from 'react';

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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useCombinedStore } from 'src/store';
import { useGetPods } from 'src/actions/deployment';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { Label } from 'src/components/label';
import { Box } from '@mui/material';
import { fDateZn, fTimeZn } from 'src/utils/format-time';
import { RenderCellNsName, RenderCellStatus } from '../product-table-row';

interface CustomToolbarProps {
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

// ----------------------------------------------------------------------

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

function CustomToolbar({
  selectedRowIds,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />

      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {!!selectedRowIds.length && (
          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={onOpenConfirmDeleteRows}
          >
            Delete ({selectedRowIds.length})
          </Button>
        )}

        <GridToolbarColumnsButton />
        <GridToolbarFilterButton ref={setFilterButtonEl} />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
}

export function PodListView() {
  const confirmRows = useBoolean();

  const router = useRouter();

  const { namespace, updateNamespace } = useCombinedStore();

  const { pods, podsLoading } = useGetPods({
    ns: namespace,
    deployment: '',
  });

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (pods.length) {
      setTableData(pods as any);
    }
  }, [pods]);

  const dataFiltered = tableData;

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

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

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRowIds]
  );

  const toPod = useCallback(
    (name: string, ns: string) => () => {
      if (ns && ns.length) {
        updateNamespace(ns);
      }
      // router.push(`/pod/${ns}/${name}`);
      // router.push(`/deployment/info/${ns}/${name}`);
      // router.push(paths.dashboard.deployment.detail(ns, name));
      router.push(`/dashboard/pod/${ns}/${name}`);
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

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Pods"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Pod', href: paths.dashboard.pod.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            getRowId={(row) => `${row.Name}~${row.CreateTime}`}
            columns={columns}
            loading={podsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback as GridSlots['toolbar'],
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              panel: { anchorEl: filterButtonEl },
              toolbar: { setFilterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
