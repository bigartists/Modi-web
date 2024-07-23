// export const columns: GridColDef[] = [
//     // {
//     //   field: 'category',
//     //   headerName: 'Category',
//     //   filterable: false,
//     // },
//     {
//       field: 'Name',
//       headerName: 'Name',
//       flex: 1,
//       // minWidth: 160,
//       maxWidth: 260,
//       hideable: false,

//       renderCell: (params) => (
//         <RenderCellNsName
//           params={params}
//           handleClick={toPod(params.row.Name, params.row.Namespace)}
//         />
//       ),
//     },
//     {
//       field: 'Namespace',
//       headerName: 'Namespace',
//       // width: 160,
//     },
//     {
//       field: 'IsComplete',
//       headerName: 'Status',
//       // width: 160,
//       renderCell: (params) => <RenderCellStatus params={params} />,
//     },

//     {
//       field: 'Images',
//       headerName: 'Images',
//       flex: 1,
//       minWidth: 260,
//       // renderCell: params => <RenderCellProduct params={params} />,
//     },
//     {
//       field: 'Replicas',
//       headerName: 'Replicas',
//       width: 160,
//       // renderCell: params => <RenderCellProduct params={params} />,
//     },
//     {
//       field: 'CreateTime',
//       headerName: 'Create at',
//       width: 180,
//       // renderCell: params => <RenderCellCreatedAt params={params} />,
//     },
//     {
//       type: 'actions',
//       field: 'actions',
//       headerName: ' ',
//       align: 'right',
//       headerAlign: 'right',
//       width: 80,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       getActions: (params) => [
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:eye-bold" />}
//           label="View"
//           onClick={() => handleViewRow(params.row.Name)}
//         />,
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:pen-bold" />}
//           label="Edit"
//           onClick={() => handleEditRow(params.row.Name)}
//         />,
//         // <GridActionsCellItem
//         //   showInMenu
//         //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
//         //   label="Delete"
//         //   onClick={() => {
//         //     handleDeleteRow(params.row.id)
//         //   }}
//         //   sx={{ color: 'error.main' }}
//         // />,
//       ],
//     },
//   ]
