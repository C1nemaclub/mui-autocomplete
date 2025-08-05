import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { IconBraces } from '@tabler/icons-react';
import { dot } from 'dot-object';
import { Fragment, useState } from 'react';
import {
  data,
  mockValues,
  mockValuesToSelectedKeys,
  type DataType,
} from './utils/constants';

const keysArray = Object.keys(dot(mockValues));

const Suffer = () => {
  // const [selected, setSelected] = useState<Record<string, boolean>>(() =>
  //   dot(mockValues)
  // );
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    mockValuesToSelectedKeys(mockValues)
  );

  const handleToggle = (key: string, previousPath) => {
    console.log(previousPath);
    console.log(key);
    const updated = {
      ...selected,
      [key]: !selected[key],
    };
    setSelected(updated);
  };

  const renderItems = (data: DataType, path: string = '', level = 0) => {
    return (
      <List disablePadding sx={{}}>
        {data.map((item) => {
          const fullPath = path
            ? `${path}.${item.value}.value`
            : `${item.value}.value`;
          const canHaveChildren =
            item.data_type === 'json' || item.data_type === 'list.json';
          const hasAvailableChildren = item.available_values;
          return (
            <Fragment key={fullPath}>
              <ListItem disableGutters disablePadding>
                <ListItemButton
                  disableRipple
                  dense
                  onClick={() => {
                    !canHaveChildren && handleToggle(fullPath, path);
                  }}>
                  <ListItemIcon>
                    {!canHaveChildren ? (
                      <Checkbox
                        disableRipple
                        checked={selected[fullPath] ?? false}
                      />
                    ) : (
                      <IconBraces />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ pl: level * 3, width: '100%' }}
                  />
                </ListItemButton>
              </ListItem>
              {canHaveChildren &&
                hasAvailableChildren &&
                renderItems(item.available_values, fullPath, level + 1)}
            </Fragment>
          );
        })}
      </List>
    );
  };

  const transformSelectedToJsonSchema = () => {
    const buildSelectedTree = (
      selected: Record<string, boolean>,
      source: typeof mockValues
    ) => {
      const result: any = {};

      for (const [fullPath, isSelected] of Object.entries(selected)) {
        if (!isSelected) continue;

        const pathParts = fullPath.split('.');
        let currentSource: any = source;
        let currentResult: any = result;
        let currentMockPointer = result;

        for (let i = 0; i < pathParts.length; i += 2) {
          const key = pathParts[i]; // e.g. contracts, id, etc.
          const valueKey = pathParts[i + 1]; // always 'value' in this schema

          if (!currentSource?.[key]) break; // invalid path

          // Leaf node
          if (i + 2 >= pathParts.length) {
            // Shallow clone the field
            if (currentSource[key]) {
              currentResult[key] = currentSource[key];
            }
            break;
          }

          // Prepare nested structure
          if (!currentResult[key]) {
            currentResult[key] = {
              ...currentSource[key],
              value: {},
            };
          }

          // Move deeper
          currentResult = currentResult[key].value;
          currentSource = currentSource[key]?.value;
        }
      }

      return result;
    };

    const result = buildSelectedTree(selected, mockValues);
    console.log(result);

    // console.log(selected);

    // const pathsToRemove = Object.entries(selected).reduce((acc, item) => {
    //   const [path, state] = item;
    //   if (!state) acc.push(path.split('.').slice(0, -1).join('.'));
    //   return acc;
    // }, [] as string[]);
    // console.log(pathsToRemove, 'paths to remove');
    // console.log('BEfore', mockValues);
    // const copy = { ...mockValues };
    // remove(pathsToRemove, copy);
    // console.log('after', copy);
  };

  return (
    <Stack p={4} width='100%' alignItems='center'>
      <Typography variant='h5'>Field Selection</Typography>
      {renderItems(data)}
      <Button variant='contained' onClick={transformSelectedToJsonSchema}>
        Submit
      </Button>
      <pre>{JSON.stringify({ selected }, null, 2)}</pre>
    </Stack>
  );
};

export default Suffer;
