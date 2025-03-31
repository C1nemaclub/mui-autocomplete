import { Button } from '@mui/material';
import CustomPopper from '../components/CustomPopper/CustomPopper';
import TestForm from '../components/CustomPopper/TestForm';

const CustomComponent = () => {
  return (
    <CustomPopper
      renderAnchor={({ onClick, isOpen }) => {
        return (
          <Button
            onClick={onClick}
            variant='contained'
            sx={{ width: 'fit-content', mx: 'auto', mt: 10 }}>
            {isOpen ? 'Close Popper' : 'Open Popper'}
          </Button>
        );
      }}>
      {(close) => {
        return <TestForm close={close} />;
      }}
    </CustomPopper>
  );
};

export default CustomComponent;
