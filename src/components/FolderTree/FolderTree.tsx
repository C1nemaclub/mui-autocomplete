import { Folder } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { RichTreeViewPro } from '@mui/x-tree-view-pro/RichTreeViewPro';
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import {
  TreeItem2,
  TreeItem2Label,
  TreeItem2Props,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2LabelInput } from '@mui/x-tree-view/TreeItem2LabelInput';
import {
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
} from '@mui/x-tree-view/useTreeItem2';
import {
  IconCheck,
  IconEdit,
  IconFolder,
  IconPlayerStop,
  IconTrash,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

interface TreeItemMeta extends TreeViewBaseItem {
  creating?: boolean;
}

const ITEMS: TreeViewBaseItem<TreeItemMeta>[] = [
  {
    id: 'grid',
    label: 'Data Grid',
    creating: false,
    children: [
      { id: 'grid-community', label: '@mui/x-data-grid', creating: false },
      { id: 'grid-pro', label: '@mui/x-data-grid-pro', creating: false },
      {
        id: 'grid-premium',
        label: '@mui/x-data-grid-premium',
        creating: false,
      },
    ],
  },
  {
    id: 'pickers',
    label: 'Date and Time Pickers',
    creating: false,
    children: [
      {
        id: 'pickers-community',
        label: '@mui/x-date-pickers',
        creating: false,
      },
      { id: 'pickers-pro', label: '@mui/x-date-pickers-pro', creating: false },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    creating: false,
    children: [
      { id: 'charts-community', label: '@mui/x-charts', creating: false },
    ],
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    creating: false,
    children: [
      { id: 'tree-view-community', label: '@mui/x-tree-view', creating: false },
    ],
  },
];

interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  editing: boolean;
  toggleItemEditing: () => void;
  selected: boolean;
  deleteItem: () => void;
  childrenCount: number | null;
}

function CustomLabel({
  editing,
  editable,
  children,
  toggleItemEditing,
  selected,
  deleteItem,
  childrenCount,
  ...other
}: CustomLabelProps) {
  const [hover, setHover] = useState(false);

  return (
    <TreeItem2Label
      {...other}
      editable={editable}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
        height: 35,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Stack direction='row' gap={1} alignItems='center'>
        <IconFolder />
        {children}
        {/* {childrenCount !== null && childrenCount > 0 && ` (${childrenCount})`} */}
      </Stack>
      {editable && hover && (
        <Stack direction='row'>
          <IconButton
            size='small'
            onClick={toggleItemEditing}
            sx={{ color: 'text.secondary' }}>
            <IconEdit />
          </IconButton>
          <IconButton color='error' size='small' onClick={deleteItem}>
            <IconTrash />
          </IconButton>
        </Stack>
      )}
    </TreeItem2Label>
  );
}

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: React.SyntheticEvent) => void;
  handleSaveItemLabel: (event: React.SyntheticEvent, label: string) => void;
  value: string;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

function CustomLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
  const {
    handleCancelItemLabelEditing,
    handleSaveItemLabel,
    value,
    setEditingId,
    ...other
  } = props;

  return (
    <React.Fragment>
      <TreeItem2LabelInput
        {...other}
        value={value}
        style={{
          color: '#fff',
        }}
      />
      {/* <IconCheck
        color='success'
        size='small'
        onClick={(event: React.MouseEvent) => {
          handleSaveItemLabel(event, value);
        }}>
        <CheckIcon fontSize='small' />
      </IconCheck> */}
      <IconButton
        color='success'
        size='small'
        onClick={(event: React.MouseEvent) => {
          handleSaveItemLabel(event, value);
          setEditingId(null);
        }}>
        <IconCheck />
      </IconButton>
      <IconButton
        color='error'
        size='small'
        onClick={(e) => {
          handleCancelItemLabelEditing(e);
          setEditingId(null);
        }}>
        <IconPlayerStop />
      </IconButton>
    </React.Fragment>
  );
}

const CustomTreeItem2 = React.forwardRef(function CustomTreeItem2(
  props: TreeItem2Props,
  ref: React.Ref<HTMLLIElement>
) {
  const { interactions, status, ...x } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children,
  });

  // console.log(interactions);

  const { onClick, editingId, setEditingId, ...rest } = props;

  const handleContentDoubleClick: UseTreeItem2LabelSlotOwnProps['onDoubleClick'] =
    (event) => {
      event.defaultMuiPrevented = true;
    };

  const handleInputBlur: UseTreeItem2LabelInputSlotOwnProps['onBlur'] = (
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleInputKeyDown: UseTreeItem2LabelInputSlotOwnProps['onKeyDown'] = (
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRemove = () => {
    onClick &&
      onClick(
        new MouseEvent('click') as unknown as React.MouseEvent<
          HTMLLIElement,
          MouseEvent
        >
      );
  };

  const childrenCount = props.children
    ? props.children.props.itemsToRender.length
    : null;

  useEffect(() => {
    if (props.itemId === editingId) {
      interactions.toggleItemEditing();
    }
  }, []);

  return (
    <TreeItem2
      {...rest}
      ref={ref}
      slots={{ label: CustomLabel, labelInput: CustomLabelInput }}
      slotProps={{
        label: {
          onDoubleClick: handleContentDoubleClick,
          editable: status.editable,
          editing: status.editing,
          selected: status.selected,
          toggleItemEditing: interactions.toggleItemEditing,
          deleteItem: handleRemove,
          childrenCount: childrenCount,
        } as CustomLabelProps,
        labelInput: {
          onBlur: handleInputBlur,
          onKeyDown: handleInputKeyDown,
          setEditingId: setEditingId,
          handleCancelItemLabelEditing:
            interactions.handleCancelItemLabelEditing,
          handleSaveItemLabel: interactions.handleSaveItemLabel,
        } as CustomLabelInputProps,
      }}
    />
  );
});
const FolderTree = () => {
  const [initialItems, setInitialItems] =
    useState<TreeViewBaseItem<TreeItemMeta>[]>(ITEMS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addFolder = () => {
    setInitialItems([
      ...initialItems,
      {
        id: `folder-${initialItems.length + 1}`,
        label: `Folder ${initialItems.length + 1}`,
        creating: true,
      },
    ]);
    setEditingId(`folder-${initialItems.length + 1}`);
  };

  const handleRemove = (itemId: string) => {
    // Fix, not searching recursively
    setInitialItems(initialItems.filter((item) => item.id !== itemId));
  };

  return (
    <Stack>
      <pre>{JSON.stringify({ editingId }, null, 2)}</pre>
      <Stack
        direction='row'
        gap={1}
        alignItems='center'
        justifyContent='center'>
        <Typography variant='h6'>FolderTree</Typography>
        <Button
          startIcon={<Folder />}
          variant='contained'
          size='small'
          onClick={addFolder}>
          Add Folder
        </Button>
      </Stack>
      <Box
        sx={{
          minHeight: 352,
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
        }}>
        <RichTreeViewPro
          itemsReordering
          isItemEditable
          items={initialItems}
          defaultExpandedItems={['grid', 'pickers']}
          experimentalFeatures={{
            indentationAtItemLevel: true,
            itemsReordering: true,
            labelEditing: true,
          }}
          onItemPositionChange={(params) => {
            console.log(params);
          }}
          onItemLabelChange={(x, y) => {
            console.log(x, y);
            // Fix, not searching recursively
            setInitialItems(
              initialItems.map((item) =>
                item.id === x ? { ...item, label: y } : item
              )
            );
          }}
          slots={{
            item: CustomTreeItem2,
            // expandIcon: undefined,
            // collapseIcon: undefined,
          }}
          sx={{
            height: 'fit-content',
            flexGrow: 1,
            maxWidth: 400,
            overflowY: 'auto',
            width: '100%',
          }}
          slotProps={{
            // collapseIcon: {
            //   color: 'orange',
            //   fontSize: '3rem',
            // },
            item: (props) => {
              return {
                onClick: () => {
                  handleRemove(props.itemId);
                },
                xd: 'xd',
                editingId: editingId,
                setEditingId: setEditingId,
              };
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default FolderTree;
