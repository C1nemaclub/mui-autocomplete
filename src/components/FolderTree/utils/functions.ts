import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

export interface TreeItemMeta extends TreeViewBaseItem {
  creating?: boolean;
}

export const extractItemFromTreeById = (
  itemId: string,
  tree: TreeViewBaseItem<TreeItemMeta>[]
) => {
  let extractedItem: TreeViewBaseItem<TreeItemMeta> | null = null;

  const searchAndExtract = (
    folders: TreeViewBaseItem<TreeItemMeta>[]
  ): TreeViewBaseItem<TreeItemMeta>[] => {
    return folders
      .map((folder) => {
        if (folder.id === itemId) {
          extractedItem = folder;
          return null;
        }
        if (folder.children) {
          const newChildren = searchAndExtract(folder.children);
          return { ...folder, children: newChildren };
        }
        return folder;
      })
      .filter(Boolean) as TreeViewBaseItem<TreeItemMeta>[];
  };

  const updatedTree = searchAndExtract(tree);

  return {
    updatedTree,
    extractedItem,
  };
};

export const addNewItemToTree = (
  itemId: string,
  tree: TreeViewBaseItem<TreeItemMeta>[],
  newItem: TreeViewBaseItem<TreeItemMeta>
) => {
  const searchAndUpdate = (
    folders: TreeViewBaseItem<TreeItemMeta>[]
  ): TreeViewBaseItem<TreeItemMeta>[] => {
    const mappedFolders = folders.map((folder) => {
      if (folder.id === itemId) {
        return {
          ...folder,
          children: folder.children ? [...folder.children, newItem] : [newItem],
        };
      }
      if (folder.children) {
        return { ...folder, children: searchAndUpdate(folder.children) };
      }
      return folder;
    });
    return mappedFolders;
  };

  return searchAndUpdate(tree);
};

export const searchItem = (
  itemId: string,
  tree: TreeViewBaseItem<TreeItemMeta>[]
) => {
  const searchAndExtract = (
    folders: TreeViewBaseItem<TreeItemMeta>[]
  ): TreeViewBaseItem<TreeItemMeta> | null => {
    for (const folder of folders) {
      if (folder.id === itemId) {
        return folder;
      }
      if (folder.children) {
        const foundItem = searchAndExtract(folder.children);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  };

  return searchAndExtract(tree);
};
