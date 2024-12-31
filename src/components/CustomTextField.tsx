import { Stack, Typography } from '@mui/material';
import { FC, useRef } from 'react';

interface CustomTextFieldProps {
  name: string;
  label: string;
  onChange: (event: string) => void;
  value: string;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  value,
  onChange,
  label,
}) => {
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const ref = useRef<HTMLDivElement>(null);
  const handleDoubleClick = () => {
    if (ref.current) {
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <Stack
      ref={ref}
      alignItems='center'
      direction='row'
      data-label={label}
      sx={{
        width: '100%',
        position: 'relative',
        border: '1px solid #666',
        borderRadius: 1,
        padding: '10px',
        height: '56px',
        '&:focus': {
          outline: 'none',
          borderColor: ({ palette }) => palette.primary.main,
          boxShadow: '0 0 0 0.1rem rgba(0,123,255,.25)',
        },
        '::after': {
          content: 'attr(data-label)',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(25%, -50%)',
          zIndex: 1,
          backgroundColor: '#121212',
          borderRadius: 4,
          padding: '0 4px',
          fontSize: '0.85rem',
          color: ({ palette }) => palette.primary.main,
        },
      }}
      contentEditable
      suppressContentEditableWarning
      onDoubleClick={handleDoubleClick}
      onInput={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.currentTarget.textContent);
        onChange(e.currentTarget.textContent ?? '');

        // Restore cursor position to the end of the text
        const range = document.createRange();
        const sel = window.getSelection();
        if (ref.current) {
          range.selectNodeContents(ref.current);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }}
      tabIndex={0} // Allows focus for keyboard navigation if needed
      role='textbox'
      aria-readonly='true'>
      <Typography>{value}</Typography>
    </Stack>
  );
};

export default CustomTextField;
