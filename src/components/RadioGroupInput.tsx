import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';

type RadioGroupInputProps<T, K> = RadioGroupProps & {
  options: Readonly<NonNullable<T>[]>;
  value?: K;
  label?: string;
  name?: string;
  radioProps?: RadioProps;
  controlProps?: FormControlProps;
  getOptionLabel?: (option: NonNullable<T>) => string;
  getOptionDisabled?: (option: NonNullable<T>) => boolean;
  getOptionKey?: (option: NonNullable<T>) => string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: K) => void;
  isOptionEqualToValue?: (option: T, value: K) => boolean;
};

const RadioGroupInput = <T, K>({
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
  isOptionEqualToValue,
  ...rest
}: RadioGroupInputProps<T, K>) => {
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

          const isEqual = isOptionEqualToValue
            ? isOptionEqualToValue(option, value)
            : false;

          const finalChecked = isEqual ? checked || isEqual : checked;

          return (
            <FormControlLabel
              key={key}
              label={label}
              value={JSON.stringify(option)}
              disabled={disabled}
              checked={finalChecked}
              control={<Radio {...radioProps} />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupInput;
