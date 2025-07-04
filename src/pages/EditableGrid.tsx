import { CalendarMonth } from '@mui/icons-material';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import {
  DataGridPro,
  GridEditInputCell,
  GridRowModes,
  useGridApiContext,
  useGridApiRef,
  type GridColDef,
  type GridEditCellProps,
  type GridEventListener,
  type GridPreProcessEditCellProps,
  type GridRenderEditCellParams,
  type GridRowId,
  type GridRowModel,
  type GridRowModesModel,
  type GridRowParams,
  type GridValueGetterParams,
  type GridValueSetterParams,
  type MuiEvent,
} from '@mui/x-data-grid-pro';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Icon123,
  IconCheck,
  IconEdit,
  IconPlayerStop,
} from '@tabler/icons-react';
import { useState } from 'react';
import CustomPopper from '../components/CustomPopper/CustomPopper';

type ValueType = string | number | Date;

interface RowData {
  id: number;
  data: {
    name: string;
    age: number;
    address: string;
    birthday: Date;
  };
  isNew: boolean;
}

const headers = [
  {
    id: 'name',
    label: 'name',
    type: 'string',
  },
  {
    id: 'age',
    label: 'age',
    type: 'number',
  },
  {
    id: 'address',
    label: 'address',
    type: 'string',
  },
  {
    id: 'birthday',
    label: 'birthday 🎂',
    type: 'date',
  },
];

const EditableGrid = () => {
  const apiRef = useGridApiRef();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 1,
      data: {
        name: 'Jon',
        age: 35,
        address: 'North',
        birthday: new Date('1990-01-01'),
      },
      isNew: false,
    },
    {
      id: 2,
      data: {
        name: 'Cersei',
        age: 42,
        address: 'King Landing',
        birthday: new Date('1991-02-01'),
      },
      isNew: false,
    },
  ]);

  const processRowUpdate = async (newRow: GridRowModel<RowData>) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowEditStart = (
    _: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (_, event) => {
    event.defaultMuiPrevented = true;
  };

  const columns2: GridColDef<RowData, ValueType>[] = [
    ...headers.map((header) => {
      return {
        field: header.id,
        headerName: header.label,
        width: 150,
        editable: true,
        flex: 1,
        type: header.type,
        valueGetter: (params: GridValueGetterParams<any, RowData>) =>
          params.row.data[header.id as keyof RowData['data']],
        valueSetter: (params: GridValueSetterParams<RowData, ValueType>) => {
          const newValue = params.value;
          const settedrow: RowData = {
            ...params.row,
            data: Object.assign(
              { ...params.row.data },
              {
                [header.id as keyof RowData['data']]: newValue,
              }
            ),
          };
          return settedrow;
          // const newValue = params.value;
          // const settedRow: RowData = {
          //   ...params.row,
          //   data: {
          //     ...params.row.data,
          //     [header.id as keyof RowData['data']]: newValue,
          //   },
          // };
          // return settedRow;
        },
        preProcessEditCellProps: (
          params: GridPreProcessEditCellProps<ValueType, RowData>
        ): GridEditCellProps => {
          const msg = params.props.value === 'hola' ? 'yes' : 'no';
          console.log(params.props.value, 'ERROR');
          return { ...params.props, error: msg };
        },
        renderEditCell: (params) => {
          console.log(params);
          switch (header.type) {
            case 'date':
              return <CustomDateEdit {...params} />;
            default:
              return (
                <GridEditInputCell
                  {...params}
                  error={true}
                  endAdornment={<Icon123 size={40} />}
                  color='error'
                  classes={{
                    root: 'xaxaxaxaxa',
                    input: 'xaxaxaxaxa',
                  }}
                  style={
                    {
                      // border: '1px solid red',
                    }
                  }
                />
              );
          }
        },
        // cellClassName: (params: GridCellParams): string => {
        //   console.log('clasnamereturn', params.error);
        //   const x: GridRenderEditCellParams;
        //   if (params.row.isNew) {
        //     return 'MuiDataGrid-cell--newxaxaxaxaxa';
        //   }
        //   return 'xaxaxaxaxaxaxaxa';
        // },
        // renderCell: (params) => {
        //   // if error return red
        //   console.log(params, 'RENDER CEL 👽👽👽👽👽');

        //   if (params.error) {
        //     return (
        //       <Typography color={'red'}>
        //         {params.row.data[header.id as keyof RowData['data']]}
        //       </Typography>
        //     );
        //   }
        //   return (
        //     <Typography>
        //       {params.row.data[header.id as keyof RowData['data']]}
        //     </Typography>
        //   );
        // },
      };
    }),
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      flex: 1,
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return (
            <Stack
              direction={'row'}
              justifyContent={'end'}
              alignItems={'center'}
              width={'100%'}>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleCancelClick(params.id)}>
                <IconPlayerStop />
              </IconButton>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleSaveClick(params.id)}>
                <IconCheck />
              </IconButton>
            </Stack>
          );
        }
        return (
          <Stack
            direction={'row'}
            justifyContent={'end'}
            alignItems={'center'}
            width={'100%'}>
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => handleEditClick(params.id)}>
              <IconEdit />
            </IconButton>
          </Stack>
        );
      },
    },
  ] satisfies GridColDef<RowData, ValueType>[];

  const columns: GridColDef<RowData, ValueType>[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
      flex: 1,
      valueGetter: (params) => params.row.data.name,
      valueSetter: (params) => {
        const newValue = params.value;
        const settedRow: RowData = {
          ...params.row,
          data: { ...params.row.data, name: String(newValue) },
        };
        return settedRow;
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
      flex: 1,
      editable: true,
      valueGetter: (params) => params.row.data.age,
      valueSetter: (params) => {
        const newValue = params.value;
        const settedRow: RowData = {
          ...params.row,
          data: { ...params.row.data, age: Number(newValue) },
        };
        return settedRow;
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      flex: 1,
      editable: true,
      valueGetter: (params) => params.row.data.address,
      valueSetter: (params) => {
        const newValue = params.value;
        const settedRow: RowData = {
          ...params.row,
          data: { ...params.row.data, address: String(newValue) },
        };
        return settedRow;
      },
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      type: 'date',
      width: 180,
      flex: 1,
      editable: true,
      valueGetter: (params) => params.row.data.birthday,
      valueSetter: (params) => {
        const newValue = params.value;
        const settedRow: RowData = {
          ...params.row,
          data: { ...params.row.data, birthday: new Date(newValue) },
        };
        return settedRow;
      },
      renderEditCell: (params) => <CustomDateEdit {...params} />,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      flex: 1,
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return (
            <Stack
              direction={'row'}
              justifyContent={'end'}
              alignItems={'center'}
              width={'100%'}>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleCancelClick(params.id)}>
                <IconPlayerStop />
              </IconButton>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleSaveClick(params.id)}>
                <IconCheck />
              </IconButton>
            </Stack>
          );
        }
        return (
          <Stack
            direction={'row'}
            justifyContent={'end'}
            alignItems={'center'}
            width={'100%'}>
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => handleEditClick(params.id)}>
              <IconEdit />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Stack
        height={'100%'}
        minWidth={700}
        padding={2}
        alignItems={'center'}
        justifyContent={'center'}>
        <DataGridPro
          apiRef={apiRef}
          rows={rows}
          columns={columns2}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          autoHeight
          editMode='row'
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          onRowEditCommit={(params) => {
            console.log('onRowEditCommit', params);
            // const updatedRow = processRowUpdate(params);
          }}
          getCellClassName={(params) => {
            console.log('PRORPRORPRPR', params);
            if (params.error) {
              return 'error';
            }
            return '';
          }}
          sx={{
            width: 700,
          }}
        />
      </Stack>
      <pre>{JSON.stringify({ rows }, null, 2)}</pre>
    </>
  );
};

const CustomDateEdit = (props: GridRenderEditCellParams<ValueType>) => {
  const apiRef = useGridApiContext();

  return (
    <>
      <CustomPopper
        renderAnchor={({ onClick }) => {
          return (
            <Stack
              direction={'row'}
              alignItems={'center'}
              gap={1}
              justifyContent={'space-between'}
              sx={{
                width: '100%',
              }}>
              <Typography>
                {props.value ? new Date(props.value).toLocaleDateString() : ''}
              </Typography>
              <IconButton onClick={onClick} sx={{ padding: 0 }}>
                <CalendarMonth />
              </IconButton>
            </Stack>
          );
        }}>
        {(close) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                // displayStaticWrapperAs='desktop'
                value={props.value}
                onChange={(newValue) => {
                  if (!newValue) return;
                  apiRef.current.setEditCellValue({
                    id: props.id,
                    field: props.field,
                    value: newValue,
                  });
                }}
                onAccept={() => {
                  console.log('closing');
                  close();
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          );
        }}
      </CustomPopper>
    </>
  );
};

export default EditableGrid;
