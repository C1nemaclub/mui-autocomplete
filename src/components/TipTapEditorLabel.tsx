import { Box, styled } from '@mui/material';

const TipTapEditorLabel = styled(Box)(({ theme }) => {
  return {
    transition: '0.2s',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(5%, -50%)',
    backgroundColor: '#121212',
    padding: '0 10px',
    fontSize: 'medium',
    pointerEvents: 'none',
    [`&.focused, &.has-value`]: {
      top: 0,
      left: 0,
      transform: 'translate(15%, -50%)',
      fontSize: 'small',
      color: theme.palette.primary.main,
    },
    '&.empty': {
      color: '#adb5bd',
      fontSize: 'medium',
    },
    '&.empty.focused': {
      top: 0,
      left: 0,
      transform: 'translate(15%, -50%)',
      fontSize: 'small',
      color: theme.palette.primary.main,
    },
  };
});

export default TipTapEditorLabel;
