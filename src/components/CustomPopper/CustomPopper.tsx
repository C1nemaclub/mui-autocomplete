import { Box, ClickAwayListener, Fade, Popper } from '@mui/material';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

interface AnchorProps {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
}

interface CustomPopperProps {
  renderAnchor: ({ onClick, isOpen }: AnchorProps) => ReactNode;
  children: ((close: () => void, open: boolean) => ReactNode) | ReactNode;
}

const CustomPopper: FC<CustomPopperProps> = ({ children, renderAnchor }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const content =
    typeof children === 'function'
      ? children(() => setAnchorEl(null), open)
      : children;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      {renderAnchor({
        isOpen: open,
        onClick: (event: MouseEvent<HTMLElement>) => handleClick(event),
      })}

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Fade in={open}>
            <Box>{content}</Box>
          </Fade>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default CustomPopper;
