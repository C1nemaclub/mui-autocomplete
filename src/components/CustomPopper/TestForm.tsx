import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import type { FC } from 'react';

interface TestFormProps {
  close: () => void;
}

const TestForm: FC<TestFormProps> = ({ close }) => {
  const form = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit(values) {
      console.log(values);
      close();
    },
  });

  return (
    <Paper
      component='form'
      onSubmit={form.handleSubmit}
      elevation={3}
      sx={{
        padding: 2,
        minWidth: 350,
      }}>
      <Stack
        direction='column'
        gap={2}
        alignItems={'start'}
        sx={{
          width: '100%',
        }}>
        <Typography
          variant='subtitle1'
          fontWeight={600}
          fontSize={17}
          fontFamily={'Roboto, sans-serif'}>
          New Field
        </Typography>
        <TextField
          size='small'
          label='Name'
          fullWidth
          InputProps={{ sx: { borderRadius: 2 } }}
          sx={{}}
          value={form.values.name}
          onChange={form.handleChange}
          name='name'
          inputProps={{ autoFocus: true }}
        />
        <Autocomplete
          size='small'
          options={[
            { label: 'String', value: 'string' },
            { label: 'Number', value: 'number' },
            { label: 'Boolean', value: 'boolean' },
            { label: 'Date', value: 'date' },
          ]}
          getOptionLabel={(option) => option.label}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label='Type'
              fullWidth
              InputProps={{
                ...params.InputProps,
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
        <Stack
          direction='row'
          gap={1}
          alignItems='center'
          mt={2}
          sx={{
            ml: 'auto',
          }}>
          <Button
            variant='outlined'
            sx={{
              textTransform: 'none',
            }}
            onClick={close}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{
              textTransform: 'none',
            }}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TestForm;
