import { Stack } from '@mui/material';
import type { FC } from 'react';
import KeyComponent from './KeyComponent';
import ValueComponent from './ValueComponent';

interface JSONComponentProps {
  obj: Record<string, any>;
}
const JSONComponent: FC<JSONComponentProps> = ({ obj }) => {
  return (
    <>
      <Stack alignItems='start' gap={1}>
        {Object.keys(obj).map((key) => {
          const variableType = typeof obj[key as keyof typeof obj];
          return (
            <Stack direction='row' gap={1}>
              <KeyComponent keyLabel={key} keyType={variableType} />
              <ValueComponent keyType={variableType} value={obj[key]} />
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default JSONComponent;
