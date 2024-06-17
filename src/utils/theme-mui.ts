import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00ff00',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .Mui-disabled + .MuiOutlinedInput-root': {
            border: `1px solid ${blue['A100']}`,
          },
        },
      },
    },
  },
});
