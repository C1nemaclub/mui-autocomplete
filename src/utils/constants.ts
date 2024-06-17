import { Project } from './data.model';
import * as yup from 'yup';

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
    .of(
      // yup.string().test('valid', 'Test is an invalid word', (value) => {
      //   if (value === 'Test') return false;
      //   return true;
      // })
      // yup.string().min(1).trim()
      yup.string().test('test', 'req', (value) => {
        if (value && value.trim() !== '') {
          return true;
        }
        return false;
      })
    )
    .min(1)
    .required('This field is required'),
  name: yup
    .string()
    .required('This field is required')
    .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed'),
  description: yup.string().min(1).trim().required('This field is required'),
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
