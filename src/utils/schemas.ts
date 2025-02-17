import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test({
      name: 'is-valid',
      message: 'Name is not valid',
      skipAbsent: true,
      test: (value, ctx) => {
        console.log('value', value);
        if (value === 'x') {
          return ctx.createError({ message: "Name can't be x" });
        }
        return true;
      },
    }),
});

// userSchema.validate({ name: 'x' });

interface Address {
  street: string;
  suite: string;
}
interface Pet {
  name: string;
  age: number;
}

interface Person {
  name: string;
  age: number | null;
  address: Address | null;
  pets: Pet[];
}

const petSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().typeError('Age must be a number'),
});

const personSchema: yup.ObjectSchema<Person> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().typeError('Age must be a number'),
  address: yup.object().shape({
    street: yup.string().required(),
    suite: yup.string().required(),
  }),
  pets: yup.array().of(petSchema).required(),
});

personSchema.validate({
  name: 'x',
  age: 1,
  address: { street: 'x', suite: 'x' },
  pets: [{ name: 'x', age: 1 }],
});

// export const userMocked = {
//   id: 1,
//   name: 'Leanne Graham',
//   username: 'Bret',
//   email: 'Sincere@april.biz',
//   project_id: '1',
//   address: {
//     street: 'Kulas Light',
//     suite: 'Apt. 556',
//     city: 'Gwenborough',
//     zipcode: '92998-3874',
//     geo: {
//       lat: '-37.3159',
//       lng: '81.1496',
//       project_id: '1',
//     },
//   },
//   phone: '1-770-736-8031 x56442',
//   website: 'hildegard.org',
//   company: {
//     name: 'Romaguera-Crona',
//     catchPhrase: 'Multi-layered client-server neural-net',
//     bs: 'harness real-time e-markets',
//   },
// };
