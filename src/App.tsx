import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import { FormContextProvider } from './context/FormContext';

function App() {
  const FormElement = (
    <FormContextProvider>
      <Box
        width={'100%'}
        height={'100%'}
        padding={2}
        sx={{
          backgroundColor: ({ palette }) => palette.background.default,
        }}>
        <Form />
      </Box>
    </FormContextProvider>
  );

  return (
    <Router>
      <Routes>
        <Route path='/:queueId' element={FormElement} />
        <Route path='/' element={FormElement} />
      </Routes>
    </Router>
  );
}

export default App;
