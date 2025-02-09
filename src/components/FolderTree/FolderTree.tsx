import { Folder } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import type { TreeViewItemReorderPosition } from '@mui/x-tree-view-pro/internals/plugins/useTreeViewItemsReordering';
import { RichTreeViewPro } from '@mui/x-tree-view-pro/RichTreeViewPro';
import { useTreeItem2Utils, useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import {
  TreeItem2,
  TreeItem2Label,
  TreeItem2Props,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2LabelInput } from '@mui/x-tree-view/TreeItem2LabelInput';
import {
  useTreeItem2,
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
} from '@mui/x-tree-view/useTreeItem2';
import {
  IconArrowRight,
  IconCheck,
  IconEdit,
  IconFolder,
  IconFolderFilled,
  IconPlayerStop,
  IconTrash,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { v4 as randomId } from 'uuid';
import { extractItemFromTreeById, type TreeItemMeta } from './utils/functions';

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
        {selected ? <IconFolderFilled /> : <IconFolder />}
        <Box
          component='span'
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 200,
          }}>
          {children}
        </Box>
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

  const { onClick, editingId, setEditingId, ...rest } = props;
  const hook = useTreeItem2({ id: rest.id });
  console.log(hook, 'hok');

  // console.log(interactions);

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
    console.log(event.key);
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
      slots={{
        label: CustomLabel,
        labelInput: CustomLabelInput,
      }}
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
  const [initialItems, setInitialItems] = useState<
    TreeViewBaseItem<TreeItemMeta>[]
  >([
    {
      id: '1',
      label: 'Main',
    },
    {
      id: '2',
      label: 'Secondary',
    },
  ]);
  const apiRefTreeViewA = useTreeViewApiRef();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const addFolder = () => {
    setInitialItems([
      ...initialItems,
      {
        id: randomId(),
        label: `Folder ${initialItems.length + 1}`,
        creating: true,
      },
    ]);
    setEditingId(`folder-${initialItems.length + 1}`);
  };

  const handleRemove = (itemId: string) => {
    const result = extractItemFromTreeById(itemId, initialItems);
    setInitialItems(result.updatedTree);
  };

  const handleItemPositionChange = (params: {
    itemId: string;
    oldPosition: TreeViewItemReorderPosition;
    newPosition: TreeViewItemReorderPosition;
  }) => {
    console.log('order');
    // if (!params.newPosition.parentId) return;
    // const result = extractItemFromTreeById(params.itemId, initialItems);
    // const updatedFolders = addNewItemToTree(
    //   params.newPosition.parentId,
    //   result.updatedTree,
    //   result.extractedItem!
    // );
    // setInitialItems(updatedFolders);
    setTimeout(() => {
      const newItemsTreeViewA = apiRefTreeViewA.current!.getItemTree();
      setInitialItems(newItemsTreeViewA);
    });
  };

  const handleLabelChange = (itemId: string, newLabel: string) => {};

  // const selectedItem =
  // selectedItemId && searchItem(selectedItemId, initialItems);

  const got =
    apiRefTreeViewA.current &&
    selectedItemId &&
    apiRefTreeViewA.current.getItem(selectedItemId);

  const renderItems = (
    selectedItem: TreeViewBaseItem<TreeItemMeta>,
    depth = 0
  ) => {
    return (
      <Stack
        key={selectedItem.id}
        alignItems='start'
        sx={{
          marginLeft: `${depth * 4}px`,
        }}>
        <Stack direction='row' gap={1} alignItems='center'>
          <IconArrowRight />
          <Typography>{selectedItem.label}</Typography>
        </Stack>
        {selectedItem.children &&
          selectedItem.children.map((child) => renderItems(child, depth + 1))}
      </Stack>
    );
  };

  return (
    <Stack>
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
          apiRef={apiRefTreeViewA}
          itemsReordering
          isItemEditable
          items={initialItems}
          defaultExpandedItems={['grid', 'pickers']}
          experimentalFeatures={{
            indentationAtItemLevel: true,
            itemsReordering: true,
            labelEditing: true,
          }}
          onSelectedItemsChange={(_, selectedItem) => {
            setSelectedItemId(selectedItem);
          }}
          onItemPositionChange={handleItemPositionChange}
          onItemLabelChange={handleLabelChange}
          slots={{
            item: CustomTreeItem2,
          }}
          sx={{
            height: 'fit-content',
            flexGrow: 1,
            maxWidth: 400,
            overflowY: 'auto',
            width: '100%',
          }}
          slotProps={{
            expandIcon: {
              width: 30,
              height: 30,
            },
            collapseIcon: {
              width: 30,
              height: 30,
            },
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
      <Stack>
        <Typography variant='h5'>Selected</Typography>
        {got && <Stack alignItems='center'>{renderItems(got)}</Stack>}
      </Stack>
    </Stack>
  );
};

export default FolderTree;
