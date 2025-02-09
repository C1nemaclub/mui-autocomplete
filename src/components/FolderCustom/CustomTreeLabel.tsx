import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import { TreeItem2Label } from '@mui/x-tree-view/TreeItem2';
import {
  IconFolderFilled,
  IconFolderPlus,
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
  selected?: boolean;
}

function CustomTreeLabel({
  children,
  onEdit,
  onAdd,
  childrenCount,
  selected,
  ...other
}: CustomLabelProps) {
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
        component={IconFolderFilled}
        sx={{
          color: ({ palette }) =>
            selected ? palette.warning.main : palette.text.secondary,
          flexShrink: 0,
          marginRight: 1,
        }}
      />
      <StyledTreeItemLabelText noWrap>
        {children}
        {childrenCount && childrenCount > 0 ? ` (${childrenCount})` : null}
      </StyledTreeItemLabelText>
      {selected && (
        <Stack direction='row' sx={{ ml: 'auto' }}>
          <IconButton onClick={onEdit} sx={{ ml: 'auto', p: 0 }}>
            <IconPencilMinus />
          </IconButton>
          <IconButton onClick={onAdd} sx={{ p: 0, ml: 1 }}>
            <IconFolderPlus />
          </IconButton>
        </Stack>
      )}
    </TreeItem2Label>
  );
}

export default CustomTreeLabel;
