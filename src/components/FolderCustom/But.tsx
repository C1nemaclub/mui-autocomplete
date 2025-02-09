import { Box } from '@mui/material';
import { IconChevronRight } from '@tabler/icons-react';

const But = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <IconChevronRight size={20} />
    </Box>
  );
};

export default But;
