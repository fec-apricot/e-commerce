/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import Overview from './Overview.jsx';
import { OverviewContextProvider } from './OverviewContext.jsx';
import { GlobalContext } from '../GlobalContext.jsx';

jest.mock('axios');
beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === '/products/40450') {
      return Promise.resolve({
        data: {
          id: 40450,
          campus: 'hr-rfp',
          name: 'Alivia Slacks',
          slogan: 'Voluptas maiores et dolores harum.',
          description: 'Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.',
          category: 'Slacks',
          default_price: '873.00',
          created_at: '2021-08-13T14:38:44.588Z',
          updated_at: '2021-08-13T14:38:44.588Z',
          features: [
            {
              feature: 'Cut',
              value: '\'Striaght\'',
            },
          ],
        },
      });
    }
    if (url === '/products/40450/styles') {
      return Promise.resolve({
        data: {
          product_id: '40450',
          results: [{
            style_id: 240910,
            name: 'Purple',
            original_price: '873.00',
            sale_price: '668.00',
            default: true,
            photos: [
              {
                thumbnail_url: 'https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
              },
            ],
            skus: {
              1397049: {
                quantity: 15,
                size: 'XS',
              },
              1397050: {
                quantity: 15,
                size: 'S',
              },
              1397051: {
                quantity: 51,
                size: 'M',
              },
            },
          },
          ],
        },
      });
    }
    return Promise.reject(new Error('Mock axios GET failed'));
  });
});

afterEach(cleanup);

it('should render basic information of product', async () => {
  const mockProductID = 40450;
  await act(() => {
    render(
      <GlobalContext.Provider value={{ productID: mockProductID }}>
        <OverviewContextProvider>
          <Overview />
        </OverviewContextProvider>
      </GlobalContext.Provider>,
    );
  });
  expect(screen.getByText('Slacks')).toBeInTheDocument();
  expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
  expect(screen.getByText('873.00')).toBeInTheDocument();
  expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
  expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
  expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
});
