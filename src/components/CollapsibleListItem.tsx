import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type ListItemProps,
} from '@mui/material';
import React, { useState } from 'react';

interface CollapsibleListItemProps extends ListItemProps {
  title: string;
  children: React.ReactNode;
  selected?: boolean;
}

const CollapsibleListItem: React.FC<CollapsibleListItemProps> = ({
  title,
  children,
  selected = false,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ListItem disableGutters disablePadding {...rest}>
        <ListItemButton
          disableGutters
          disableRipple
          onClick={handleToggle}
          selected={selected}>
          <ListItemText primary={title} />
          <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleListItem;
