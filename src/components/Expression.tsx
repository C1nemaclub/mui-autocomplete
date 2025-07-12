import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import CompoundList from './CompoundGenericList/context/CompundList';

const operators: Operator[] = [
  { value: 'contains', label: 'Contains' },
  { value: 'equal', label: 'Equal' },
  { value: 'empty', label: 'Empty' },
];

interface Exp {
  firstVal: string;
  operator: Operator;
  secondVal: string;
}

interface Operator {
  value: string;
  label: string;
}

const Expression = () => {
  const [value, setValue] = useState<Exp[]>([
    {
      firstVal: 'Val',
      operator: { value: operators[0].value, label: operators[0].label },
      secondVal: 'Valen',
    },
  ]);

  return (
    <Stack
      p={1}
      sx={{
        borderWidth: 1,
        borderColor: ({ palette }) => palette.primary.main,
      }}>
      <Stack>
        <CompoundList
          value={value}
          onChange={setValue}
          defaultVal={{
            firstVal: '',
            operator: operators[0],
            secondVal: '',
          }}
          renderItem={(params) => {
            return (
              <Stack
                gap={1}
                sx={{
                  border: '1px solid #ccc',
                  padding: 1.5,
                }}>
                <Stack
                  direction='row'
                  gap={1}
                  alignItems='center'
                  width='100%'
                  justifyContent='space-between'>
                  <Typography>Expression {params.index + 1}</Typography>
                  <IconButton
                    onClick={params.onRemove}
                    disabled={value.length === 1}>
                    <IconTrash />
                  </IconButton>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1} width='100%'>
                  <TextField
                    fullWidth
                    size='small'
                    value={params.value.firstVal}
                    onChange={(e) =>
                      params.onChange({
                        ...params.value,
                        firstVal: e.target.value,
                      })
                    }
                    label='First Value'
                  />
                  <Autocomplete
                    fullWidth
                    size='small'
                    options={operators}
                    value={params.value.operator}
                    disableClearable
                    onChange={(_, v) => {
                      const secondVal =
                        v.value === 'empty' ? '' : params.value.secondVal;
                      params.onChange({
                        ...params.value,
                        operator: v,
                        secondVal,
                      });
                    }}
                    renderInput={(params) => {
                      return <TextField {...params} label='Operator' />;
                    }}
                  />
                  {params.value.operator.value !== 'empty' && (
                    <TextField
                      fullWidth
                      size='small'
                      value={params.value.secondVal}
                      onChange={(e) =>
                        params.onChange({
                          ...params.value,
                          secondVal: e.target.value,
                        })
                      }
                      label='Second Value'
                    />
                  )}
                </Stack>
              </Stack>
            );
          }}>
          <Stack
            gap={1}
            sx={{
              border: '1px solid #aaa',
              p: 1.5,
            }}>
            <CompoundList.Items gap={2} />
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='start'
              gap={2}>
              <CompoundList.AddButton
                variant='contained'
                startIcon={<IconPlus />}>
                Add Expression
              </CompoundList.AddButton>
              <CompoundList.ClearButton variant='outlined' color='error'>
                Remove All
              </CompoundList.ClearButton>
            </Stack>
          </Stack>
        </CompoundList>
      </Stack>
      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </Stack>
  );
};

export default Expression;
