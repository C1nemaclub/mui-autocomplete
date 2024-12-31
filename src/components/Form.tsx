import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import { data as response } from '../utils/constants';
import { Project } from '../utils/data.model';
import CustomTextField from './CustomTextField';
import UserForm from './UserForm';

const Form = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { form, isEdit } = useContext(FormContext);
  const [customValue, setCustomValue] = useState('Default');

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

  return (
    <>
      <Grid
        onSubmit={form.handleSubmit}
        component='form'
        container
        columns={12}
        spacing={2}
        width={'100%'}
        maxWidth={750}
        mt={4}
        mx='auto'>
        <Grid item xs={12}>
          <Typography variant='h4' mb={2} textAlign='left'>
            {isEdit ? 'Edit Form' : 'Create Form'}
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress sx={{ m: 'auto' }} />
        ) : (
          <UserForm form={form} data={data} isEdit={isEdit} />
        )}
      </Grid>
      <Box mt={4}>
        <CustomTextField
          value={customValue}
          label='Custom Input'
          name='customValue'
          onChange={(e) => {
            setCustomValue(e);
          }}
        />
      </Box>
      <Autocomplete
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip label={option} {...props({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            inputRef={params.InputProps.ref}
            label='Add Tags'
            {...params}
          />
        )}
      />
    </>
  );
};

export default Form;
