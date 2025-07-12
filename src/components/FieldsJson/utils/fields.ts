import * as yup from 'yup';

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
    required: false,
    schema: {
      members: {
        type: 'string.list',
        label: 'Members',
        required: false,
      },
    },
  },
  phone: {
    type: 'text',
    label: 'Phone number',
    required: false,
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
        required: false,
        schema: {
          observations: {
            type: 'text',
            label: 'Observations',
            required: false,
          },
        },
      },
    },
  },
};

const getFieldTypeSchema = (props: FieldProps): yup.AnySchema => {
  const { type, required } = props;
  switch (type) {
    case 'text': {
      if (required) {
        return yup.object({
          value: yup.string().required(),
        });
      }
      return yup.object({
        value: yup.string(),
      });
    }
    case 'select': {
      if (required) {
        return yup.object().shape({
          value: yup
            .object()
            .shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
            .required(),
        });
      }
      return yup.object().shape({
        value: yup.object().shape({
          value: yup.string(),
          label: yup.string(),
        }),
      });
    }
    case 'json': {
      // Recursively obtain the schema for nested json fields
      const nestedFields = props.schema ?? {};
      const nestedSchemaShape = Object.entries(nestedFields).reduce(
        (acc, [key, fieldProps]) => {
          acc[key] = getFieldTypeSchema(fieldProps); // recursively apply schema
          return acc;
        },
        {} as Record<string, yup.AnySchema>
      );
      const base = yup.object({
        value: yup.object().shape(nestedSchemaShape),
        type: yup.string(),
      });
      return required ? base.required() : base;
    }
    default:
      return yup.mixed();
  }
};

export const templateToSchema = (
  template: ActionTemplate
): yup.ObjectSchema<ActionTemplate> => {
  const fieldSchema = Object.entries(template).reduce((acc, item) => {
    const [fieldName, fieldProps] = item;
    acc[fieldName] = getFieldTypeSchema(fieldProps);
    return acc;
  }, {} as Record<string, yup.AnySchema>);
  return yup.object().shape(fieldSchema);
};
