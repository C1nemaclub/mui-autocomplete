import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

interface SelectFieldProps<T> {
  options: T[];
  value: T | null;
  getOptionLabel: (option: T) => string;
  onChange: (event: SelectChangeEvent<string>, value: T | null) => void;
  label: string;
}

const SelectField = <T extends Record<string, any>>({
  options,
  value,
  getOptionLabel,
  onChange,
  label,
}: SelectFieldProps<T>) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = options.find(
      (option) => JSON.stringify(option) === event.target.value
    );
    onChange(event, selectedOption || null);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='select-field-label'>{label}</InputLabel>
      <Select
        labelId='select-field-label'
        id='select-field'
        value={value ? JSON.stringify(value) : ''}
        label={label}
        onChange={handleChange}>
        {options.map((option) => {
          return (
            <MenuItem
              key={JSON.stringify(option)}
              value={JSON.stringify(option)}>
              {getOptionLabel(option)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectField;
