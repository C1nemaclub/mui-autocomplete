import { getIn } from 'formik';

function setValueByPath<T extends object>(obj: T, path: string, value: any): T {
  const keys = path.split('.');

  const set = (o: any, i: number): any => {
    const key = keys[i];
    const isIndex = /^\d+$/.test(key);
    const currentVal = isIndex ? o?.[Number(key)] : o?.[key];

    if (i === keys.length - 1) {
      if (Array.isArray(o)) {
        const copy = [...o];
        copy[Number(key)] = value;
        return copy;
      }
      return { ...o, [key]: value };
    }

    const next = set(currentVal ?? (isIndex ? [] : {}), i + 1);

    if (Array.isArray(o)) {
      const copy = [...o];
      copy[Number(key)] = next;
      return copy;
    } else {
      return { ...o, [key]: next };
    }
  };

  return set(obj, 0);
}

const obj = {};

const anySchm1 = {
  type: 'hola 1',
};

const anySchm2 = {
  type: 'hola 2',
};
const anySchm3 = {
  type: 'hola 3',
};

const schemaPathOne = `items.xd.jsonSchema`;
const schemaPathTwo = `items.data.items.jsonSchema.0`;
const schemaPathThree = `items.data.items.jsonSchema.1`;

const mod = setValueByPath(obj, schemaPathTwo, anySchm1);
const mod2 = setValueByPath(mod, schemaPathThree, anySchm2);
const mod3 = setValueByPath(mod2, schemaPathOne, anySchm3);

console.log(mod3);

console.log(getIn(mod3, schemaPathOne));
