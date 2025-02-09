import { Box, IconButton, styled, Typography } from '@mui/material';
import { TreeItem2Label } from '@mui/x-tree-view/TreeItem2';
import {
  IconFolder,
  IconFolderPlus,
  IconFolderSymlink,
  IconPencilMinus,
} from '@tabler/icons-react';
import type React from 'react';
import type { MouseEvent } from 'react';

const StyledTreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontWeight: 500,
  textAlign: 'left',
}) as unknown as typeof Typography;

interface CustomLabelProps {
  children: React.ReactNode;
  expandable?: boolean;
  editable?: boolean;
  editing?: boolean;
  onEdit?: (e: MouseEvent) => void;
  onAdd?: (e: MouseEvent) => void;
  childrenCount?: number;
}

function CustomTreeLabel({
  expandable,
  children,
  onEdit,
  onAdd,
  childrenCount,
  ...other
}: CustomLabelProps) {
  const FolderIcon = expandable ? IconFolderSymlink : IconFolder;
  return (
    <TreeItem2Label
      {...other}
      title={typeof children === 'string' ? children : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
      <Box
        component={FolderIcon}
        sx={{
          color: ({ palette }) =>
            expandable ? palette.warning.main : palette.text.secondary,
          flexShrink: 0,
          marginRight: 1,
        }}
      />
      <StyledTreeItemLabelText noWrap>
        {children}
        {childrenCount && childrenCount > 0 ? ` (${childrenCount})` : null}
      </StyledTreeItemLabelText>
      <IconButton onClick={onEdit} sx={{ ml: 'auto' }}>
        <IconPencilMinus />
      </IconButton>
      <IconButton onClick={onAdd}>
        <IconFolderPlus />
      </IconButton>
    </TreeItem2Label>
  );
}

export default CustomTreeLabel;
