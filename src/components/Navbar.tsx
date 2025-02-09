import { colors, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const routes = [
  {
    label: 'Form',
    value: '/',
  },
  {
    label: 'Editor',
    value: '/editor',
  },
  {
    label: 'List',
    value: '/list',
  },
  {
    label: 'Stepper',
    value: '/stepper',
  },
  {
    label: 'Folders',
    value: '/folders',
  },
  {
    label: 'Folder Custom',
    value: '/folder-custom',
  },
];

const Navbar = () => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      gap={2}
      sx={{
        width: '100%',
        height: 50,
        border: '1px solid #ccc',
        backgroundColor: '#050505',
        borderRadius: 2,
      }}>
      {routes.map((item) => {
        return (
          <NavLink to={item.value} key={item.value}>
            {(props) => {
              return (
                <Typography
                  sx={{
                    color: props.isActive ? colors.blue[500] : colors.grey[300],
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}>
                  {item.label}
                </Typography>
              );
            }}
          </NavLink>
        );
      })}
    </Stack>
  );
};

export default Navbar;
