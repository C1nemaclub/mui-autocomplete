export type Project = {
  project_type_id: string;
  project_type_name: string;
  sections: Section[];
};

export type Section = {
  section_name: string;
  section_selector: string;
  fields: Field[];
};

export type Field = {
  field_type: string;
  field_name: string;
  field_selector: string;
  options: string[];
};

export type FormType = {
  id: string;
  name: string;
};
export type FormikEntity = {
  projectType: {
    project_type_id: string;
    project_type_name: string;
    // sections?: Section[];
  } | null;
  section: { section_name: string; section_selector: string } | null;
  field: { field_name: string; field_selector: string } | null;
  conditions: string[];
  name: string;
  description: string;
  roles: string[];
  formType: FormType | null;
  age: number | '';
  option: { value: string; label: string } | null;
  users: { value: string; label: string }[];
};

export type QueueParams = Record<'queueId', string>;
