interface UseListFieldProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  // updateItem: (index: number, item: T) => void;
}
export const useListField = <T,>(params: UseListFieldProps<T>) => {
  const { value, onChange, addItem, removeItem } = params;

  const handleAddItem = (item: any) => {
    addItem(item);
    onChange([...value, item]);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    removeItem(index);
    onChange(newValue);
  };

  return {
    value,
    onChange,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };
};
