type DataEntry = {
  value: string;
  data_type: string;
  label: string;
  available_values?: {
    value: string;
    data_type: string;
    label: string;
  }[];
};

export type DesiredFormat = {
  [key: string]: {
    data_type: string;
    label: string;
    jsonSchema?: {
      [key: string]: {
        data_type: string;
        label: string;
      };
    };
    options?: {
      value: string;
      label: string;
    }[];
  };
};

export const desired = {
  primaryattorney: {
    data_type: 'json',
    label: 'Primary Attorney',
    jsonSchema: {
      id: {
        data_type: 'number',
        label: 'Person ID',
      },
    },
  },
  caseTheory: {
    data_type: 'number',
    label: 'Person Id',
  },
  contracts: {
    data_type: 'list.json',
    label: 'Contracts',
    jsonSchema: {
      id: {
        data_type: 'number',
        label: 'Document Id',
      },
    },
  },
  caseOutcome: {
    data_type: 'string',
    label: 'Case Outcome',
    options: [
      { value: 'approved', label: 'Approved' },
      { value: 'Withdrawn', label: 'Withdrawn' },
      { value: 'Denied', label: 'Denied' },
    ],
  },
  explainPreviousApplication: {
    label: 'Explain Previous Application',
    data_type: 'string',
  },
  adrianII: {
    data_type: 'list.string',
    label: 'Adrian 2',
    options: [], //etc
  },
};

export const data = [
  {
    value: 'primaryattorney',
    data_type: 'json',
    label: 'Primary Attorney',
    available_values: [
      {
        value: 'id',
        data_type: 'number',
        label: 'Person id',
      },
    ],
  },
  {
    value: 'deadline',
    data_type: 'json',
    label: 'DeadLine',
    available_values: [
      {
        value: 'start',
        data_type: 'date',
        label: 'Start Date',
      },
      {
        value: 'end',
        data_type: 'date',
        label: 'End Date',
      },
    ],
  },
  {
    value: 'caseTheory',
    data_type: 'string',
    label: 'Case Theory.',
  },
  {
    value: 'contracts',
    data_type: 'list.json',
    label: 'Contracts',
    available_values: [
      {
        value: 'id',
        data_type: 'number',
        label: 'Document id',
      },
    ],
  },
  {
    value: 'isMinor',
    data_type: 'boolean',
    label: 'Is Minor',
  },
  {
    value: 'caseOutcome',
    data_type: 'string',
    label: 'Case Outcome',
    available_values: [
      {
        value: 'Approved',
        data_type: 'string',
        label: 'Approved',
      },
      {
        value: 'Withdrawn',
        data_type: 'string',
        label: 'Withdrawn',
      },
      {
        value: 'Denied',
        data_type: 'string',
        label: 'Denied',
      },
    ],
  },
  {
    value: 'seniorLegalAssistant',
    data_type: 'json',
    label: 'Senior Legal Assistant',
    available_values: [
      {
        value: 'id',
        data_type: 'number',
        label: 'Person id',
      },
    ],
  },
  {
    value: 'adrianII',
    data_type: 'list.string',
    label: 'Adrian II',
    available_values: [
      {
        value: 'Leal',
        data_type: 'string',
        label: 'Leal',
      },
      {
        value: 'Unreal',
        data_type: 'string',
        label: 'Unreal',
      },
      {
        value: 'NoFake',
        data_type: 'string',
        label: 'NoFake',
      },
      {
        value: 'UnReal but Real',
        data_type: 'string',
        label: 'UnReal but Real',
      },
      {
        value: 'Real???',
        data_type: 'string',
        label: 'Real???',
      },
      {
        value: 'Veredicto',
        data_type: 'string',
        label: 'Veredicto',
      },
    ],
  },
];

export type DataType = typeof data;

export function transformData(data: { result: DataEntry[] }): DesiredFormat {
  const transformed: DesiredFormat = {};

  data.result.forEach((item) => {
    const { value, data_type, label, available_values } = item;

    const entry: any = {
      data_type,
      label,
    };

    if (data_type === 'json' || data_type === 'list.json') {
      if (available_values) {
        entry.jsonSchema = available_values.reduce((acc, val) => {
          acc[val.value] = {
            data_type: val.data_type,
            label: val.label,
          };
          return acc;
        }, {} as Record<string, { data_type: string; label: string }>);
      }
    }

    if (available_values && data_type === 'string') {
      entry.options = available_values.map((opt) => ({
        value: opt.value,
        label: opt.label,
      }));
    }

    transformed[value] = entry;
  });

  return transformed;
}

export const mockValues = {
  caseTheory: {
    data_type: 'string',
    value: 'Hello World',
  },
  contracts: {
    data_type: 'json',
    value: {
      id: {
        data_type: 'number',
        value: 'Document Id',
      },
    },
  },
  primaryattorney: {
    data_type: 'json',
    value: {
      id: { value: 'sum', data_type: 'string' },
    },
  },
  isMinor: {
    value: false,
    data_type: 'boolean',
  },
  caseOutcome: {
    value: 'Yes',
    data_type: 'string',
  },
  adrianII: {
    value: [],
    data_type: 'string.list',
  },
  seniorLegalAssistant: {
    data_type: 'json',
    value: {
      id: {
        value: 'something',
        data_type: 'number',
      },
    },
  },
  deadline: {
    data_type: 'json',
    value: {
      start: {
        value: 'something',
        data_type: 'date',
      },
      end: {
        value: 'something',
        data_type: 'date',
      },
    },
  },
};

export const mockValuesToSelectedKeys = (
  values: typeof mockValues
): Record<string, boolean> => {
  const selection: Record<string, boolean> = {};
  const getPath = (obj: any, currentPath = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const basePath = currentPath ? `${currentPath}.${key}` : key;
      const fullPath = `${basePath}.value`;
      selection[fullPath] = true;
      if (value.data_type === 'json' && typeof value.value === 'object') {
        // Recurse into children with `.value` added
        getPath(value.value, `${basePath}.value`);
      }
    }
  };

  getPath(values);
  return selection;
};

type JsonObject = Record<string, any>;

export const transformation = (
  selected: Record<string, boolean>,
  mockValues: JsonObject
) => {
  const shouldKeepPath = (path: string) => {
    // Keep this path if it's explicitly true or any child path is true
    return (
      selected[path] === true ||
      Object.keys(selected).some(
        (key) => key.startsWith(`${path}.`) && selected[key]
      )
    );
  };

  const filterRecursive = (
    obj: JsonObject,
    currentPath = ''
  ): JsonObject | undefined => {
    const result: JsonObject = {};

    for (const [key, value] of Object.entries(obj)) {
      const path = currentPath ? `${currentPath}.${key}` : key;

      if (value?.data_type === 'json') {
        const nested = filterRecursive(value.value, `${path}.value`);
        if (nested && Object.keys(nested).length > 0) {
          result[key] = { ...value, value: nested };
        } else if (selected[`${path}.value`] === true) {
          // Parent is explicitly selected even if children aren't
          result[key] = value;
        }
      } else {
        if (selected[path] === true) {
          result[key] = value;
        }
      }
    }

    return Object.keys(result).length > 0 ? result : undefined;
  };

  const newSchema = filterRecursive(mockValues);
  return newSchema ?? {};
};
