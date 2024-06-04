import { createTheme } from '@mui/material';

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
      // disabled
      styleOverrides: {
        root: {
          '& .Mui-disabled + .MuiOutlinedInput-root': {
            // backgroundColor: grey[900],
          },
        },
      },
    },
  },
});
