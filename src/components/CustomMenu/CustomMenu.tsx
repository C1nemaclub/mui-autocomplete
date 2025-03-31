import { Box, Menu, menuClasses, type MenuProps } from '@mui/material';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

interface AnchorProps {
  onClick: (e: MouseEvent) => void;
  isOpen: boolean;
}

interface CustomMenuProps {
  renderAnchor: ({ onClick, isOpen }: AnchorProps) => ReactNode;

  children: ((close: () => void, open: boolean) => ReactNode) | ReactNode;
  anchorOrigin?: MenuProps['anchorOrigin'];
  transformOrigin?: MenuProps['transformOrigin'];
}

const CustomMenu: FC<CustomMenuProps> = ({
  renderAnchor,
  children,
  anchorOrigin,
  transformOrigin,
}) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorElement);
  const content =
    typeof children === 'function'
      ? children(() => setAnchorElement(null), isOpen)
      : children;

  return (
    <>
      <Menu
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        open={isOpen}
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        sx={{
          [`& .${menuClasses.list}`]: {
            padding: 0,
          },
        }}>
        <Box>{content}</Box>
      </Menu>
      {renderAnchor({
        isOpen,
        onClick: (event) =>
          setAnchorElement(event.currentTarget as HTMLElement),
      })}
    </>
  );
};

export default CustomMenu;
