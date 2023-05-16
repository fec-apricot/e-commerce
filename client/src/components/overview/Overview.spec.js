/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview.jsx';
import { OverviewContextProvider } from './OverviewContext.jsx';
import { GlobalContext } from '../GlobalContext.jsx';
import { mockProduct, mockStyles } from './mockProductData';

jest.mock('axios');
axios.get.mockImplementation((url) => {
  if (url === '/products/40450') {
    return Promise.resolve({
      data: mockProduct,
    });
  }
  if (url === '/products/40450/styles') {
    return Promise.resolve({
      data: mockStyles,
    });
  }
  return Promise.reject(new Error('Mock axios GET failed'));
});

describe('Overview component', () => {
  describe('Product overview and description', () => {
    beforeEach(async () => {
      const mockProductID = 40450;
      const mockSetProductID = jest.fn();

      render(
        <GlobalContext.Provider value={
          { productID: mockProductID, setProductID: mockSetProductID, product: mockProduct }
        }
        >
          <OverviewContextProvider>
            <Overview />
          </OverviewContextProvider>
        </GlobalContext.Provider>,
      );
    });
    afterEach(cleanup);
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
