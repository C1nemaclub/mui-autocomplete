import { type TreeItem2IconProps } from '@mui/x-tree-view/TreeItem2Icon';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import type { FC } from 'react';

const CustomTreeIcon: FC<TreeItem2IconProps> = ({ status }) => {
  if (!status.expandable) return null;
  return (
    <>
      {status.expanded ? (
        <IconChevronDown size={20} style={{ flexShrink: 0 }} />
      ) : (
        <IconChevronRight size={20} style={{ flexShrink: 0 }} />
      )}
    </>
  );
};

export default CustomTreeIcon;
