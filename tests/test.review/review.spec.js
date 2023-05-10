/* eslint-env jest */
import { render, screen, cleanup } from '@testing-library/react';
import Reviews from '../../client/src/components/reviews/Reviews.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import '@testing-library/jest-dom/'
import React from 'react'

test('test', () => {
  expect(true).toBe(true);
});

test('renders sort text button', async () => {
  render(
    <GlobalContextProvider>
      <Reviews />
    </GlobalContextProvider>
  );
  const linkElement = await screen.getByText(/More Reviews/);
  expect(linkElement).toBeInTheDocument();
})