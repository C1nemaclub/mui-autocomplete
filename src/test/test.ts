const values = {
  email: { value: '', dataType: 'string' },
  data: {
    dataType: 'json',
    value: {
      name: {
        dataType: 'string',
        value: '',
      },
    },
  },
};

const selectableValues = [
  {
    value: 'data',
    selected: false,
    dataType: 'json',
    available_values: [{ value: 'name', selected: true, dataType: 'string' }],
  },
  {
    value: 'email',
    selected: true,
    dataType: 'string',
  },
];

// const pathExistsInValues = (values: any, path: string): boolean => {
//   return (
//     path.split('.').reduce((acc, key) => {
//       if (acc && typeof acc === 'object' && key in acc) {
//         return acc[key].value ?? acc[key]; // handles nested structures like values.data.value.name
//       }
//       return undefined;
//     }, values) !== undefined
//   );
// };

// const handleExistance = (selectable: typeof selectableValues, path = '') => {
//   selectable.forEach((item) => {
//     const fullPath = path ? `${path}.${item.value}` : item.value;

//     if (item.available_values) {
//       handleExistance(item.available_values, fullPath);
//     }

//     if (!item.available_values) {
//       const exists = pathExistsInValues(values, fullPath);
//       console.log(`${fullPath} => ${exists ? 'EXISTS' : 'NOT FOUND'}`);
//     }
//   });
// };

// handleExistance(selectableValues);
