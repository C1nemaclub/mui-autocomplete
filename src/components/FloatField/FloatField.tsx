import { TextField, type TextFieldProps } from '@mui/material';
import type { FC } from 'react';

interface FloatFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: number | null;
  onChange: (value: number | null) => void;
}

const FloatField: FC<FloatFieldProps> = ({ value, onChange, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const floatRegex = /^-?\d*\.?\d*$/; // Regex to allow only valid float numbers
    if (inputValue === '' || floatRegex.test(inputValue)) {
      // Convert to float or null if empty
      const newValue = inputValue === '' ? null : parseFloat(inputValue);
      onChange(newValue);
    }
  };

  return (
    <TextField
      value={value !== null ? value : ''}
      onChange={handleChange}
      type='number'
      inputProps={{
        step: 'any', // Allows for floating point numbers
        min: '0', // Optional: set a minimum value
      }}
      variant='outlined'
      label='Float Value'
      fullWidth
      //   margin='normal' // Optional: adds margin for better spacing
      InputLabelProps={{
        shrink: true, // Keeps the label visible when the field is focused or filled
      }}
      onKeyDown={(event) => {
        // Prevents the default behavior of the Enter key
        if (
          event.key === '+' ||
          event.key === '-' ||
          event.key === 'e' ||
          event.key === 'E'
        ) {
          event.preventDefault();
        }
      }}
      sx={
        {
          // '& .MuiInputBase-input': {
          //   textAlign: 'right', // Aligns the input text to the right
          // },
        }
      }
      {...rest}
    />
  );
};

export default FloatField;
