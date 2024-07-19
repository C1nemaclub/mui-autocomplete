import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { FormikEntity } from '../utils/data.model';

interface NumericInputProps {
  form: FormikProps<FormikEntity>;
}

const NumericInput: FC<NumericInputProps> = ({ form }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/[^0-9]/)) {
      event.preventDefault();
      return;
    }

    form.setFieldValue('age', Number(event.target.value));
  };
  return (
    <TextField
      value={form.values.age}
      fullWidth
      name='age'
      id='phone_number'
      label='Age'
      variant='outlined'
      inputProps={{ inputMode: 'numeric' }}
      onChange={handleChange}
    />
  );
};

export default NumericInput;
