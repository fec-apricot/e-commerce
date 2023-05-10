/* eslint-env jest */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import App from '../App.jsx';

test('test', () => {
  expect(true).toBe(true);
});

test('nother test', async () => {
  render(
    <App />,
  );
  const text = await screen.findAllByText(/hello/i);
  await waitFor(() => expect(text).toHaveLength(3));
});
