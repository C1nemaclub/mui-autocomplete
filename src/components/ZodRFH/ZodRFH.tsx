import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, useForm } from 'react-hook-form';
import FloatField from '../FloatField/FloatField';
import {
  getFieldError,
  initialValues,
  UserSchema,
  type Form,
} from './utils/schema';

const cities = [
  { value: 'Medellin', country: 'Colombia' },
  { value: 'Bogota', country: 'Colombia' },
  { value: 'Madrid', country: 'Spain' },
  { value: 'Barcelona', country: 'Spain' },
];

const countries = ['Colombia', 'Spain'];

const ZodRFH = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useForm<Form>({
    defaultValues: initialValues,
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
  });
  const onSubmit = (values: Form) => {
    console.log(values, '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️');
  };

  const [country, allowContact] = watch(['country', 'allowContact']);
  const availableCities = cities.filter((item) => item.country === country);

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)} gap={1} mt={2}>
      <TextField
        {...register('name')}
        size='small'
        label='Name'
        fullWidth
        {...getFieldError(errors, 'name')}
      />
      <Controller
        control={control}
        name='age'
        render={({ field }) => {
          const { onChange, value, name, ref } = field;
          return (
            <FloatField
              value={value}
              onChange={onChange}
              name={name}
              inputRef={ref}
              size='small'
              label='Age'
              {...getFieldError(errors, 'age')}
            />
          );
        }}
      />
      <Grid2 container columns={12} spacing={2}>
        <Grid2 xs={6}>
          <Controller
            control={control}
            name='country'
            render={({ field }) => {
              const { value, name, onChange, ref } = field;
              return (
                <Autocomplete
                  value={value}
                  onChange={(_, v) => {
                    onChange(v);
                    setValue('city', null);
                  }}
                  options={countries}
                  size='small'
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={name}
                      label='Country'
                      inputRef={ref}
                      {...getFieldError(errors, 'country')}
                    />
                  )}
                />
              );
            }}
          />
        </Grid2>
        <Grid2 xs={6}>
          <Controller
            control={control}
            name='city'
            render={({ field }) => {
              const { value, name, onChange, ref } = field;
              return (
                <Autocomplete
                  value={value}
                  onChange={(_, v) => {
                    onChange(v);
                  }}
                  getOptionLabel={(opt) => opt.value}
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  options={availableCities}
                  size='small'
                  fullWidth
                  disabled={!country}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={name}
                      label='City'
                      inputRef={ref}
                      {...getFieldError(errors, 'city')}
                    />
                  )}
                />
              );
            }}
          />
        </Grid2>
        <Grid2 xs={6} display='flex'>
          <Controller
            control={control}
            name='allowContact'
            render={({ field }) => {
              const { value, onChange, ref, name } = field;
              return (
                <FormControlLabel
                  label='Allow Contact'
                  sx={{
                    mr: 'auto',
                  }}
                  control={
                    <Checkbox
                      name={name}
                      value={value}
                      checked={value}
                      onChange={(v) => {
                        onChange(v);
                        setValue('email', '');
                      }}
                      inputRef={ref}
                    />
                  }
                />
              );
            }}
          />
        </Grid2>
        <Grid2 xs={6}>
          <TextField
            {...register('email')}
            size='small'
            label='Email'
            fullWidth
            disabled={!allowContact}
            {...getFieldError(errors, 'email')}
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            {...register('meta.address')}
            size='small'
            label='Address'
            fullWidth
            {...getFieldError(errors, 'meta.address')}
          />
        </Grid2>
      </Grid2>
      <Button type='submit' variant='contained' disabled={!isValid}>
        Save
      </Button>
    </Stack>
  );
};

export default ZodRFH;
