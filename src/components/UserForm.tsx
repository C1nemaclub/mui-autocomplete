import { Button, Grid, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import React, { FC, useRef, useState } from 'react';
import type ReactQuill from 'react-quill';
import { FormikEntity, Project } from '../utils/data.model';
import TipTapEditor from './TipTapEditor';

type UserForm = {
  form: FormikProps<FormikEntity>;
  initialValues?: FormikEntity;
  data: Project[];
  isEdit?: boolean;
};

const UserForm: FC<UserForm> = ({ form, data, isEdit }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [insertMention, setInsertMentionHandler] =
    useState<(value: string) => void | null>();

  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionOptions = data.find(
    (item) => item.project_type_id === form.values.projectType?.project_type_id
  )?.sections;

  const fieldOptions = sectionOptions?.find(
    (item) => item.section_selector === form.values.section?.section_selector
  )?.fields;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter

      const trimmedValue = inputValue.trim(); // Trim spaces

      // Check if the trimmed value is non-empty and not already in the list
      if (trimmedValue && !form.values.conditions.includes(trimmedValue)) {
        form.setFieldValue('conditions', [
          ...form.values.conditions,
          trimmedValue,
        ]); // Add the value to the list
        setInputValue(''); // Clear the input field
        setErrorMessage(''); // Clear any existing error message
      } else {
        // Show error message if the value exists or is invalid
        setErrorMessage('Value already exists or is invalid.');
      }
    }
  };

  const trimmedConditions = form.values.conditions.map((value) => value.trim());

  const detectedChanges =
    JSON.stringify(form.values) !== JSON.stringify(form.initialValues);

  const addMention = (value: string = '123', id: string = '123') => {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();
    const mod = quill.getModule('mention');

    mod.insertItem(
      { id: id, value: value, denotationChar: '@', test: 'ttttt' },
      true,
      {
        blotName: 'mention',
      }
    );
    return;
  };

  const insertMentionToTipTap = () => {
    console.log('hello');
    if (insertMention) {
      console.log("insertMention('Sam')");

      insertMention('Sam');
    }
  };

  return (
    <>
      {/* <Grid item xs={6}>
        <TextField
          name='name'
          label='Name'
          onChange={form.handleChange}
          value={form.values.name}
          fullWidth
        />
      </Grid> */}
      <Grid item xs={6}>
        <TextField
          name='description'
          label='Description'
          onChange={form.handleChange}
          value={form.values.description}
          fullWidth
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Autocomplete
          fullWidth
          options={data}
          value={form.values.projectType}
          renderInput={(params) => (
            <TextField name='projectType' label='Project Type' {...params} />
          )}
          getOptionLabel={(option) => option.project_type_name}
          onChange={(_, value) => {
            form.setFieldValue('projectType', value);
            form.setFieldValue('section', null);
            form.setFieldValue('field', null);
          }}
          isOptionEqualToValue={(option, value) =>
            option.project_type_id === value.project_type_id
          }
        />
      </Grid> */}
      {/* 
      <Grid item xs={6}>
        <Autocomplete
          fullWidth
          options={sectionOptions || []}
          disabled={!sectionOptions}
          value={form.values.section}
          renderInput={(params) => (
            <TextField name='section' label='Section' {...params} />
          )}
          getOptionLabel={(option) => option.section_name}
          onChange={(_, value) => {
            form.setFieldValue('section', value);
            form.setFieldValue('field', null);
          }}
          isOptionEqualToValue={(option, value) =>
            option.section_selector === value.section_selector
          }
        />
      </Grid> */}
      {/* <Grid item xs={6}>
        <Autocomplete
          fullWidth
          options={fieldOptions || []}
          disabled={!fieldOptions}
          value={form.values.field}
          renderInput={(params) => (
            <TextField {...params} name='field' label='Field' />
          )}
          getOptionLabel={(option) => option.field_name}
          onChange={(_, value) => {
            form.setFieldValue('field', value);
          }}
          isOptionEqualToValue={(option, value) =>
            option.field_selector === value.field_selector
          }
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <Autocomplete
          multiple
          options={[]} // No predefined options
          value={trimmedConditions}
          onChange={(_, value) => {
            // Filter out any empty values and ensure all new values are trimmed
            const newValues = value
              .map((val) => val.trim())
              .filter((val) => val);
            form.setFieldValue('conditions', newValues); // Update Formik value
          }}
          freeSolo // Allow custom values
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue); // Update input value state
            setErrorMessage(''); // Clear the error message on new input change
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name='conditions'
              variant='outlined'
              label='Conditions'
              placeholder='Press Enter after typing each value'
              InputLabelProps={{
                shrink: true,
              }}
              onKeyDown={handleKeyDown} // Attach key down handler
              error={!!errorMessage} // Display error state if error message exists
              helperText={errorMessage} // Show the error message
            />
          )}
          fullWidth
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <Autocomplete
          disabled={isEdit}
          multiple
          options={['User', 'Admin', 'SuperAdmin']}
          value={form.values.roles}
          renderInput={(params) => (
            <TextField {...params} name='roles' label='Roles' />
          )}
          getOptionLabel={(option) => option}
          onChange={(_, value) => {
            form.setFieldValue('roles', value);
          }}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <Autocomplete
          value={form.values.formType}
          options={[
            { id: 'd4fd-fd4sfd2', name: 'Form' },
            { id: 'sdcw45-4da1t7', name: 'Table' },
            { id: '2d4f5-4d5f34', name: 'Dashboard' },
            { id: '2d4f5-4d5f4', name: 'Report' },
          ]}
          isOptionEqualToValue={(option, value) => {
            return option.id === value?.id;
          }}
          getOptionLabel={(option) => option.name}
          getOptionDisabled={(option) => option.name === 'Dashboard'}
          onChange={(_, value) => {
            form.setFieldValue('formType', value);
          }}
          renderInput={(params) => (
            <TextField {...params} name='formType' label='Form Type' />
          )}
          fullWidth
        />
      </Grid> */}

      {/* <Grid item xs={12}>
        <RadioGroupInput
          label='Form Type'
          name='formType'
          value={form.values.formType}
          getOptionLabel={(option) => option.name}
          getOptionDisabled={(option) =>
            option.name === 'Dashboard' || Boolean(isEdit)
          }
          onChange={(_, value) => {
            form.setFieldValue('formType', value);
          }}
          isOptionEqualToValue={(option, value) => {
            return option.code === value?.id;
          }}
          options={[
            { code: 'd4fd-fd4sfd2', name: 'Form' },
            { code: 'sdcw45-4da1t7', name: 'Table' },
            { code: '2d4f5-4d5f34', name: 'Dashboard' },
            { code: '2d4f5-4d5f4', name: 'Report' },
          ]}
          controlProps={{
            fullWidth: true,
            sx: {
              '& .MuiFormLabel-root': {
                textAlign: 'left',
              },
            },
          }}
        />
      </Grid> */}

      {/* <Grid item xs={12}>
        <NumericInput form={form} />
      </Grid> */}
      {/* <Grid item xs={12}>
        <SelectField
          options={[
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
          ]}
          value={form.values.option}
          getOptionLabel={(option) => option.label}
          onChange={(_, value) => {
            form.setFieldValue('option', value);
          }}
          label='Select an Option'
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <QuillMention
          value={form.values.name}
          onChange={(value) => form.setFieldValue('name', value)}
          // label='Type here...'
          ref={quillRef}
        />
      </Grid> */}
      <Grid item xs={12}>
        <TipTapEditor
          value={form.values.description}
          onChange={(value) => form.setFieldValue('description', value)}
          setMentionHandler={setInsertMentionHandler}
          label='Description'
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant='contained'
          onClick={() => insertMentionToTipTap()}
          fullWidth>
          Add Mention
        </Button>
      </Grid>
      <Grid item container columns={12} spacing={2}>
        <Grid item xs={6} mt={2}>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            disabled={!form.isValid || (!detectedChanges && isEdit)}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Grid>
        <Grid item xs={6} mt={2}>
          <Button
            variant='contained'
            type='reset'
            fullWidth
            onClick={() => form.resetForm()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
