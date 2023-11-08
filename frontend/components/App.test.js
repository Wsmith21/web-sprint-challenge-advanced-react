import React from 'react';
import { render, fireEvent, getByTitle, getByTestId } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('typing a valid email updates state', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});

test('typing a valid email updates state', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});

test('typing a valid email updates state', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});


test('typing a valid email updates state', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});

test('typing a valid email updates state', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});