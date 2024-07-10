import React, { FC, useEffect, useRef, useState } from 'react';
import { AutocompleteRenderGetTagProps, Box, Chip } from '@mui/material';
import { FixedSizeGrid as Grid } from 'react-window';

interface RenderTagsProps {
  values: string[];
  getTagProps: AutocompleteRenderGetTagProps;
}

const RenderTags: FC<RenderTagsProps> = ({ values, getTagProps }) => {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    console.log('Scrolling');
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollBottom = scrollTop + container.clientHeight;
      const startIndex = Math.floor(scrollTop / 32);
      const endIndex = Math.ceil(scrollBottom / 32);
      setVisibleTags(values.slice(startIndex, endIndex));
    }
  };

  useEffect(() => {}, []);
  return (
    <Box
      ref={containerRef}
      onScroll={scrollHandler}
      sx={{
        height: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {values.map((option, index) => (
        <Chip
          variant='filled'
          label={option}
          {...getTagProps({ index })}
          key={index}
        />
      ))}
    </Box>
  );
};

export default RenderTags;
