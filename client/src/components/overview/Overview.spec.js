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

describe('Overview component', () => {
  const mockedProduct = {
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
  };

  const mockedProductStyle = {
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
  };

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/products/40450') {
        return Promise.resolve({
          data: mockedProduct,
        });
      }
      if (url === '/products/40450/styles') {
        return Promise.resolve({
          data: mockedProductStyle,
        });
      }
      return Promise.reject(new Error('Mock axios GET failed'));
    });
  });

  afterEach(cleanup);

  describe('Product overview and description', () => {
    beforeEach(async () => {
      const mockedProductID = 40450;
      const mockedSetProductID = jest.fn();
      await act(() => {
        render(
          <GlobalContext.Provider value={
            { productID: mockedProductID, setProductID: mockedSetProductID, product: mockedProduct }
          }
          >
            <OverviewContextProvider>
              <Overview />
            </OverviewContextProvider>
          </GlobalContext.Provider>,
        );
      });
    });
    it('should render product category', () => {
      expect(screen.getByText('Slacks')).toBeInTheDocument();
    });

    it('should render product name', () => {
      expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
    });

    it('should render product price', () => {
      expect(screen.getByText('873.00')).toBeInTheDocument();
    });

    it('should render product slogan', () => {
      expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
    });

    it('should render product description', () => {
      expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
    });

    it('should render product features', () => {
      expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
    });
  });
});
