import { IconButton } from '@mui/material';
import { TreeItem2LabelInput } from '@mui/x-tree-view/TreeItem2LabelInput';
import type { UseTreeItem2LabelInputSlotOwnProps } from '@mui/x-tree-view/useTreeItem2';
import { IconCheck, IconXboxXFilled } from '@tabler/icons-react';
import React, { useEffect } from 'react';

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: React.SyntheticEvent) => void;
  handleSaveItemLabel: (event: React.SyntheticEvent, label: string) => void;
  value: string;
}

function CustomTreeLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
  const { handleCancelItemLabelEditing, handleSaveItemLabel, value, ...other } =
    props;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <React.Fragment>
      <TreeItem2LabelInput
        {...other}
        value={value}
        style={{
          color: '#fff',
        }}
        ref={inputRef}
      />
      <IconButton
        sx={{ p: 0 }}
        color='success'
        size='small'
        onClick={(event: React.MouseEvent) => {
          handleSaveItemLabel(event, value);
        }}>
        <IconCheck />
      </IconButton>
      <IconButton
        sx={{ p: 0 }}
        color='error'
        size='small'
        onClick={(e) => {
          handleCancelItemLabelEditing(e);
        }}>
        <IconXboxXFilled />
      </IconButton>
    </React.Fragment>
  );
}

export default CustomTreeLabelInput;
