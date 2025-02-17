import { CheckBox } from '@mui/icons-material';
import { Stack, TextField } from '@mui/material';
import type { FC } from 'react';
import JSONComponent from './JSONComponent';

interface ValueComponentProps {
  keyType: string;
  value: any;
}

const ValueComponent: FC<ValueComponentProps> = ({ keyType, value }) => {
  const renderFieldBaseOnType = (keyType: string, key: any) => {
    switch (keyType) {
      case 'string':
        return (
          <TextField label='Value' variant='outlined' size='small' fullWidth />
        );
      case 'number':
        return (
          <TextField
            fullWidth
            label='Value'
            variant='outlined'
            size='small'
            type='number'
          />
        );
      case 'boolean':
        return <CheckBox />;
      case 'object':
        return <JSONComponent obj={key} />;
      default:
        return <></>;
    }
  };
  return (
    <Stack direction='row' gap={1} sx={{ width: '100%' }}>
      {renderFieldBaseOnType(keyType, value)}
    </Stack>
  );
};

export default ValueComponent;
