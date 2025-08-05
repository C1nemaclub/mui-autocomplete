// interface TypeText {
//   type: 'text';
// }

// interface TypeTextList {
//   type: 'text.list';
// }

// interface TypeNumber {
//   type: 'number';
// }

// interface TypeSelect {
//   type: 'select';
// }

// interface TypeJson {
//   type: 'json';
//   schema: FieldTypeTemplate;
// }
// type FieldType = TypeText | TypeNumber | TypeSelect | TypeTextList | TypeJson;

// type FieldTypeTemplate = Record<string, FieldType>;

// export const tempToSchema = <T extends FieldTypeTemplate>(template: T) => {
//   const getSchema = (fieldType: FieldType) => {
//     switch (fieldType.type) {
//       case 'text':
//         return z.object({
//           type: z.literal('text'),
//           value: z.string(),
//         });
//       case 'text.list':
//         return z.object({
//           type: z.literal('text.list'),
//           value: z.array(
//             z.object({
//               value: z.string(),
//             })
//           ),
//         });
//       case 'number':
//         return z.object({
//           type: z.literal('number'),
//           value: z.number(),
//         });
//       case 'select':
//         return z.object({
//           type: z.literal('select'),
//           value: z.object({
//             value: z.string(),
//           }),
//         });
//       case 'json': {
//         const schema = tempToSchema(fieldType.schema);
//         return z.object({
//           type: z.literal('json'),
//           value: schema,
//         });
//       }
//     }
//   };

//   const shape = {} as {
//     [K in keyof T]: ReturnType<typeof getSchema>;
//   };

//   for (const key in template) {
//     shape[key] = getSchema(template[key]);
//   }

//   return z.object(shape);
// };

// export const tempP: FieldTypeTemplate = {
//   name: { type: 'text' },
//   age: { type: 'number' },
// };

// type DynamicReturnType = ReturnType<typeof tempToSchema>;
// export type InferredType = z.infer<DynamicReturnType>;
