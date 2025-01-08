import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import CollapsibleListItem from './CollapsibleListItem';

const MyList: React.FC = () => {
  return (
    <List>
      <CollapsibleListItem title='Item 1'>
        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary='Nested Item 1.1' />
        </ListItem>
        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary='Nested Item 1.2' />
        </ListItem>
      </CollapsibleListItem>
      <CollapsibleListItem title='Item 2'>
        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary='Nested Item 2.1' />
        </ListItem>
        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary='Nested Item 2.2' />
        </ListItem>
      </CollapsibleListItem>
    </List>
  );
};

export default MyList;
