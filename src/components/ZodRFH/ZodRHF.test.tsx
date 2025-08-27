import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import ZodRFH from './ZodRFH';

it('Should display the name', async () => {
  render(<ZodRFH />);

  const formTitle = await screen.findByRole('heading', { level: 1 });
  expect(formTitle.textContent).toBe('Zod Form');
});

it('Should display the Submit button', async () => {
  render(<ZodRFH />);

  const submitButton = screen.getByTestId<HTMLButtonElement>('submit');
  expect(submitButton.textContent).toBe('Save');
  expect(submitButton.disabled).toBe(true);
});

it('Submit button should be enabled', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<ZodRFH onSubmitHandler={handleSubmit} />);

  const nameField = screen.getByRole<HTMLInputElement>('textbox', {
    name: 'Name',
  });
  await user.type(nameField, 'Sam');
  expect(nameField).toHaveValue('Sam');

  const ageField = screen.getByRole<HTMLInputElement>('spinbutton', {
    name: 'Age',
  });
  await user.type(ageField, '100');
  expect(ageField).toHaveValue(100);

  const emailField = screen.getByRole<HTMLInputElement>('textbox', {
    name: 'Email',
  });
  await user.type(emailField, 'sam@email.com');
  expect(emailField).toHaveValue('sam@email.com');

  const addressField = screen.getByRole<HTMLInputElement>('textbox', {
    name: 'Address',
  });
  await user.type(addressField, '21 Street');
  expect(addressField).toHaveValue('21 Street');

  const countryInput = screen.getByRole('combobox', { name: /country/i });
  await user.type(countryInput, 'Colombia');
  const countryOption = await screen.findByText('Colombia');
  await user.click(countryOption);
  expect(countryInput).toHaveValue('Colombia');

  const cityInput = screen.getByRole('combobox', { name: /city/i });
  await user.type(cityInput, 'Medellin');
  const cityOption = await screen.findByText('Medellin');
  await user.click(cityOption);
  expect(cityInput).toHaveValue('Medellin');

  const submitButton = screen.getByTestId<HTMLButtonElement>('submit');
  expect(submitButton).toBeEnabled();
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'Sam',
    age: 100,
    city: {
      value: 'Medellin',
    },
    country: 'Colombia',
    allowContact: true,
    email: 'sam@email.com',
    meta: {
      address: '21 Street',
    },
  });

  //   expect(submitButton.textContent).toBe('Save');
  //   expect(submitButton.disabled).toBe(true);
});
