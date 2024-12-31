import AddIcon from '@mui/icons-material/Add';
import { IconButton, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { FormikEntity } from '../utils/data.model';
interface NumericInputProps {
  form: FormikProps<FormikEntity>;
}

const NumericInput: FC<NumericInputProps> = ({ form }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/[^0-9]/)) {
      event.preventDefault();
      return;
    }
    if (value === '') {
      form.setFieldValue('age', '', true);
      return;
    }

    form.setFieldValue('age', Number(value), true);
  };

  const isError = Boolean(form.errors.age && form.touched.age);

  return (
    <TextField
      type='tel'
      fullWidth
      value={form.values.age}
      name='age'
      id='phone_number'
      label='Age'
      variant='outlined'
      inputProps={{ inputMode: 'numeric' }}
      onBlur={form.handleBlur}
      onChange={handleChange}
      error={isError}
      helperText={isError ? form.errors.age : ''}
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() =>
              form.setFieldValue('age', Number(form.values.age) + 1)
            }>
            <AddIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default NumericInput;
