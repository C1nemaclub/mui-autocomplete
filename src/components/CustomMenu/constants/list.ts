import { IconDashboard, IconFolder, IconPencilBolt } from '@tabler/icons-react';
import type { MenuOption } from '../interfaces/types.menu';

export const menuItems: MenuOption[] = [
  {
    label: 'Option 1',
    icon: IconFolder,
    value: 'option1',
  },
  {
    label: 'Option 2',
    icon: IconDashboard,
    value: 'option2',
  },
  {
    label: 'Option 3',
    icon: IconPencilBolt,
    value: 'option3',
  },
];
