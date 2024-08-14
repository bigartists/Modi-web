'use client';

import type { IProductItem } from 'src/types/product';
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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateZn, fTimeZn } from 'src/utils/format-time';

import { useCombinedStore } from 'src/store';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetConfigmaps } from 'src/actions/configmap';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

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

export default function ConfigmapListView() {
  const confirmRows = useBoolean();

  const router = useRouter();

  const { namespace, updateNamespace } = useCombinedStore();

  const { configmaps, configmapsLoading } = useGetConfigmaps({
    ns: namespace,
  });

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  console.log('🚀 ~ ConfigmapListView ~ configmaps:', configmaps);

  useEffect(() => {
    if (configmaps.length) {
      setTableData(configmaps as any);
    }
  }, [configmaps]);

  const dataFiltered = tableData;

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

  const columns: GridColDef[] = [
    // {
    //   field: 'category',
    //   headerName: 'Category',
    //   filterable: false,
    // },
    {
      field: 'metadata.name',
      headerName: 'Name',
      flex: 1,
      // minWidth: 160,
      maxWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>{params.row.metadata.name}</Box>
      ),

      // renderCell: (params) => (
      //   <RenderCellNsName
      //     params={params}
      //     handleClick={toPod(params.row.Name, params.row.Namespace)}
      //   />
      // ),
    },
    {
      field: 'metadata.namespace',
      headerName: 'Namespace',
      width: 260,
      renderCell: (params) => (
        <Label color="info" sx={{ textTransform: 'capitalize' }}>
          {params.row.metadata.namespace}
        </Label>
      ),
    },

    {
      field: 'metadata.creationTimestamp',
      headerName: 'Create at',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.row.metadata.creationTimestamp}
        </Box>
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
          heading="Configmap"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Configmap', href: paths.dashboard.configmap.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.secret.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Configmap
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
            getRowId={(row) => `${row.metadata.name}~${row.metadata.uid}`}
            columns={columns}
            loading={configmapsLoading}
            getRowHeight={() => 54}
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
