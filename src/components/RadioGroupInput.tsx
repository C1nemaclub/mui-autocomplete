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

interface RadioGroupInputProps<T> extends RadioGroupProps {
  form?: FormikProps<any>;
  label?: string;
  name: string;
  options: T[];
  radioProps?: RadioProps;
  controlProps?: FormControlProps;
  getOptionLabel?: (option: T) => string;
}

const RadioGroupInput = <T,>({
  form,
  name,
  options,
  label,
  radioProps,
  controlProps,
  getOptionLabel,
  ...rest
}: RadioGroupInputProps<T>) => {
  return (
    <FormControl component='fieldset' {...controlProps}>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        aria-labelledby='demo-row-radio-buttons-group-label'
        row
        name={name}
        value={form ? JSON.stringify(form.values[name]) : ''}
        onChange={(_, value) => {
          form && form.setFieldValue(name, JSON.parse(value));
        }}
        onBlur={form && form.handleBlur}
        {...rest}>
        {options.map((option) => {
          const label = getOptionLabel
            ? getOptionLabel(option)
            : (option as any).label;
          return (
            <FormControlLabel
              key={(option as any).value}
              label={label}
              value={JSON.stringify(option)}
              disabled={(option as any).disabled}
              checked={
                form &&
                JSON.stringify(form.values[name]) === JSON.stringify(option)
              }
              control={<Radio {...radioProps} />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupInput;
