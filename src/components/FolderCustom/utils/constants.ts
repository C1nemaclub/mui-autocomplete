import { TreeViewBaseItem } from '@mui/x-tree-view/models';

export type TreeItemType = {
  id: string;
  label: string;
  disabled?: boolean;
  editable?: boolean;
  editing?: boolean;
};

export const MUI_X_PRODUCTS: TreeViewBaseItem<TreeItemType>[] = [
  {
    id: 'grid',
    label: 'Data Grid',
    editable: true,
    editing: false,
    children: [
      {
        id: 'grid-community',
        label: '@mui/x-data-grid',
        editable: true,
        editing: false,
      },
      {
        id: 'grid-pro',
        label: '@mui/x-data-grid-pro',
        editable: true,
        editing: false,
      },
      {
        id: 'grid-premium',
        label: '@mui/x-data-grid-premium',
        editable: true,
        editing: false,
      },
    ],
  },
  {
    id: 'pickers',
    label: 'Date and Time pickers',
    editable: true,
    editing: false,
    children: [
      {
        id: 'pickers-community',
        label: '@mui/x-date-pickers',
        disabled: true,
        editable: true,
        editing: false,
      },

      {
        id: 'pickers-pro',
        label: '@mui/x-date-pickers-pro',
        editable: true,
        editing: false,
      },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    editable: true,
    editing: false,
    children: [
      {
        id: 'charts-community',
        label: '@mui/x-charts',
        editable: true,
        editing: false,
      },
    ],
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    editable: true,
    editing: false,
    children: [
      {
        id: 'tree-view-community',
        label: '@mui/x-tree-view',
        editable: true,
        editing: false,
      },
    ],
  },
];
