import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  IconBattery,
  IconDashboard,
  IconDeviceWatch,
  IconMoodShare,
  IconRun,
  IconSettings2,
} from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import CustomComponent from '../pages/CustomComponent';
import { data as response } from '../utils/constants';
import { Project } from '../utils/data.model';
import CustomMenu from './CustomMenu/CustomMenu';
import UserForm from './UserForm';

const Form = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { form, isEdit } = useContext(FormContext);

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
      <CustomComponent />
      <CustomMenu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        renderAnchor={({ onClick }) => {
          return (
            <Button onClick={onClick} variant='contained'>
              Open
            </Button>
          );
        }}>
        {(close, isOpen) => {
          return (
            <>
              <MenuItem onClick={close}>
                <IconButton>
                  <IconDashboard />
                </IconButton>
                <ListItemText primary='Dashboard' />
              </MenuItem>
              <MenuItem onClick={close}>
                <IconButton>
                  <IconDeviceWatch />
                </IconButton>
                <ListItemText primary='Watch' />
              </MenuItem>
              <CustomMenu
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                renderAnchor={({ onClick }) => {
                  return (
                    <>
                      <MenuItem onClick={onClick}>
                        <IconButton
                          sx={{
                            color: isOpen ? 'primary.main' : 'inherit',
                          }}>
                          <IconMoodShare />
                        </IconButton>
                        <ListItemText primary='More' />
                      </MenuItem>
                    </>
                  );
                }}>
                <>
                  <MenuItem>
                    <IconButton>
                      <IconBattery />
                    </IconButton>
                    <ListItemText primary='Battery' />
                  </MenuItem>
                  <CustomMenu
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    renderAnchor={({ onClick }) => {
                      return (
                        <>
                          <MenuItem onClick={onClick}>
                            <IconButton
                              sx={{
                                color: isOpen ? 'primary.main' : 'inherit',
                              }}>
                              <IconSettings2 />
                            </IconButton>
                            <ListItemText primary='More' />
                          </MenuItem>
                        </>
                      );
                    }}>
                    <>
                      <MenuItem>
                        <IconButton>
                          <IconRun />
                        </IconButton>
                        <ListItemText primary='Execute' />
                      </MenuItem>
                    </>
                  </CustomMenu>
                </>
              </CustomMenu>
            </>
          );
        }}
      </CustomMenu>
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
    </>
  );
};

export default Form;
