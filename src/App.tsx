import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FolderCustom } from './components/FolderCustom/FolderCustom';
import FolderTree from './components/FolderTree/FolderTree';
import Form from './components/Form';
import JSONBuilderFormik from './components/JSONBuilder/JSONBuilderFormik';
import MyList from './components/MyList';
import Navbar from './components/Navbar';
import CustomStepper from './components/Steps/CustomStepper';
import SubList from './components/SubList/SubList';
import { FormContextProvider } from './context/FormContext';
import Components from './pages/Components';
import CustomComponent from './pages/CustomComponent';
import EditableGrid from './pages/EditableGrid';
import Suffer from './pages/Suffer';

function App() {
  const testForm = useFormik({
    initialValues: {
      name: '',
      data: {},
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
      <Navbar />
      <Routes>
        <Route path='/:queueId' element={FormElement} />
        <Route path='/' element={FormElement} />
        <Route path='/editor' element={<>Hey!</>} />
        <Route
          path='/list'
          element={
            <>
              <SubList currentItem={'2'} currentSubItem={'2.2'} />
              <MyList />
            </>
          }
        />
        <Route
          path='/stepper'
          element={
            <>
              <CustomStepper />
            </>
          }
        />
        <Route
          path='/folders'
          element={
            <>
              <FolderTree />
            </>
          }
        />
        <Route
          path='/folder-custom'
          element={
            <>
              <FolderCustom />
            </>
          }
        />
        <Route
          path='/json-builder'
          element={
            <>
              <JSONBuilderFormik form={testForm} name='data' />
            </>
          }
        />
        <Route path='/custom-component' element={<CustomComponent />} />
        <Route path='/edit-grid' element={<EditableGrid />} />
        <Route path='/components' element={<Components />} />
        <Route path='/this' element={<Suffer />} />
      </Routes>
    </Router>
  );
}

export default App;
