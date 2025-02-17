import { Stack, Typography } from '@mui/material';
import JSONComponent from './JSONComponent';

const initialJson = {
  created: '',
  active: true,
  quantity: 0,
  user: {
    personalInfo: {
      name: '',
      age: 0,
    },
    address: {
      city: '',
      other: {
        partner: {
          name: 'hello',
        },
        type: 'idk',
      },
    },
  },
};

const JSONBuilder = () => {
  return (
    <Stack
      sx={{
        mt: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Typography>JSON Builder</Typography>

      <Stack alignItems='start' gap={1}>
        <Typography>{`{`}</Typography>
        <JSONComponent obj={initialJson} />
        <Typography>{`}`}</Typography>
      </Stack>
    </Stack>
  );
};

export default JSONBuilder;
