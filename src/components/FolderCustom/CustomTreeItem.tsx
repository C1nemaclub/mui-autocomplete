import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import {
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Props,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2DragAndDropOverlay } from '@mui/x-tree-view/TreeItem2DragAndDropOverlay';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import {
  useTreeItem2,
  type UseTreeItem2LabelInputSlotOwnProps,
  type UseTreeItem2LabelSlotOwnProps,
} from '@mui/x-tree-view/useTreeItem2';
import clsx from 'clsx';
import * as React from 'react';
import CustomTreeIcon from './CustomTreeIcon';
import CustomTreeItemContent from './CustomTreeItemContent';
import CustomTreeLabel from './CustomTreeLabel';
import CustomTreeLabelInput from './CustomTreeLabelInput';

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

export interface CustomTreeItemProps extends TreeItem2Props {
  handleEdit: (id: string) => void;
  editing: boolean;
  beingCreatedItemId: string;
  setBeingCreatedItemId: (id: string | null) => void;
  handleLabelSaveControlled: (id: string, label: string) => void;
  onAdd: (e: React.MouseEvent, itemId: string) => void;
}

export const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  {
    id,
    itemId,
    label,
    disabled,
    children,
    onAdd,
    beingCreatedItemId,
    setBeingCreatedItemId,
  }: // handleLabelSaveControlled,
  CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { interactions, publicAPI } = useTreeItem2Utils({
    itemId: itemId,
    children: children,
  });

  const {
    getRootProps,
    getContentProps,
    getLabelProps,
    getGroupTransitionProps,
    getIconContainerProps,
    getLabelInputProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem2({ id, itemId, label, disabled, children, rootRef: ref });

  const expandable = isExpandable(children);

  const onEdit = () => {
    interactions.toggleItemEditing();
  };

  const handleInputBlur: UseTreeItem2LabelInputSlotOwnProps['onBlur'] = (
    event
  ) => {
    // event.defaultMuiPrevented = true;
  };

  const handleContentDoubleClick: UseTreeItem2LabelSlotOwnProps['onDoubleClick'] =
    (event) => {
      event.defaultMuiPrevented = true;
    };

  const newEditing = beingCreatedItemId === itemId;

  React.useEffect(() => {
    if (newEditing && !status.editing) {
      interactions.toggleItemEditing();
    }
  }, [beingCreatedItemId]);

  const childrenCount = publicAPI.getItemOrderedChildrenIds(itemId).length;
  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps()}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              'Mui-expanded': status.expanded,
              'Mui-selected': status.selected,
              'Mui-focused': status.focused,
              'Mui-disabled': status.disabled,
            }),
          })}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <CustomTreeIcon status={status} />
          </TreeItem2IconContainer>
          {status.editing ? (
            <CustomTreeLabelInput
              {...getLabelInputProps()}
              handleSaveItemLabel={(e, label) => {
                console.log('saving');
                interactions.handleSaveItemLabel(e, label);
                setBeingCreatedItemId(null);
              }}
              handleCancelItemLabelEditing={(...props) => {
                console.log('here');
                interactions.handleCancelItemLabelEditing(...props);
                setBeingCreatedItemId(null);
              }}
            />
          ) : (
            <CustomTreeLabel
              {...getLabelProps({
                expandable: expandable && status.expanded,
                onEdit: onEdit,
                onAdd: (e: React.MouseEvent) => onAdd(e, itemId),
                childrenCount: childrenCount,
                selected: status.selected,
                onDoubleClick: handleContentDoubleClick,
              })}
            />
          )}
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
          {status.disabled ? 'xd' : null}
        </CustomTreeItemContent>
        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});
