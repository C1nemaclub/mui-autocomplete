import {
  Autocomplete,
  Box,
  ClickAwayListener,
  useTheme,
  type AutocompleteChangeReason,
  type AutocompleteCloseReason,
  type AutocompleteProps,
  type AutocompleteRenderInputParams,
  type AutocompleteValue,
} from '@mui/material';
import { IconCheck, IconSettings, IconX } from '@tabler/icons-react';
import {
  useState,
  type HTMLAttributes,
  type Key,
  type MouseEvent,
  type SyntheticEvent,
} from 'react';
import PopperComponent from './components/PopperComponent';
import StyledButton from './components/StyledButton';
import StyledInput from './components/StyledInput';
import StyledPopper from './components/StyledPopper';

interface GithubAutocompleteProps<T>
  extends Omit<
    AutocompleteProps<T, true, undefined, false>,
    'onChange' | 'renderInput'
  > {
  onChange: (newVal: T[]) => void;
  getOptionLabel: (value: T) => string;
  options: T[];
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  helperText?: string;
}

const GithubAutocomplete = <T,>(props: GithubAutocompleteProps<T>) => {
  const { value, onChange, getOptionLabel, options, renderInput, helperText } =
    props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleChange = (
    event: SyntheticEvent,
    newValue: AutocompleteValue<T, true, undefined, false>,
    reason: AutocompleteChangeReason
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Backspace' ||
        (event as React.KeyboardEvent).key === 'Delete') &&
      reason === 'removeOption'
    ) {
      return;
    }
    onChange(newValue);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <>
      <Box
        sx={{
          width: 221,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
        }}>
        <StyledButton disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Labels ({value?.length})</span>
          <IconSettings />
        </StyledButton>
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement='bottom-start'>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {helperText && (
              <Box
                sx={{
                  borderBottom: `1px solid ${
                    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
                  }`,
                  padding: '8px 10px',
                  fontWeight: 600,
                }}>
                {helperText}
              </Box>
            )}
            <Autocomplete
              open
              multiple
              onClose={(_, reason: AutocompleteCloseReason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={value}
              onChange={handleChange}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText='No labels'
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } =
                  props as HTMLAttributes<HTMLLIElement> & { key: Key };
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component={IconCheck}
                      sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                    <Box
                      component='span'
                      sx={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        borderRadius: '3px',
                        mr: 1,
                        mt: '2px',
                      }}
                    />
                    <Box
                      sx={(t) => ({
                        flexGrow: 1,
                        '& span': {
                          color: '#8b949e',
                          ...t.applyStyles('light', {
                            color: '#586069',
                          }),
                        },
                      })}>
                      {getOptionLabel(option)}
                    </Box>
                    <Box
                      component={IconX}
                      sx={{ opacity: 0.6, width: 18, height: 18 }}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                  </li>
                );
              }}
              options={options}
              getOptionLabel={getOptionLabel}
              {...(renderInput
                ? { renderInput }
                : {
                    renderInput: (params) => (
                      <StyledInput
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        autoFocus
                        placeholder='Filter'
                      />
                    ),
                  })}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};

export default GithubAutocomplete;
