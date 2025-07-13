import {
  get,
  type FieldError,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import * as z from 'zod';

export const UserSchema = z
  .object({
    name: z.string('Mandatory').trim().min(1, 'Mandatory'),
    age: z
      .number()
      .nullable()
      .transform((value, ctx): number => {
        if (value == null)
          ctx.addIssue({
            code: 'custom',
            message: 'X Cann0ot be null',
          });
        return value ?? NaN;
      }),
    // .refine(
    //   (val) => {
    //     if (val === null) return false;
    //     // return typeof val === 'number';
    //     return val ?? NaN;
    //   },
    //   { error: 'Hmm no' }
    // ),
    city: z
      .object({
        value: z.string(),
      })
      .nullable()
      .refine(
        (val) => {
          if (val === null) return false;
          return !!val;
        },
        { error: 'Hmm no' }
      ),
    country: z
      .string()
      .nullable()
      .transform((value, ctx) => {
        if (value === null)
          ctx.addIssue({
            code: 'custom',
            message: 'Required ⚠️',
          });
        return value;
      }),
    allowContact: z.boolean(),
    email: z.string().optional(),
    meta: z.object({
      address: z.string().trim().min(1),
    }),
  })
  .check((ctx) => {
    if (ctx.value.allowContact === true && !ctx.value.email) {
      ctx.issues.push({
        path: ['email'],
        code: 'custom',
        message: 'Email is mandatory 👽',
        input: ctx.value,
      });
    }
  });
// .refine((data) => data.allowContact && data.email === undefined, {
//   message: 'Mandatoryx',
//   path: ['email'],
// });
// .superRefine((data, ctx) => {
//   if (data.allowContact && data.email === undefined) {
//     ctx.addIssue({
//       // path: ['email'],
//       code: 'custom',
//       message: 'Email is mandatory when contact is allowed',
//     });
//   }
// });

// .check((ctx) => {
//   console.log(ctx.value, 'no Email');
//   if (ctx.value.allowContact === true && !ctx.value.email) {
//     ctx.issues.push({
//       path: ['email'],
//       code: 'custom',
//       message: 'Email is mandatory 👽',
//       input: ctx.value,
//     });
//   }
// });

export interface UserFormEntity {
  name: string;
  age: number | null;
  city: {
    value: string;
  } | null;
  country: string | null;
  allowContact: boolean;
  email?: string;
  meta: {
    address: string;
  };
}
export type Form = z.input<typeof UserSchema>;
export type Out = z.output<typeof UserSchema>;
export const initialValues: UserFormEntity = {
  name: '',
  age: null,
  city: null,
  country: null,
  allowContact: true,
  email: '',
  meta: {
    address: '',
  },
};

// const baseSchema = z.object({
//   name: z.string('Mandatory').trim().min(1, 'Mandatory'),
//   age: z
//     .number()
//     .nullable()
//     .transform((value, ctx): number => {
//       if (value == null)
//         ctx.addIssue({
//           code: 'custom',
//           message: 'X Cann0ot be null',
//         });
//       return value ?? NaN;
//     }),
//   city: z
//     .object({
//       value: z.string(),
//     })
//     .nullable()
//     .refine(
//       (val) => {
//         if (val === null) return false;
//         return !!val;
//       },
//       { error: 'Hmm no' }
//     ),
//   country: z
//     .string()
//     .nullable()
//     .transform((value, ctx) => {
//       if (value === null)
//         ctx.addIssue({
//           code: 'custom',
//           message: 'Required ⚠️',
//         });
//       return value;
//     }),
// });

// export const UserSchema = z.discriminatedUnion('allowContact', [
//   baseSchema.extend({
//     allowContact: z.literal(false),
//     email: z.string().optional(),
//   }),
//   baseSchema.extend({ allowContact: z.literal(true), email: z.email() }),
// ]);

// export interface UserFormEntity {
//   name: string;
//   age: number | null;
//   city: {
//     value: string;
//   } | null;
//   country: string | null;
//   allowContact: boolean;
//   email?: string;
// }
// export type Form = z.input<typeof UserSchema>;
// export type Out = z.output<typeof UserSchema>;
// export const initialValues: Form = {
//   name: '',
//   age: null,
//   city: null,
//   country: null,
//   allowContact: false,
//   // email: '',
// };

export const getFieldError = <TFieldValues extends FieldValues>(
  fieldErrors: FieldErrors<TFieldValues>,
  name: FieldPath<TFieldValues>
) => {
  const error = get(fieldErrors, name) as FieldError | undefined;
  return {
    error: !!error,
    helperText: error?.message ?? '',
  };
};
