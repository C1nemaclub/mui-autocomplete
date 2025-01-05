import * as yup from 'yup';
import { FormikEntity, Project } from './data.model';

export const validationSchema = yup.object().shape({
  projectType: yup
    .object()
    .shape({
      project_type_id: yup.string(),
      project_type_name: yup.string(),
    })
    .required('This field is required'),
  section: yup
    .object()
    .shape({
      section_name: yup.string(),
      section_selector: yup.string(),
    })
    .required('This field is required'),
  field: yup
    .object()
    .shape({
      field_name: yup.string(),
      field_selector: yup.string(),
    })
    .required('This field is required'),
  conditions: yup
    .array()
    .of(yup.string())
    .min(1)
    .required('This field is required'),
  roles: yup.array().of(yup.string()).min(1).required('This field is required'),
  name: yup.string().required('This field is required'),
  // .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed'),
  description: yup.string().min(1).trim().required('This field is required'),
  formType: yup.object().required('This field is required'),
  // age: yup
  //   .number()
  //   .min(1, 'Age must be a number between 1 and 999')
  //   .max(999, 'Age must be a number between 1 and 999')
  //   .required('This field is required'),
  option: yup.object().shape({
    value: yup.string(),
    label: yup.string(),
  }),
  // Age required when option value equals option-1
  age: yup.number().when('option', {
    is: (option: { label: string; value: string }) =>
      option?.value === 'option-1',
    then: () => yup.number().required('This field is required'),
    otherwise: () => yup.number(),
  }),
});

export const data: Project[] = [
  {
    project_type_id: 'web',
    project_type_name: 'Web',
    sections: [
      {
        section_name: 'General',
        section_selector: 'general',
        fields: [
          {
            field_type: 'text',
            field_name: 'Project Name',
            field_selector: 'project_name',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project Description',
            field_selector: 'project_description',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project URL',
            field_selector: 'project_url',
            options: [],
          },
        ],
      },
      {
        section_name: 'Technologies',
        section_selector: 'technologies',
        fields: [
          {
            field_type: 'checkbox',
            field_name: 'Frontend',
            field_selector: 'frontend',
            options: ['HTML', 'CSS', 'JavaScript'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Backend',
            field_selector: 'backend',
            options: ['NodeJS', 'Express', 'Java', 'Spring', 'Python', 'Flask'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Database',
            field_selector: 'database',
            options: ['MySQL', 'PostgreSQL', 'MongoDB'],
          },
        ],
      },
    ],
  },
  {
    project_type_id: 'mobile',
    project_type_name: 'Mobile',
    sections: [
      {
        section_name: 'General',
        section_selector: 'general',
        fields: [
          {
            field_type: 'text',
            field_name: 'Project Name',
            field_selector: 'project_name',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project Description',
            field_selector: 'project_description',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project URL',
            field_selector: 'project_url',
            options: [],
          },
        ],
      },
      {
        section_name: 'Technologies',
        section_selector: 'technologies',
        fields: [
          {
            field_type: 'checkbox',
            field_name: 'Mobile Platforms',
            field_selector: 'mobile_platforms',
            options: ['iOS', 'Android'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Development Frameworks',
            field_selector: 'development_frameworks',
            options: ['React Native', 'Flutter', 'Ionic'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Backend',
            field_selector: 'backend',
            options: ['Firebase', 'AWS Amplify', 'GraphQL'],
          },
        ],
      },
    ],
  },
  {
    project_type_id: 'desktop',
    project_type_name: 'Desktop',
    sections: [
      {
        section_name: 'General',
        section_selector: 'general',
        fields: [
          {
            field_type: 'text',
            field_name: 'Project Name',
            field_selector: 'project_name',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project Description',
            field_selector: 'project_description',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project URL',
            field_selector: 'project_url',
            options: [],
          },
        ],
      },
      {
        section_name: 'Technologies',
        section_selector: 'technologies',
        fields: [
          {
            field_type: 'checkbox',
            field_name: 'Operating Systems',
            field_selector: 'operating_systems',
            options: ['Windows', 'macOS', 'Linux'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Development Frameworks',
            field_selector: 'development_frameworks',
            options: ['Electron', 'Qt', '.NET'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Programming Languages',
            field_selector: 'programming_languages',
            options: ['C#', 'C++', 'Python'],
          },
        ],
      },
    ],
  },
  {
    project_type_id: 'data_science',
    project_type_name: 'Data Science',
    sections: [
      {
        section_name: 'General',
        section_selector: 'general',
        fields: [
          {
            field_type: 'text',
            field_name: 'Project Name',
            field_selector: 'project_name',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project Description',
            field_selector: 'project_description',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project URL',
            field_selector: 'project_url',
            options: [],
          },
        ],
      },
      {
        section_name: 'Technologies',
        section_selector: 'technologies',
        fields: [
          {
            field_type: 'checkbox',
            field_name: 'Programming Languages',
            field_selector: 'programming_languages',
            options: ['Python', 'R', 'Julia'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Libraries/Frameworks',
            field_selector: 'libraries_frameworks',
            options: ['TensorFlow', 'PyTorch', 'scikit-learn'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Tools',
            field_selector: 'tools',
            options: ['Jupyter Notebook', 'RStudio', 'Apache Spark'],
          },
        ],
      },
    ],
  },
];

export type KeyType = keyof yup.InferType<typeof validationSchema>;

export type DisabledMapper = {
  [key in KeyType]: boolean;
};

export const disabledMapper = {
  projectType: false,
  section: false,
  field: false,
  conditions: false,
  name: false,
  description: false,
};

export const ifValidAfterTrimThen = (value: string, callback: () => void) => {
  if (value.trim() !== '') {
    callback();
  }
  return;
};

export const mockValues = [
  'Zenata – Messali El Hadj Airport',
  'Norðfjörður Airport',
  'Kansai International Airport',
  'Eurico de Aguiar Salles Airport',
  'Saravane Airport',
  'Ostrava Leos Janáček Airport',
];

// Mock Forms
export const mockForms: FormikEntity[] = [
  {
    projectType: {
      project_type_id: 'web',
      project_type_name: 'Web',
    },
    section: {
      section_name: 'Technologies',
      section_selector: 'technologies',
    },
    field: {
      field_name: 'Frontend',
      field_selector: 'frontend',
    },
    conditions: ['Eurico de Aguiar Salles Airport', 'Saravane Airport'],
    name: 'Sam',
    description: 'This is a description',
    roles: ['SuperAdmin'],
    formType: {
      id: '2d4f5-4d5f4',
      name: 'Report',
    },
    age: 77,
  },
];

export const initialEntity = {
  projectType: {
    project_type_id: 'mobile',
    project_type_name: 'Mobile',
    sections: [
      {
        section_name: 'General',
        section_selector: 'general',
        fields: [
          {
            field_type: 'text',
            field_name: 'Project Name',
            field_selector: 'project_name',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project Description',
            field_selector: 'project_description',
            options: [],
          },
          {
            field_type: 'text',
            field_name: 'Project URL',
            field_selector: 'project_url',
            options: [],
          },
        ],
      },
      {
        section_name: 'Technologies',
        section_selector: 'technologies',
        fields: [
          {
            field_type: 'checkbox',
            field_name: 'Mobile Platforms',
            field_selector: 'mobile_platforms',
            options: ['iOS', 'Android'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Development Frameworks',
            field_selector: 'development_frameworks',
            options: ['React Native', 'Flutter', 'Ionic'],
          },
          {
            field_type: 'checkbox',
            field_name: 'Backend',
            field_selector: 'backend',
            options: ['Firebase', 'AWS Amplify', 'GraphQL'],
          },
        ],
      },
    ],
  },
  section: {
    section_name: 'General',
    section_selector: 'general',
    fields: [
      {
        field_type: 'text',
        field_name: 'Project Name',
        field_selector: 'project_name',
        options: [],
      },
      {
        field_type: 'text',
        field_name: 'Project Description',
        field_selector: 'project_description',
        options: [],
      },
      {
        field_type: 'text',
        field_name: 'Project URL',
        field_selector: 'project_url',
        options: [],
      },
    ],
  },
  field: {
    field_type: 'text',
    field_name: 'Project Description',
    field_selector: 'project_description',
    options: [],
  },
  conditions: ['Saravane Airport'],
  name: '<p>I believe this is a mention <span class="mention" data-id="123" data-value="Sam" data-denotation-char="" data-test="ttttt">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span>Sam</span>﻿</span></p>',
  description:
    '<p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p><p><span data-type="mention" data-id="Jennifer Grey">',
  roles: ['SuperAdmin', 'Admin'],
  formType: {
    code: 'sdcw45-4da1t7',
    name: 'Table',
  },
  age: 469,
} as unknown as FormikEntity;
