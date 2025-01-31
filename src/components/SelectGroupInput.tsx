import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type SelectProps,
} from '@mui/material';

type SelectInputProps<T, K> = SelectProps & {
  options: Readonly<T[]>;
  value?: K;
  label?: string;
  name?: string;
  controlProps?: FormControlProps;
  getOptionLabel?: (option: T) => string;
  getOptionDisabled?: (option: T) => boolean;
  onChange?: (event: SelectChangeEvent<unknown>, value: T) => void;
  //   isOptionEqualToValue?: (option: T, value: K) => boolean;
};

export const SelectGroupInputs = <T, K>({
  name,
  options,
  label,
  controlProps,
  getOptionLabel,
  getOptionDisabled,
  onChange,
  value,
  //   isOptionEqualToValue,
  ...rest
}: SelectInputProps<T, K>) => {
  return (
    <FormControl component='fieldset' {...controlProps}>
      <InputLabel id='select-id-label'>{label}</InputLabel>
      <Select
        name={name}
        fullWidth
        labelId='select-id-label'
        id='select-id'
        value={value}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => JSON.stringify(option) === e.target.value
          );
          if (onChange && selectedOption) {
            onChange(e, selectedOption);
          }
        }}
        renderValue={(selected) =>
          getOptionLabel
            ? getOptionLabel(selected as T)
            : (selected as any)?.label
        }
        {...rest}
        sx={{
          textAlign: 'left',
          ...(rest.sx || {}),
        }}>
        {options.map((item) => (
          <MenuItem
            selected={JSON.stringify(item) === value}
            key={JSON.stringify(item)}
            value={JSON.stringify(item)}
            disabled={getOptionDisabled ? getOptionDisabled(item) : false}>
            {getOptionLabel ? getOptionLabel(item) : (item as any).label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectGroupInputs;
