import { FC } from 'react';

interface CompProps {
  name: string;
  disabled: boolean;
  onSave: () => void;
}

interface CompReadonlyProps {
  name: string;
  readonly: boolean;
}

const Comp: FC<CompProps | CompReadonlyProps> = () => {
  return 'hello';
};

export default Comp;
