import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  FormLabel,
  RadioProps,
  FormControlProps,
} from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';

// type TestProps = RadioProps & FormControlProps & { label: string };

interface RadioGroupInputProps extends RadioGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: FormikProps<any>;
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  radioProps?: RadioProps;
  controlProps?: FormControlProps;
}

const RadioGroupInput: FC<RadioGroupInputProps> = ({
  form,
  name,
  options,
  label,
  radioProps,
  controlProps,
  ...rest
}) => {
  return (
    <FormControl component='fieldset' {...controlProps}>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        aria-labelledby='demo-row-radio-buttons-group-label'
        row
        name={name}
        value={form && form.values[name]}
        onChange={form && form.handleChange}
        onBlur={form && form.handleBlur}
        {...rest}>
        {options.map(({ value, label, disabled }) => {
          return (
            <FormControlLabel
              key={value}
              label={label}
              value={value}
              disabled={disabled}
              checked={form && form.values[name] === value}
              control={<Radio {...radioProps} />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupInput;
