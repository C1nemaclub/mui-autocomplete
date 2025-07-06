import {
  Button,
  Stack,
  type ButtonProps,
  type StackProps,
} from '@mui/material';
import { createContext, useContext, type FC, type ReactNode } from 'react';

interface CompoundContextProps<T> {
  value: Array<T>;
  addItem: () => void;
  clear: () => void;
  updateAt: (index: number, newVal: T) => void;
  renderItem: (params: RenderItemProps<T>) => ReactNode;
  removeItemByIndex: (index: number) => void;
}

const CompoundListContext = createContext<
  CompoundContextProps<any> | undefined
>(undefined);

interface CompoundListProps<T> {
  value: Array<T>;
  defaultVal: T;
  onChange: (value: Array<T>) => void;
  children: ReactNode;
  renderItem: (params: RenderItemProps<T>) => ReactNode;
}

const CompoundList = <T,>({
  value,
  children,
  onChange,
  defaultVal,
  renderItem,
}: CompoundListProps<T>) => {
  const addItem = () => {
    onChange([...value, defaultVal]);
  };
  const clear = () => {
    onChange([]);
  };
  const updateAt = (index: number, newVal: T) => {
    const newArr = [...value];
    newArr[index] = newVal;
    onChange(newArr);
  };
  const removeItemByIndex = (index: number) => {
    const newArr = [...value];
    onChange(newArr.filter((_, i) => i !== index));
  };
  return (
    <CompoundListContext.Provider
      value={{
        value,
        addItem,
        clear,
        updateAt,
        renderItem,
        removeItemByIndex,
      }}>
      {children}
    </CompoundListContext.Provider>
  );
};

function useCompoundListContext<T>(): CompoundContextProps<T> {
  const ctx = useContext(CompoundListContext);
  if (!ctx)
    throw new Error('useCompoundListContext must be used inside CompoundList');
  return ctx;
}

const AddButton: FC<ButtonProps> = ({ ...rest }) => {
  const { addItem } = useCompoundListContext();
  return <Button onClick={addItem} {...rest} />;
};

const ClearButton: FC<ButtonProps> = ({ ...rest }) => {
  const { clear } = useCompoundListContext();
  return <Button onClick={clear} {...rest} />;
};

interface RenderItemProps<T> {
  value: T;
  index: number;
  onChange: (val: T) => void;
  onRemove: () => void;
}

interface ItemsProps extends StackProps {}

const Items = ({ ...rest }: ItemsProps) => {
  const { value, updateAt, renderItem, removeItemByIndex } =
    useCompoundListContext<any>();
  return (
    <Stack {...rest}>
      {value.map((item, i) =>
        renderItem({
          value: item,
          index: i,
          onChange: (val) => updateAt(i, val),
          onRemove: () => removeItemByIndex(i),
        })
      )}
    </Stack>
  );
};

CompoundList.AddButton = AddButton;
CompoundList.ClearButton = ClearButton;
CompoundList.Items = Items;

export default CompoundList;
