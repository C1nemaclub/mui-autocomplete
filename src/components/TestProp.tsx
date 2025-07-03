import type { FC } from 'react';

export interface TestPropProps {
  name: string;
}
const TestProp: FC<TestPropProps> = ({ name }) => {
  return <div>TestProp {name}</div>;
};

export default TestProp;
