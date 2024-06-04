import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { data as response, validationSchema } from './utils/constants';
import { FormikEntity, Project } from './utils/data.model';

function App() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useFormik<FormikEntity>({
    initialValues: {
      projectType: null,
      section: null,
      field: null,
      conditions: [],
      name: '',
      description: '',
    },
    onSubmit: (payload) => {
      const reqPayload = {
        ...payload,
        projectType: payload.projectType?.project_type_id,
        section: payload.section?.section_selector,
        field: payload.field?.field_selector,
      };
      console.log(reqPayload);
    },
    validationSchema,
  });

  const formRef = useRef(form);
  formRef.current = form;

  const getData = async () => {
    try {
      setLoading(true);
      const res: Project[] = await new Promise((resolve) => {
        return setTimeout(() => {
          return resolve(response);
        }, 620);
      });
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    formRef.current.setFieldValue('section', null);
    formRef.current.setFieldValue('field', null);
  }, [form.values.projectType]);

  useEffect(() => {
    formRef.current.setFieldValue('field', null);
  }, [form.values.section]);

  const sectionOptions = data.find(
    (item) => item.project_type_id === form.values.projectType?.project_type_id
  )?.sections;

  const fieldOptions = sectionOptions?.find(
    (item) => item.section_selector === form.values.section?.section_selector
  )?.fields;

  return (
    <Box
      width={'100%'}
      height={'100%'}
      padding={2}
      component='form'
      onSubmit={form.handleSubmit}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}>
      <Grid
        container
        columns={12}
        spacing={2}
        width={'100%'}
        maxWidth={750}
        mt={4}
        mx='auto'>
        <Grid item xs={12}>
          <Typography variant='h4' mb={2} textAlign='left'>
            Create Form
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress sx={{ m: 'auto' }} />
        ) : (
          <>
            <Grid item xs={6}>
              <TextField
                name='name'
                label='Name'
                onChange={form.handleChange}
                value={form.values.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='description'
                label='Description'
                onChange={form.handleChange}
                value={form.values.description}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={data}
                value={form.values.projectType}
                renderInput={(params) => (
                  <TextField
                    name='projectType'
                    label='Project Type'
                    {...params}
                  />
                )}
                getOptionLabel={(option) => option.project_type_name}
                onChange={(_, value) => {
                  form.setFieldValue('projectType', value);
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
                onChange={(_, value) => {
                  form.setFieldValue('conditions', value);
                }}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => {
                    const { key, ...rest } = getTagProps({ index });
                    return (
                      <Chip
                        variant='filled'
                        label={option}
                        key={key}
                        // color='primary'
                        {...rest}
                      />
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
                <Button variant='contained' type='submit' fullWidth>
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
        )}
      </Grid>
      <pre>
        <code>{JSON.stringify(form.errors, null, 2)}</code>
      </pre>
    </Box>
  );
}

export default App;
