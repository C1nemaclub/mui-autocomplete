import { Chip, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

interface KeyComponentProps {
  keyLabel: string;
  keyType: string;
}

const KeyComponent: FC<KeyComponentProps> = ({ keyLabel, keyType }) => {
  return (
    <Stack
      direction='row'
      gap={1}
      sx={{
        width: '100%',
        flex: 1,
      }}>
      <Typography
        sx={{
          textAlign: 'left',
          flexGrow: 1,
        }}>{`${keyLabel}: `}</Typography>
      <Chip
        label={keyType}
        size='small'
        color='primary'
        sx={{
          borderRadius: 1,
          flexGrow: 1,
          maxWidth: 80,
        }}
      />
    </Stack>
  );
};

export default KeyComponent;
