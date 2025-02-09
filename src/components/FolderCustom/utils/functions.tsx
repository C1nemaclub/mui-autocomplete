import { Stack, Typography } from '@mui/material';
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { IconArrowRight, IconFolder } from '@tabler/icons-react';

export const renderItems = (selectedItem: TreeViewBaseItem, depth = 0) => {
  const hasChildren = selectedItem.children && selectedItem.children.length > 0;
  const Icon = hasChildren ? IconFolder : IconArrowRight;
  return (
    <Stack
      key={selectedItem.id}
      alignItems='start'
      sx={{
        marginLeft: `${depth * 4}px`,
      }}>
      <Stack direction='row' gap={1}>
        <Icon />
        <Typography sx={{ height: 45 }}>{selectedItem.label}</Typography>
      </Stack>
      {selectedItem.children &&
        selectedItem.children.map((child) => renderItems(child, depth + 1))}
    </Stack>
  );
};
