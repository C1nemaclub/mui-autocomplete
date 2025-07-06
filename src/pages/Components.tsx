import {
  Autocomplete,
  Chip,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import CompoundList from '../components/CompoundGenericList/context/CompundList';
import CompoundWithGithub from '../components/CompoundWithGithub';
import Expression from '../components/Expression';
import GithubAutocomplete from '../components/GithubAutocomplete/GithubAutocomplete';
import StyledInput from '../components/GithubAutocomplete/components/StyledInput';

const allTags = ['react', 'vue', 'angular', 'node', 'express', 'docker', 'k8s'];

const Components = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const [tagGroups, setTagGroups] = useState<string[][]>([
    ['react', 'frontend'],
    ['node'],
  ]);

  return (
    <Container>
      <Typography variant='h4'>Components</Typography>
      <Expression />
      <CompoundWithGithub />
      <Stack
        sx={{
          width: '100%',
          gap: 2,
          alignItems: 'center',
        }}>
        <GithubAutocomplete
          options={allTags}
          value={tags}
          onChange={setTags}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <StyledInput
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              placeholder='Search Tech'
            />
          )}
          helperText='Apply Technologies'
        />
        <CompoundList
          defaultVal='New User'
          value={users}
          onChange={(newVal) => setUsers(newVal)}
          renderItem={(params) => {
            return (
              <Stack
                direction='row'
                gap={2}
                alignItems='center'
                sx={{ width: '100%' }}>
                <TextField
                  size='small'
                  fullWidth
                  value={params.value}
                  onChange={(e) => params.onChange(e.target.value)}
                />
                <IconButton sx={{ p: 0 }} onClick={params.onRemove}>
                  <IconTrash />
                </IconButton>
              </Stack>
            );
          }}>
          <Stack
            gap={2}
            sx={{
              width: '100%',
            }}>
            <CompoundList.Items gap={1} />
            <Stack
              direction='row'
              gap={1}
              width='100%'
              sx={{
                justifyContent: 'center',
              }}>
              <CompoundList.AddButton variant='contained'>
                Add New User
              </CompoundList.AddButton>
              <CompoundList.ClearButton color='error' variant='contained'>
                Clear!
              </CompoundList.ClearButton>
            </Stack>
          </Stack>
        </CompoundList>
        <CompoundList
          value={tagGroups}
          onChange={setTagGroups}
          defaultVal={[]}
          renderItem={({ value, onChange, index }) => (
            <Stack direction='row'>
              <Autocomplete
                multiple
                freeSolo
                options={allTags}
                value={value}
                size='small'
                onChange={(_, newVal) => onChange(newVal)}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      variant='outlined'
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label={`Tag group ${index + 1}`} />
                )}
                fullWidth
              />
              {tagGroups.length - 1 === index && (
                <CompoundList.ClearButton color='error'>
                  Clear All
                </CompoundList.ClearButton>
              )}
            </Stack>
          )}>
          <Stack width='100%'>
            <CompoundList.AddButton>Add Tag Group</CompoundList.AddButton>
            <CompoundList.Items gap={2} />
            <CompoundList.ClearButton color='error'>
              Clear All
            </CompoundList.ClearButton>
          </Stack>
        </CompoundList>
      </Stack>
    </Container>
  );
};

export default Components;
