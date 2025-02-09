import { Box, Stack } from '@mui/material';
import { RichTreeViewPro } from '@mui/x-tree-view-pro/RichTreeViewPro';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { useState, type MouseEvent } from 'react';
import { v4 as randomId } from 'uuid';
import { addNewItemToTree } from '../FolderTree/utils/functions';
import { CustomTreeItem, type CustomTreeItemProps } from './CustomTreeItem';
import { MUI_X_PRODUCTS, type TreeItemType } from './utils/constants';

type CustomItem = TreeViewBaseItem<TreeItemType>;

export const FolderCustom = () => {
  const apiRef = useTreeViewApiRef();
  const [items, setItems] = useState<CustomItem[]>(MUI_X_PRODUCTS);
  const [beingCreatedItemId, setBeingCreatedItemId] = useState<string | null>(
    null
  );

  const createUnderItemRecursive = (e: MouseEvent, itemId: string) => {
    const newItem: CustomItem = {
      id: randomId(),
      label: 'New Item',
      editable: true,
      editing: true,
    };
    const updatedTree = addNewItemToTree(itemId, items, newItem);
    setItems(updatedTree);
    setBeingCreatedItemId(newItem.id);
    if (!apiRef.current) return;
    apiRef.current.setItemExpansion(e, itemId, true);
  };

  const handlePositionChange = () => {
    setTimeout(() => {
      const newItemsTreeViewA = apiRef.current!.getItemTree();
      setItems(newItemsTreeViewA);
    });
  };

  return (
    <Stack
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
      }}>
      <Box
        sx={{
          minHeight: 352,
          minWidth: 300,
          display: 'flex',
          width: 350,
          alignItems: 'center',
          justifyContent: 'start',
          height: 1000,
          mt: 3,
          overflowY: 'auto',
          maxHeight: '100%',
        }}>
        <RichTreeViewPro
          apiRef={apiRef}
          items={items}
          onItemPositionChange={handlePositionChange}
          onItemLabelChange={(itemId: string, label: string) => {
            const updateItem = (folders: CustomItem[]): CustomItem[] => {
              return folders.map((folder) => {
                if (folder.id === itemId) {
                  return { ...folder, label, editable: false };
                }
                if (folder.children) {
                  return {
                    ...folder,
                    children: updateItem(folder.children),
                  };
                }
                return folder;
              });
            };
            setItems(updateItem(items));
          }}
          defaultExpandedItems={['pickers']}
          defaultSelectedItems={'pickers'}
          slots={{
            item: CustomTreeItem as React.JSXElementConstructor<CustomTreeItemProps> as any,
          }}
          slotProps={{
            item: {
              beingCreatedItemId: beingCreatedItemId,
              setBeingCreatedItemId: setBeingCreatedItemId,
              handleLabelSaveControlled: (itemId: string, label: string) => {
                const updateItem = (folders: CustomItem[]): CustomItem[] => {
                  return folders.map((folder) => {
                    if (folder.id === itemId) {
                      return { ...folder, label, editable: false };
                    }
                    if (folder.children) {
                      return {
                        ...folder,
                        children: updateItem(folder.children),
                      };
                    }
                    return folder;
                  });
                };
                setItems(updateItem(items));
              },
              onAdd: createUnderItemRecursive,
            } as CustomTreeItemProps,
          }}
          itemsReordering
          isItemEditable
          experimentalFeatures={{
            labelEditing: true,
            indentationAtItemLevel: true,
            itemsReordering: true,
          }}
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Stack>
  );
};
