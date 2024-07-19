import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import {
  DisabledMapper,
  mockValues,
  data as response,
  validationSchema,
} from './utils/constants';
import { FormikEntity, Project } from './utils/data.model';

function App() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useFormik<FormikEntity>({
    validateOnMount: true,
    initialValues: {
      projectType: null,
      section: null,
      field: null,
      conditions: mockValues,
      name: 'Default',
      description: '',
      roles: ['User'],
      // formType: { id: '2d4f5-4d5f4', name: 'Report' },
      formType: { id: '', name: '' },
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

  const disabledFields: DisabledMapper = {
    name: false,
    description: false,
    projectType: false,
    section: false,
    field: false,
    conditions: false,
    roles: false,
    formType: false,
  };

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
          <UserForm form={form} data={data} disabledFields={disabledFields} />
        )}
      </Grid>
      <pre>
        <code>{JSON.stringify(form.errors, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(form.values.formType, null, 2)}</code>
      </pre>
    </Box>
  );
}

export default App;
