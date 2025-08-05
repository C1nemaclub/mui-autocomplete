import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { Fragment, type ReactNode } from 'react';
import { Controller, get, useForm } from 'react-hook-form';
import CompoundList from '../CompoundGenericList/context/CompundList';
import { getFieldError } from '../ZodRFH/utils/schema';
import {
  template,
  templateToForm,
  templateToZchema,
  type DynamicField,
  type DynamicForm,
} from './utils/fields';

let count = 0;

const FieldsJson = () => {
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    watch,
    register,
    getValues,
    control,
  } = useForm({
    defaultValues: templateToForm(template),
    resolver: zodResolver(templateToZchema(template)),
    mode: 'onChange',
  });

  // const values = watch() as DynamicForm;
  const values = getValues() as DynamicForm;
  console.log(values);

  const renderField = (fieldName: string): ReactNode => {
    const deepFieldProps: DynamicField = get(values, fieldName);

    const label = deepFieldProps.required
      ? `${deepFieldProps.label} *`
      : deepFieldProps.label;
    if (!deepFieldProps) return <></>;
    switch (deepFieldProps.type) {
      case 'text':
        return (
          <>
            <TextField
              {...register(`${fieldName}.value`)}
              fullWidth
              size='small'
              label={label}
              {...getFieldError(errors, `${fieldName}.value`)}
            />
            {String(deepFieldProps.type)}
          </>
        );
      case 'string.list': {
        return (
          <Controller
            control={control}
            name={`${fieldName}.value`}
            render={({ field }) => {
              const { onChange, value } = field;
              return (
                <CompoundList
                  defaultVal={''}
                  value={value}
                  onChange={onChange}
                  renderItem={(params) => {
                    return (
                      <Grid2
                        direction='row'
                        width='100%'
                        xs={6}
                        key={params.index}>
                        <Stack direction='row' alignItems='center' gap={1}>
                          <TextField
                            value={params.value}
                            onChange={(e) => params.onChange(e.target.value)}
                            size='small'
                            fullWidth
                            {...getFieldError(
                              errors,
                              `${fieldName}.value.${params.index}`
                            )}
                          />
                          <IconButton onClick={params.onRemove}>
                            <IconTrash />
                          </IconButton>
                        </Stack>
                      </Grid2>
                    );
                  }}>
                  <Stack
                    gap={1}
                    alignItems='start'
                    sx={{
                      border: '1px solid #ccc',
                      width: '100%',
                      p: 1.5,
                    }}>
                    <Typography>{deepFieldProps.label}</Typography>
                    <Divider
                      orientation='vertical'
                      flexItem
                      sx={{ borderColor: '#ccc', borderWidth: '1px', mb: 1.5 }}
                    />
                    <CompoundList.Items width='100%' columns={12} gap={1} />
                    <CompoundList.AddButton
                      variant='text'
                      startIcon={<IconPlus />}>
                      Add
                    </CompoundList.AddButton>
                  </Stack>
                </CompoundList>
              );
            }}
          />
        );
      }
      case 'select':
        return (
          <Controller
            control={control}
            name={`${fieldName}.value`}
            render={({ field }) => {
              const { value, ref, onChange, name } = field;
              return (
                <Autocomplete
                  options={[
                    { value: 'hey', label: 'Hey' },
                    { value: 'bye', label: 'Bye' },
                  ]}
                  size='small'
                  fullWidth
                  value={value}
                  onChange={(_, v) => onChange(v)}
                  // value={deepFieldProps.value}
                  // onChange={(_, v) =>
                  //   setValue(
                  //     fieldName,
                  //     {
                  //       ...deepFieldProps,
                  //       value: v,
                  //     },
                  //     { shouldValidate: true }
                  //   )
                  // }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label={label}
                        inputRef={ref}
                        {...getFieldError(errors, name)}
                      />
                    );
                  }}
                  isOptionEqualToValue={(val, opt) => val.value === opt.value}
                  getOptionKey={(opt) => opt.value}
                />
              );
            }}
          />
        );
      case 'json':
        return (
          <Stack
            gap={1}
            alignItems='start'
            sx={{ border: '1px solid #ccc', width: '100%', p: 1.5 }}>
            <Typography>{deepFieldProps.label}</Typography>
            <Divider
              orientation='vertical'
              flexItem
              sx={{ borderColor: '#ccc', borderWidth: '1px', mb: 1.5 }}
            />
            {Object.entries(deepFieldProps.value).map((item) => {
              const [nestedFieldName] = item;
              const accessName = `${fieldName}.value.${nestedFieldName}`;
              return (
                <Fragment key={accessName}>{renderField(accessName)}</Fragment>
              );
            })}
          </Stack>
        );
      default:
        return <></>;
    }
  };

  const onSubmit = (values: DynamicForm) => {
    console.log(values, '👽👽👽👽👽👽👽👽👽');
  };

  count++;

  return (
    <Stack gap={1} mt={5} component='form' onSubmit={handleSubmit(onSubmit)}>
      <pre>{JSON.stringify({ count }, null, 2)}</pre>
      {Object.entries(values).map((item) => {
        const [fieldName] = item;
        return (
          <Stack key={fieldName} p={1} gap={1} direction='row'>
            {/* <Autocomplete
              sx={
                {
                  // flex: 1,
                }
              }
              options={['Datapoint']}
              fullWidth
              renderInput={(params) => <TextField {...params} size='small' />}
            /> */}
            {renderField(fieldName)}
          </Stack>
        );
      })}
      <Button type='submit' variant='contained' disabled={isDirty && !isValid}>
        Submit
      </Button>
      <Button variant='contained' onClick={() => reset()}>
        Reset
      </Button>
    </Stack>
  );
};

export default FieldsJson;
