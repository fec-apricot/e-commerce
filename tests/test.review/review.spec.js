/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import React from 'react';
import Reviews from '../../client/src/components/reviews/Reviews.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import '@testing-library/jest-dom/'

test('test', () => {
  expect(true).toBe(true);
});

test('renders sort text button', async () => {
  render(
    <GlobalContextProvider>
      <Reviews />
    </GlobalContextProvider>,
  );
  const linkElement = await screen.getByText(/More Reviews/);
  expect(linkElement).toBeInTheDocument();
});