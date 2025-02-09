import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FolderCustom } from './components/FolderCustom/FolderCustom';
import FolderTree from './components/FolderTree/FolderTree';
import Form from './components/Form';
import MyList from './components/MyList';
import Navbar from './components/Navbar';
import CustomStepper from './components/Steps/CustomStepper';
import SubList from './components/SubList/SubList';
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
    // <>
    //   <SlateEditot />
    //   <QuillEditor />
    // </>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/:queueId' element={FormElement} />
        <Route path='/' element={FormElement} />
        <Route
          path='/editor'
          element={
            <>
              {/* <QuillMention /> */}
              {/* <QuillEditor /> */}
              {/* <SlateEditor /> */}
              {/* <BasicMentions /> */}
              {/* <TipTapEditor /> */}
              Hey!
            </>
          }
        />
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
      </Routes>
    </Router>
  );
}

export default App;
