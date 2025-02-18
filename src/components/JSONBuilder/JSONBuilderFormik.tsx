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
    return Object.entries(obj).map(
      ([key, { value, dataType, availableValues }]) => {
        const fullPath = parentPath ? `${parentPath}.${key}` : key;
        return (
          <div key={fullPath} style={{ marginLeft: parentPath ? '20px' : '0' }}>
            <strong>{key}:</strong>
            {dataType === 'string' && (
              <>
                {/* <input
                  type='text'
                  value={value as string}
                  onChange={(e) => updateValue(fullPath, e.target.value)}
                /> */}
                {availableValues && availableValues.length > 0 && (
                  <select
                    value={value as string}
                    onChange={(e) => updateValue(fullPath, e.target.value)}>
                    {availableValues.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
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
                <NestedKeyAdder parentPath={fullPath} onAddKey={addKey} />
                {renderJson(value as JsonObject, fullPath)}
              </>
            )}
            <button onClick={() => removeKey(fullPath)}>Remove</button>
          </div>
        );
      }
    );
  };

  return (
    <div>
      <h1>JSON Builder</h1>
      <div>
        <NestedKeyAdder parentPath='' onAddKey={addKey} />
      </div>
      <div>{renderJson(json)}</div>
      <button
        type='button'
        onClick={() => form.setFieldValue(name, {})}
        style={{ marginTop: '1rem' }}>
        reset
      </button>
    </div>
  );
};

// Component for adding nested keys
const NestedKeyAdder: React.FC<{
  parentPath: string;
  onAddKey: (parentPath: string, newKey: string, newKeyType: DataType) => void;
}> = ({ parentPath, onAddKey }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
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
    <div>
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)}>Add Key</button>
      ) : (
        <div>
          <input
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
          <button onClick={handleApply}>Apply</button>
          {/* <button onClick={() => setIsAdding(false)}>Cancel</button> */}
        </div>
      )}
    </div>
  );
};

export default JSONBuilderFormik;
