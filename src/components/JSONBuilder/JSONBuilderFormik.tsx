import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { IconTrash } from '@tabler/icons-react';
import type { FormikProps } from 'formik';
import React, { useState } from 'react';

type AvailableValues = {
  value: string;
  label: string;
};
type JsonValue = string | boolean | JsonObject;
type JsonObject = {
  [key: string]: {
    value: JsonValue;
    dataType: DataType;
    availableValues?: AvailableValues[];
  };
};

type DataType = 'string' | 'boolean' | 'object';

interface JSONBuilderFormikProps {
  form: FormikProps<any>;
  name: string; // The field name in Formik's state
}

const JSONBuilderFormik: React.FC<JSONBuilderFormikProps> = ({
  form,
  name,
}) => {
  const json = form.values[name] || {};

  // Add a new key to the JSON object
  const addKey = (parentPath: string, newKey: string, newKeyType: DataType) => {
    if (!newKey) return;

    const updatedJson = { ...json };

    // Determine the target object to add the key
    let target: JsonObject = updatedJson;
    // debugger;
    if (parentPath) {
      const pathParts = parentPath.split('.');
      for (const part of pathParts) {
        if (target[part].dataType === 'object') {
          target = target[part].value as JsonObject;
        }
      }
    }

    // Add the new key with its value and dataType
    target[newKey] = {
      value:
        newKeyType === 'string' ? '' : newKeyType === 'boolean' ? false : {},
      dataType: newKeyType,
      availableValues:
        newKeyType === 'boolean'
          ? undefined
          : newKeyType === 'object'
          ? undefined
          : [
              { value: 'value1', label: 'Value 1' },
              { value: 'value2', label: 'Value 2' },
            ],
    };

    // Update Formik's state
    form.setFieldValue(name, updatedJson);
  };

  // Update the value of a key
  const updateValue = (path: string, value: JsonValue) => {
    const updatedJson = { ...json };
    const pathParts = path.split('.');
    let target: JsonObject = updatedJson;

    // Traverse the path to find the target key
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (target[part].dataType === 'object') {
        target = target[part].value as JsonObject;
      }
    }

    // Update the value
    target[pathParts[pathParts.length - 1]].value = value;

    // Update Formik's state
    form.setFieldValue(name, updatedJson);
  };

  // Remove a key from the JSON object
  const removeKey = (path: string) => {
    const updatedJson = { ...json };
    const pathParts = path.split('.');
    let target: JsonObject = updatedJson;

    // Traverse the path to find the parent of the target key
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (target[part].dataType === 'object') {
        target = target[part].value as JsonObject;
      }
    }

    // Remove the key
    delete target[pathParts[pathParts.length - 1]];

    // Update Formik's state
    form.setFieldValue(name, updatedJson);
  };

  // Render the JSON object
  const renderJson = (obj: JsonObject, parentPath = ''): JSX.Element[] => {
    const nestingLevel = parentPath.split('.').length;
    return Object.entries(obj).map(
      ([key, { value, dataType, availableValues }]) => {
        const fullPath = parentPath ? `${parentPath}.${key}` : key;
        return (
          <Grid2 xs={12} container>
            <Grid2 xs={12}>
              <Typography sx={{ textAlign: 'left' }}>{key}:</Typography>
              {dataType === 'object' && (
                <NestedKeyAdder
                  parentPath={fullPath}
                  onAddKey={addKey}
                  isEditingByDefault
                />
              )}
            </Grid2>
            <Grid2 xs={10}>
              {dataType === 'string' && (
                <>
                  <TextField
                    size='small'
                    variant='outlined'
                    type='text'
                    value={value as string}
                    onChange={(e) => updateValue(fullPath, e.target.value)}
                    fullWidth
                  />
                  {/* {availableValues && availableValues.length > 0 && (
                  <select
                  value={value as string}
                  onChange={(e) => updateValue(fullPath, e.target.value)}>
                  {availableValues.map(({ value, label }) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                    ))}
                    </select>
                    )} */}
                </>
              )}
              {dataType === 'boolean' && (
                <input
                  type='checkbox'
                  checked={value as boolean}
                  onChange={(e) => updateValue(fullPath, e.target.checked)}
                />
              )}
              {dataType === 'object' && (
                <>
                  <Grid2
                    container
                    xs={12}
                    sx={{
                      ml: nestingLevel * 2,
                    }}>
                    {renderJson(value as JsonObject, fullPath)}
                  </Grid2>
                  <Box
                    sx={{
                      ml: nestingLevel * 2,
                    }}>
                    {/* <NestedKeyAdder
                      parentPath={fullPath}
                      onAddKey={addKey}
                      isEditingByDefault
                    /> */}
                  </Box>
                </>
              )}
            </Grid2>
            <Grid2 xs={2}>
              <IconButton
                onClick={() => removeKey(fullPath)}
                sx={{ color: 'error.main' }}>
                <IconTrash />
              </IconButton>
            </Grid2>
          </Grid2>
        );
      }
    );
  };

  return (
    <Stack
      sx={{
        mt: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <h1>JSON Builder</h1>
      <Stack
        alignItems='start'
        sx={{
          width: '100%',
          maxWidth: 'sm',
        }}>
        <Stack mb={1}>
          <NestedKeyAdder
            parentPath=''
            onAddKey={addKey}
            isEditingByDefault={false}
          />
        </Stack>
        <Grid2 container columns={12} sx={{}}>
          {renderJson(json)}
        </Grid2>
        <Button
          size='small'
          variant='contained'
          onClick={() => form.setFieldValue(name, {})}
          style={{ marginTop: '1rem' }}>
          reset
        </Button>
      </Stack>
    </Stack>
  );
};

// Component for adding nested keys
const NestedKeyAdder: React.FC<{
  parentPath: string;
  onAddKey: (parentPath: string, newKey: string, newKeyType: DataType) => void;
  isEditingByDefault: boolean;
}> = ({ parentPath, onAddKey, isEditingByDefault }) => {
  const [isAdding, setIsAdding] = useState<boolean>(isEditingByDefault);
  const [newKey, setNewKey] = useState<string>('');
  const [newKeyType, setNewKeyType] = useState<DataType>('string');

  const handleApply = () => {
    if (!newKey) return;
    onAddKey(parentPath, newKey, newKeyType);
    setIsAdding(false);
    setNewKey('');
    setNewKeyType('string');
  };

  return (
    <Stack gap={1} direction='row'>
      {!isAdding ? (
        <Button
          variant='contained'
          size='small'
          onClick={() => setIsAdding(true)}>
          Add Key
        </Button>
      ) : (
        <Stack gap={1} direction='row'>
          <TextField
            size='small'
            variant='outlined'
            type='text'
            placeholder='Enter key'
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <select
            value={newKeyType}
            onChange={(e) => setNewKeyType(e.target.value as DataType)}>
            <option value='string'>String</option>
            <option value='boolean'>Boolean</option>
            <option value='object'>Object</option>
          </select>
          <Button size='small' variant='contained' onClick={handleApply}>
            Apply
          </Button>
          {/* <button onClick={() => setIsAdding(false)}>Cancel</button> */}
        </Stack>
      )}
    </Stack>
  );
};

export default JSONBuilderFormik;
