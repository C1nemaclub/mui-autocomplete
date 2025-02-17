import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FolderCustom } from './components/FolderCustom/FolderCustom';
import FolderTree from './components/FolderTree/FolderTree';
import Form from './components/Form';
import JSONBuilder from './components/JSONBuilder/JSONBuilder';
import MyList from './components/MyList';
import Navbar from './components/Navbar';
import CustomStepper from './components/Steps/CustomStepper';
import SubList from './components/SubList/SubList';
import { FormContextProvider } from './context/FormContext';

function App() {
  const [count, setCount] = useState(0);
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

  // console.log(dot(userMocked));
  // for (const key in dot(userMocked)) {
  //   console.log('loopng', key);
  //   if (key.endsWith('project_id')) {
  //     console.log(key, 'then');
  //     break;
  //   }
  // }

  const functName = () => {
    console.log('Connection created');
  };

  const name = ['Santiago'];
  const depName = JSON.stringify(name);

  useEffect(() => {
    functName();
  }, [depName]);

  return (
    // <>
    //   <SlateEditot />
    //   <QuillEditor />
    // </>
    <Router>
      <Navbar />
      <Button
        onClick={() => {
          setCount(count + 1);
        }}>
        Click {count}
      </Button>
      {[1, 2].map((item) => {
        return <Typography>{item}</Typography>;
      })}
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
        <Route
          path='/json-builder'
          element={
            <>
              <JSONBuilder />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
