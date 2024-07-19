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

type RadioGroupInputProps<T> = RadioGroupProps & {
  options: Readonly<NonNullable<T>[]>;
  value?: T;
  label?: string;
  name?: string;
  radioProps?: RadioProps;
  controlProps?: FormControlProps;
  getOptionLabel?: (option: NonNullable<T>) => string;
  getOptionDisabled?: (option: NonNullable<T>) => boolean;
  getOptionKey?: (option: NonNullable<T>) => string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: T) => void;
};

const RadioGroupInput = <T,>({
  name,
  options,
  label,
  radioProps,
  controlProps,
  getOptionLabel,
  getOptionDisabled,
  getOptionKey,
  onChange,
  value,
  ...rest
}: RadioGroupInputProps<T>) => {
  return (
    <FormControl component='fieldset' {...controlProps}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={(e, value) => {
          if (onChange) {
            onChange(e, JSON.parse(value));
          }
        }}
        {...rest}>
        {options.map((option) => {
          const label = getOptionLabel
            ? getOptionLabel(option)
            : (option as any).label;

          const disabled = getOptionDisabled
            ? getOptionDisabled(option)
            : false;

          const key = getOptionKey
            ? getOptionKey(option)
            : JSON.stringify(option);

          const checked =
            value && JSON.stringify(value) === JSON.stringify(option);

          return (
            <FormControlLabel
              key={key}
              label={label}
              value={JSON.stringify(option)}
              disabled={disabled}
              checked={checked}
              control={<Radio {...radioProps} />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupInput;
