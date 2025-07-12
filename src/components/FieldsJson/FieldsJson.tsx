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
import { getIn, useFormik } from 'formik';
import { Fragment, type ReactNode } from 'react';
import CompoundList from '../CompoundGenericList/context/CompundList';
import {
  template,
  templateToForm,
  templateToSchema,
  type DynamicField,
  type DynamicForm,
} from './utils/fields';

const FieldsJson = () => {
  const form = useFormik<DynamicForm>({
    initialValues: templateToForm(template),
    validationSchema: templateToSchema(template),
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderField = (
    fieldName: string,
    fieldProps: DynamicField
  ): ReactNode => {
    const deepFieldProps: DynamicField = getIn(form.values, fieldName);
    const label = deepFieldProps.required
      ? `${deepFieldProps.label} *`
      : deepFieldProps.label;
    const fieldError = getIn(form.errors, fieldName);
    if (!deepFieldProps) return <></>;
    switch (deepFieldProps.type) {
      case 'text':
        return (
          <TextField
            name={fieldName}
            fullWidth
            onChange={(e) =>
              form.setFieldValue(fieldName, {
                ...deepFieldProps,
                value: e.target.value,
              })
            }
            size='small'
            value={deepFieldProps.value}
            label={label}
            error={Boolean(fieldError)}
          />
        );
      case 'string.list': {
        return (
          <CompoundList
            value={deepFieldProps.value}
            defaultVal={''}
            onChange={(updatedArray) =>
              form.setFieldValue(fieldName, {
                ...deepFieldProps,
                value: updatedArray,
              })
            }
            renderItem={(params) => {
              return (
                <Grid2 direction='row' width='100%' xs={6}>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <TextField
                      value={params.value}
                      onChange={(e) => params.onChange(e.target.value)}
                      size='small'
                      fullWidth
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
              <CompoundList.AddButton variant='text' startIcon={<IconPlus />}>
                Add
              </CompoundList.AddButton>
            </Stack>
          </CompoundList>
        );
      }
      case 'select':
        return (
          <Autocomplete
            options={[{ value: 'hey', label: 'Hey' }]}
            size='small'
            fullWidth
            value={deepFieldProps.value}
            onChange={(_, v) =>
              form.setFieldValue(fieldName, {
                ...deepFieldProps,
                value: v,
              })
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={label}
                  error={Boolean(fieldError)}
                />
              );
            }}
            isOptionEqualToValue={(val, opt) => val.value === opt.value}
            getOptionKey={(opt) => opt.value}
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
              const [nestedFieldName, nestedFieldProps] = item;
              const accessName = `${fieldName}.value.${nestedFieldName}`;
              return (
                <Fragment key={accessName}>
                  {renderField(accessName, nestedFieldProps)}
                </Fragment>
              );
            })}
          </Stack>
        );
      default:
        return <></>;
    }
  };
  return (
    <Stack gap={1} mt={5} component='form' onSubmit={form.handleSubmit}>
      {Object.entries(form.values).map((item) => {
        const [fieldName, fieldProps] = item;
        return (
          <Stack key={fieldName} p={1} gap={1}>
            {renderField(fieldName, fieldProps)}
          </Stack>
        );
      })}
      <Button type='submit' variant='contained'>
        Submit
      </Button>
      <Button variant='contained' onClick={() => form.resetForm()}>
        Reset
      </Button>
    </Stack>
  );
};

export default FieldsJson;
