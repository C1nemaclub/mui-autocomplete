import dot from 'dot-object';

const data = {
  project_id: 'someid',
  data: {
    project: {
      project_id: 'anotherid',
    },
    user: {
      name: 'myname',
    },
  },
};

const findKeyValue = (obj: any, keyToFind: string) => {
  let keyValue: string | null = '';
  const dotted = dot.dot(obj);

  for (const [keyPath, value] of Object.entries(dotted)) {
    console.log('fiding', keyPath);
    if (keyPath.endsWith(keyToFind)) {
      keyValue = value as string;
      break;
    }
  }

  // Object.entries(dotted).forEach(([keyPath, value], index) => {
  //   console.log('fiding', keyPath);
  //   if (keyPath.endsWith(keyToFind) && !keyValue) {
  //     keyValue = value as string;
  //   }
  // });

  return keyValue;
};

console.log(findKeyValue(data, 'project_id'));
