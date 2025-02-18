import React, { useState } from 'react';

type JsonValue = string | boolean | JsonObject;
type JsonObject = { [key: string]: { value: JsonValue; dataType: DataType } };

type DataType = 'string' | 'boolean' | 'object';

const JSONBuilderv2: React.FC = () => {
  const [json, setJson] = useState<JsonObject>({});

  // Add a new key to the JSON object
  const addKey = (parentPath: string, newKey: string, newKeyType: DataType) => {
    if (!newKey) return;

    const updatedJson = { ...json };

    // Determine the target object to add the key
    let target: JsonObject = updatedJson;
    if (parentPath) {
      const pathParts = parentPath.split('.');
      for (const part of pathParts) {
        if (
          typeof target[part]?.value === 'object' &&
          !Array.isArray(target[part]?.value)
        ) {
          target = target[part].value as JsonObject;
        } else {
          console.error('Invalid path or non-object selected');
          return;
        }
      }
    }

    // Add the new key with its value and dataType
    target[newKey] = {
      value:
        newKeyType === 'string' ? '' : newKeyType === 'boolean' ? false : {},
      dataType: newKeyType,
    };
    setJson(updatedJson);
  };

  // Update the value of a key
  const updateValue = (path: string, value: JsonValue) => {
    const updatedJson = { ...json };
    const pathParts = path.split('.');
    let target: JsonObject = updatedJson;

    // Traverse the path to find the target key
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (
        typeof target[part]?.value === 'object' &&
        !Array.isArray(target[part]?.value)
      ) {
        target = target[part].value as JsonObject;
      } else {
        console.error('Invalid path or non-object selected');
        return;
      }
    }

    // Update the value
    target[pathParts[pathParts.length - 1]].value = value;
    setJson(updatedJson);
  };

  // Remove a key from the JSON object
  const removeKey = (path: string) => {
    const updatedJson = { ...json };
    const pathParts = path.split('.');
    let target: JsonObject = updatedJson;

    // Traverse the path to find the parent of the target key
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (
        typeof target[part]?.value === 'object' &&
        !Array.isArray(target[part]?.value)
      ) {
        target = target[part].value as JsonObject;
      } else {
        console.error('Invalid path or non-object selected');
        return;
      }
    }

    // Remove the key
    delete target[pathParts[pathParts.length - 1]];
    setJson(updatedJson);
  };

  // Render the JSON object
  const renderJson = (obj: JsonObject, parentPath = ''): JSX.Element[] => {
    return Object.entries(obj).map(([key, { value, dataType }]) => {
      const fullPath = parentPath ? `${parentPath}.${key}` : key;
      return (
        <div key={fullPath} style={{ marginLeft: parentPath ? '20px' : '0' }}>
          <strong>{key}:</strong>
          {dataType === 'string' && (
            <input
              type='text'
              value={value as string}
              onChange={(e) => updateValue(fullPath, e.target.value)}
            />
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
    });
  };

  return (
    <div>
      <h1>JSON Builder</h1>
      <div>
        <NestedKeyAdder parentPath='' onAddKey={addKey} />
      </div>
      <div>{renderJson(json)}</div>
      <pre>{JSON.stringify(json, null, 2)}</pre>
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
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default JSONBuilderv2;
