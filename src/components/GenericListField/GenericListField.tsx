import { Button, IconButton, Stack, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';

interface RenderFieldProps<T> {
  value: T;
  onChange: (value: T) => void;
}

interface GenericListFieldProps<T> {
  value: T[];
  renderField: (props: RenderFieldProps<T>) => React.ReactNode;
  label?: string;
  onChange: (value: T[]) => void;
  newEntryDefault?: T;
}

const GenericListField = <T,>({
  value,
  onChange,
  renderField,
  label,
  newEntryDefault = {} as T, // Default value for new entries
}: GenericListFieldProps<T>) => {
  const addNewEntry = () => {
    const newList = [...(value || []), newEntryDefault];
    onChange?.(newList);
  };

  const removeEntry = (index: number) => {
    const newList = [...(value || [])].filter((_, i) => i !== index);
    onChange(newList);
  };

  return (
    <>
      <Stack gap={1} sx={{ width: '100%' }}>
        <Typography variant='subtitle2' sx={{ mr: 'auto', mb: 1 }}>
          {label}
        </Typography>
        {value.map((item, index) => (
          <Stack key={index} direction='row' alignItems='center' gap={1}>
            {renderField({
              value: item,
              onChange: (newValue) => {
                const newList = [...(value || [])];
                newList[index] = newValue;
                onChange?.(newList);
              },
            })}
            <IconButton onClick={() => removeEntry(index)}>
              <IconTrash color='red' />
            </IconButton>
          </Stack>
        ))}
        <Button
          variant='outlined'
          onClick={addNewEntry}
          sx={{ width: 'fit-content', alignSelf: 'flex-start' }}>
          <Typography variant='body2'>+</Typography>Add Entry
        </Button>
      </Stack>
    </>
  );
};

export default GenericListField;
