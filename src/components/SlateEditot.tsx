import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { createEditor, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'bordered-text',
    children: [{ text: 'Inside the square' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Between' }],
  },
  {
    type: 'bordered-text',
    children: [{ text: 'Inside the square' }],
    // isText
  },
  {
    type: 'paragraph',
    children: [{ text: 'Another line of text in a paragraph.' }],
  },
];

const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  // Normalize function to separate adjacent nodes with different types

  // Render function to customize elements
  const renderElement = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case 'bordered-text':
        return (
          <Box
            {...attributes}
            component='div'
            contentEditable={false}
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #f0f0f0',
              padding: '4px',
              borderRadius: '6px',
              margin: '10px 0',
              width: 'fit-content',
              boxSizing: 'border-box',
              // backgroundColor: '#f0f0f0',
              color: '#fff',
              mx: 0.5,
              // pointerEvents: 'none',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={(event) => {
              event.preventDefault();
              // Remove the element when clicked
              const path = ReactEditor.findPath(editor, element);
              Transforms.removeNodes(editor, { at: path });
            }}>
            {children}
          </Box>
        );
      default:
        return <span {...attributes}>{children}</span>;
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        maxWidth: '600px',
        margin: '0 auto',
      }}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          console.log(value);
          // get the concatenated text string of a node's content
          console.log(
            editor.children
              .map((node) => node.children.map((text) => text.text).join(''))
              .join('')
          );
        }}>
        <Editable
          as='p'
          renderElement={renderElement}
          style={{
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: 56, // Minimum height of 56px
            maxHeight: 'none', // Remove restrictions on height
            overflowY: 'auto', // Add scrollbar if content exceeds container height
            // resize: 'vertical', // Allow resizing like a textarea
            display: 'block', // Block layout for textarea behavior
            whiteSpace: 'pre-wrap', // Maintain line breaks and wrap text
            textAlign: 'left', // Left-align text
            // Center the text on Y axis too
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              editor.insertText('\n'); // Insert new lines
            }
          }}
        />
      </Slate>
      <TextField label='Plain text' variant='outlined' fullWidth />
    </Box>
  );
};

export default SlateEditor;
