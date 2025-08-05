import * as z from 'zod';

export interface CommonProps {
  label: string;
  required: boolean;
}
export interface StringFieldProps {
  type: 'text';
}

export interface StringListFieldProps {
  type: 'string.list';
}

export interface SelectFieldProps {
  type: 'select';
}

export type JsonValueProps = { [propertyName: string]: FieldProps };
export interface JsonFieldProps {
  type: 'json';
  schema?: ActionTemplate;
}

export type FieldProps = (
  | StringFieldProps
  | StringListFieldProps
  | SelectFieldProps
  | JsonFieldProps
) &
  CommonProps;

// Template to generate the actual Forms with real values
export type ActionTemplate = { [propertyName: string]: FieldProps };

export interface StringField {
  value: string;
  type: StringFieldProps['type'];
}

export interface StringListField {
  value: string[];
  type: StringListFieldProps['type'];
}

export interface SelectField {
  value: { value: string; label: string } | null;
  type: SelectFieldProps['type'];
}

export type JsonValue = { [propertyName: string]: DynamicField };
export interface JsonField {
  type: JsonFieldProps['type'];
  value: JsonValue;
}

export interface CommonFieldProps {
  label: string;
  required: boolean;
}

export type DynamicField = (
  | StringField
  | SelectField
  | JsonField
  | StringListField
) &
  CommonFieldProps;

export type DynamicForm = { [fieldName: string]: DynamicField };

const getTypeInitialPropsToForm = (props: FieldProps): DynamicField | null => {
  const { type, label, required } = props;
  switch (type) {
    case 'text':
      return {
        value: '',
        type: 'text',
        label,
        required,
      };
    case 'string.list': {
      return {
        value: [],
        type: 'string.list',
        label,
        required,
      };
    }
    case 'select':
      return {
        value: null,
        type: 'select',
        label,
        required,
      };
    case 'json': {
      // Recursively call templateToForm
      const schema = props.schema ? templateToForm(props.schema) : {};
      return {
        value: schema,
        type: 'json',
        label,
        required,
      };
    }
    default:
      return null;
  }
};

export const templateToForm = (template: ActionTemplate): DynamicForm => {
  return Object.entries(template).reduce((acc, template) => {
    const [propertyName, props] = template;
    const fieldProps = getTypeInitialPropsToForm(props);
    if (!fieldProps) return acc;
    acc[propertyName] = fieldProps;
    return acc;
  }, {} as DynamicForm);
};

export const template: ActionTemplate = {
  name: {
    type: 'text',
    label: 'Name',
    required: true,
  },
  community: {
    type: 'json',
    label: 'Community',
    required: true,
    schema: {
      members: {
        type: 'string.list',
        label: 'Members',
        required: true,
      },
    },
  },
  phone: {
    type: 'text',
    label: 'Phone number',
    required: true,
  },
  team: {
    type: 'select',
    label: 'Engineering team',
    required: true,
  },
  meta: {
    type: 'json',
    label: 'Information',
    required: true,
    schema: {
      address: {
        type: 'text',
        label: 'Address',
        required: true,
      },
      city: {
        type: 'select',
        label: 'City',
        required: true,
      },
      additionalInformation: {
        type: 'json',
        label: 'Additional information',
        required: true,
        schema: {
          observations: {
            type: 'text',
            label: 'Observations',
            required: true,
          },
        },
      },
    },
  },
};

export const templateToZchema = <T extends ActionTemplate>(template: T) => {
  const getFieldTypeZchema = (props: FieldProps): z.ZodType<any> => {
    switch (props.type) {
      case 'text':
        return z.looseObject({
          type: z.literal('text'),
          value: z.string().trim().min(1, '1️⃣ Min'),
        });
      case 'string.list':
        return z.looseObject({
          type: z.literal('string.list'),
          value: z.array(z.string().trim().min(1, '1️⃣ Min')),
        });
      case 'select':
        return z.looseObject({
          type: z.literal('select'),
          value: z.strictObject({
            value: z.string().trim().min(1, '1️⃣ Min'),
            label: z.string(),
          }),
        });
      case 'json': {
        const nestedFields = props.schema ?? {};
        return z.looseObject({
          type: z.literal('json'),
          value: templateToZchema(nestedFields),
        });
      }
      default:
        return z.any();
    }
  };
  const shape: Record<string, z.ZodType<any>> = {};
  for (const key in template) {
    shape[key] = getFieldTypeZchema(template[key]);
  }
  return z.object(shape);
};

type FnReturn = ReturnType<typeof templateToZchema>;

export type InferredAction = z.infer<FnReturn>;

const submitex = {
  name: {
    type: 'text',
    value: 'Sam',
    label: 'Name',
    required: true,
  },
  community: {
    type: 'json',
    value: {
      members: {
        type: 'string.list',
        value: ['Velasquez'],
        label: 'Members',
        required: true,
      },
    },
    label: 'Community',
    required: true,
  },
  phone: {
    type: 'text',
    value: '03122536731',
    label: 'Phone number',
    required: true,
  },
  team: {
    type: 'select',
    value: {
      value: 'hey',
      label: 'Hey',
    },
    label: 'Engineering team',
    required: true,
  },
  meta: {
    type: 'json',
    value: {
      address: {
        type: 'text',
        value: 'Street',
        label: 'Address',
        required: true,
      },
      city: {
        type: 'select',
        value: {
          value: 'DADA',
          label: 'Hey',
        },
        label: 'City',
        required: true,
      },
      additionalInformation: {
        type: 'json',
        value: {
          observations: {
            type: 'text',
            value: 'What should I put here',
            label: 'Observations',
            required: true,
          },
        },
        label: 'Additional information',
        required: true,
      },
    },
    label: 'Information',
    required: true,
  },
};

const schema = templateToZchema(template);

try {
  schema.parse(submitex);
  console.log('success');
} catch (e) {
  console.log(e.message, '❌❌❌');
}
