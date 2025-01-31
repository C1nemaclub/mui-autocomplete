import { FormikProps, useFormik } from 'formik';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  initialEntity,
  mockValues,
  validationSchema,
} from '../utils/constants';
import { FormikEntity, QueueParams } from '../utils/data.model';

type FormContextType = {
  form: FormikProps<FormikEntity>;
  isEdit: boolean;
};

export const FormContext = createContext({} as FormContextType);

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState<FormikEntity | null>(null);
  const { queueId } = useParams<QueueParams>();

  const form = useFormik<FormikEntity>({
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: initialValues || {
      projectType: null,
      section: null,
      field: null,
      conditions: mockValues,
      name: '',
      description: 'Hello this is sam {{Sam.Sam}}',
      roles: ['User'],
      // formType: { id: 'd4fd-fd4sfd2', name: 'Form' },
      formType: null,
      age: '',
      option: null,
      users: [{ value: '', label: '1' }],
    },
    onSubmit: (payload, { resetForm }) => {
      const reqPayload = {
        ...payload,
        projectType: payload.projectType?.project_type_id,
        section: payload.section?.section_selector,
        field: payload.field?.field_selector,
      };
      if (isEdit) {
        console.log('Updating...  ');
        alert('Form submitted successfully for updation');
      } else {
        console.log('Creating...  ');
        alert('Form submitted successfully for creation');
      }
      console.log(reqPayload);
      resetForm();
    },
  });

  useEffect(() => {
    if (queueId) {
      setIsEdit(true);
      setInitialValues(initialEntity);
    }
  }, [queueId]);

  return (
    <FormContext.Provider value={{ form, isEdit }}>
      {children}
    </FormContext.Provider>
  );
};
