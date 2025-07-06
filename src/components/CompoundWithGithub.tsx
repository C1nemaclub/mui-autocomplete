import { IconButton, Stack, Typography } from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import CompoundList from './CompoundGenericList/context/CompundList';
import GithubAutocomplete from './GithubAutocomplete/GithubAutocomplete';

interface Country {
  value: string;
  label: string;
}

const options: Country[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'za', label: 'South Africa' },
];
const CompoundWithGithub = () => {
  const [countries, setCountries] = useState<Country[][]>([]);
  return (
    <Stack>
      <Typography>Compound with Github</Typography>
      <CompoundList
        value={countries}
        onChange={setCountries}
        defaultVal={[]}
        renderItem={(params) => {
          return (
            <Stack direction='row' alignItems='center'>
              <GithubAutocomplete
                value={params.value}
                onChange={params.onChange}
                getOptionLabel={(option) => option.label}
                options={options}
                helperText='Search country'
              />
              <IconButton onClick={params.onRemove} color='error'>
                <IconTrash size={16} />
              </IconButton>
            </Stack>
          );
        }}>
        <Stack gap={1}>
          <CompoundList.AddButton
            startIcon={<IconPlus />}
            variant='contained'
            color='primary'>
            New Country
          </CompoundList.AddButton>
          <CompoundList.ClearButton variant='contained' color='warning'>
            Clear
          </CompoundList.ClearButton>
          <CompoundList.Items />
        </Stack>
      </CompoundList>
      <pre>{JSON.stringify({ countries }, null, 2)}</pre>
    </Stack>
  );
};

export default CompoundWithGithub;
