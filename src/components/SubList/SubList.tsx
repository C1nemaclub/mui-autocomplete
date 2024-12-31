import { ExpandLess, ExpandMore, InsertComment } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';

const items = [
  {
    value: '1',
    label: 'Item 1',
    subItems: [
      { value: '1.1', label: 'Sub Item 1' },
      { value: '1.2', label: 'Sub Item 2' },
    ],
  },
  {
    value: '2',
    label: 'Item 2',
    subItems: [
      { value: '2.1', label: 'Sub Item 1' },
      { value: '2.2', label: 'Sub Item 2' },
    ],
  },
  {
    value: '3',
    label: 'Item 3',
    subItems: [
      { value: '3.1', label: 'Sub Item 1' },
      { value: '3.2', label: 'Sub Item 2' },
    ],
  },
];

interface SubListProps {
  currentItem: string | null;
  currentSubItem: string | null;
}

const SubList: React.FC<SubListProps> = ({ currentItem, currentSubItem }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    currentItem || '',
  ]);
  const [selectedItem, setSelectedItem] = useState<string | null>(currentItem);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(
    currentSubItem
  );

  const handleToggle = (value: string) => {
    setExpandedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  //   const handleSelectItem = (value: string) => {
  //     setSelectedItem(value);
  //     setSelectedSubItem(null); // Reset subitem selection when a new item is selected
  //   };

  const handleSelectSubItem = (parentValue: string, subValue: string) => {
    setSelectedItem(parentValue); // Select the parent item
    setSelectedSubItem(subValue); // Select the subitem
    if (!expandedItems.includes(parentValue)) {
      setExpandedItems((prev) => [...prev, parentValue]); // Ensure the parent menu is expanded
    }
  };

  return (
    <Box>
      <List>
        {items.map((item) => (
          <React.Fragment key={item.value}>
            <ListItemButton
              onClick={() => {
                handleToggle(item.value);
                handleSelectItem(item.value);
              }}
              selected={selectedItem === item.value}>
              <ListItemIcon>
                <InsertComment />
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {expandedItems.includes(item.value) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>
            <Collapse
              in={expandedItems.includes(item.value)}
              timeout='auto'
              unmountOnExit>
              <List disablePadding>
                {item.subItems.map((subItem) => (
                  <ListItemButton
                    key={subItem.value}
                    sx={{ pl: 4 }}
                    onClick={() =>
                      handleSelectSubItem(item.value, subItem.value)
                    }
                    selected={selectedSubItem === subItem.value}>
                    <ListItemIcon>
                      <InsertComment />
                    </ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Button variant='contained' disabled={!selectedItem || !selectedSubItem}>
        Continue
      </Button>
    </Box>
  );
};

export default SubList;
