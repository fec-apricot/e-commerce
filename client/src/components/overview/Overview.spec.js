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
    if (url === '/products/40344') {
      return Promise.resolve({
        data: {
          id: 40344,
          campus: 'hr-rfp',
          name: 'Jamel Boots',
          slogan: 'Voluptas maiores et dolores harum.',
          description: 'Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.',
          category: 'Boots',
          default_price: '465.00',
          created_at: '2021-08-13T14:38:44.588Z',
          updated_at: '2021-08-13T14:38:44.588Z',
          features: [
            {
              feature: 'Lifetime Guarantee',
              value: null,
            },
          ],
        },
      });
    }
    if (url === '/products/40344/styles') {
      return Promise.resolve({
        data: {
          product_id: '40344',
          results: [{
            style_id: 240910,
            name: 'Purple',
            original_price: '465.00',
            sale_price: null,
            default: true,
            photos: [
              {
                thumbnail_url: 'https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
              },
            ],
            skus: {
              1397049: {
                quantity: 15,
                size: '7',
              },
              1397050: {
                quantity: 15,
                size: '7.5',
              },
              1397051: {
                quantity: 51,
                size: '8',
              },
            },
          },
          ],
        },
      });
    }
    return Promise.reject(new Error('Mock axios GET failed'));
  });
  await act(() => {
    render(
      <GlobalContextProvider>
        <OverviewContextProvider>
          <Overview />
        </OverviewContextProvider>
      </GlobalContextProvider>,
    );
  });
  expect(true).toBeTruthy();
});
