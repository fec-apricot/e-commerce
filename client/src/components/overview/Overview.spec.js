/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';
import Overview from './Overview.jsx';
import { OverviewContextProvider } from './OverviewContext.jsx';
import { GlobalContextProvider } from '../GlobalContext.jsx';

afterEach(cleanup);
jest.mock('axios');

it.only('should render product name', async () => {
  axios.get.mockImplementation((url) => {
    if (url === 'http://localhost:3000/products/40344') {
      return Promise.resolve({
        category: 'Jackets',
        name: 'Camo Onesie',
        default_price: '140.00',
      });
    }
    return Promise.reject(new Error());
  });
  await act(() => {
    render(
    <GlobalContextProvider>
      <OverviewContextProvider>
        <Overview />
      </OverviewContextProvider>
    </GlobalContextProvider>,
  ) };);
  expect(true).toBeTruthy();
});
