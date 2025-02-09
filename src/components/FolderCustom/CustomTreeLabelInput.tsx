import { IconButton } from '@mui/material';
import { TreeItem2LabelInput } from '@mui/x-tree-view/TreeItem2LabelInput';
import type { UseTreeItem2LabelInputSlotOwnProps } from '@mui/x-tree-view/useTreeItem2';
import { IconCheck, IconXboxXFilled } from '@tabler/icons-react';
import React from 'react';

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: React.SyntheticEvent) => void;
  handleSaveItemLabel: (event: React.SyntheticEvent, label: string) => void;
  value: string;
}

function CustomTreeLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
  const { handleCancelItemLabelEditing, handleSaveItemLabel, value, ...other } =
    props;

  return (
    <React.Fragment>
      <TreeItem2LabelInput
        {...other}
        value={value}
        style={{
          color: '#fff',
        }}
      />
      <IconButton
        color='success'
        size='small'
        onClick={(event: React.MouseEvent) => {
          handleSaveItemLabel(event, value);
        }}>
        <IconCheck />
      </IconButton>
      <IconButton
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
