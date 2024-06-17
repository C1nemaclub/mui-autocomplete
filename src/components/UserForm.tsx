import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { DisabledMapper, ifValidAfterTrimThen } from '../utils/constants';
import { FormikEntity, Project } from '../utils/data.model';

type UserForm = {
  form: FormikProps<FormikEntity>;
  initialValues?: FormikEntity;
  data: Project[];
  disabledFields: DisabledMapper;
};

const UserForm: FC<UserForm> = ({ form, data, disabledFields }) => {
  const sectionOptions = data.find(
    (item) => item.project_type_id === form.values.projectType?.project_type_id
  )?.sections;

  const fieldOptions = sectionOptions?.find(
    (item) => item.section_selector === form.values.section?.section_selector
  )?.fields;
  return (
    <>
      <Grid item xs={6}>
        <TextField
          name='name'
          label='Name'
          onChange={form.handleChange}
          value={form.values.name}
          fullWidth
          disabled={disabledFields['name']}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='description'
          label='Description'
          onChange={form.handleChange}
          value={form.values.description}
          fullWidth
          disabled={disabledFields['description']}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          options={data}
          value={form.values.projectType}
          renderInput={(params) => (
            <TextField name='projectType' label='Project Type' {...params} />
          )}
          getOptionLabel={(option) => option.project_type_name}
          onChange={(_, value) => {
            form.setFieldValue('projectType', value);
            form.setFieldValue('section', null);
            form.setFieldValue('field', null);
          }}
          isOptionEqualToValue={(option, value) =>
            option.project_type_id === value.project_type_id
          }
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
          fullWidth
          options={sectionOptions || []}
          disabled={!sectionOptions}
          value={form.values.section}
          renderInput={(params) => (
            <TextField name='section' label='Section' {...params} />
          )}
          getOptionLabel={(option) => option.section_name}
          onChange={(_, value) => {
            form.setFieldValue('section', value);
            form.setFieldValue('field', null);
          }}
          isOptionEqualToValue={(option, value) =>
            option.section_selector === value.section_selector
          }
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          fullWidth
          options={fieldOptions || []}
          disabled={!fieldOptions}
          value={form.values.field}
          renderInput={(params) => (
            <TextField {...params} name='field' label='Field' />
          )}
          getOptionLabel={(option) => option.field_name}
          onChange={(_, value) => {
            form.setFieldValue('field', value);
          }}
          isOptionEqualToValue={(option, value) =>
            option.field_selector === value.field_selector
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={[]}
          value={form.values.conditions}
          onChange={(_, value, __, e) => {
            // if (e?.option.trim() !== '') {
            // form.setFieldValue('conditions', value);
            // }
            if (e) {
              ifValidAfterTrimThen(e.option, () =>
                form.setFieldValue('conditions', value)
              );
            }
          }}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => {
              const { key, ...rest } = getTagProps({ index });
              return (
                <Chip variant='filled' label={option} key={key} {...rest} />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name='conditions'
              variant='outlined'
              label='Conditions'
              placeholder='Press Enter after typing each value'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          fullWidth
        />
      </Grid>
      <Grid item container columns={12} spacing={2}>
        <Grid item xs={6} mt={2}>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            disabled={!form.isValid}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={6} mt={2}>
          <Button
            variant='contained'
            type='reset'
            fullWidth
            onClick={() => form.resetForm()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
