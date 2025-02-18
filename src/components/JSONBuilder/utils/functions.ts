export type JsonValue = string | boolean | JsonObject;
export type JsonObject = {
  [key: string]: { value: JsonValue; dataType: DataType };
};
export type DataType = 'string' | 'boolean' | 'object';

const initialJson = {
  created: '',
  active: true,
  quantity: 0,
  user: {
    personalInfo: {
      name: '',
      age: 0,
    },
    address: {
      city: '',
      other: {
        partner: {
          name: 'hello',
        },
        type: 'idk',
      },
    },
  },
};

export const regularJsonToJsonObject = (json: Record<string, any>) => {
  const jsonObject: JsonObject = {};

  for (const key in json) {
    const value = json[key];
    const dataType: DataType =
      typeof value === 'object' ? 'object' : typeof value;

    jsonObject[key] = {
      value,
      dataType,
    };
  }

  return jsonObject;
};
