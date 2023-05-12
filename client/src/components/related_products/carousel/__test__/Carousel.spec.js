/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import Carousel from '../Carousel.jsx';
import { GlobalContext } from '../../../GlobalContext.jsx';

jest.mock('axios');

describe('Carousel component', () => {
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
            },
            ],
          },
        });
      }
      if (url === '/reviews/meta?product_id=40450') {
        return Promise.resolve({
          data: {
            product_id: '40450',
            ratings: {
              1: '6',
              2: '7',
              3: '9',
              4: '4',
              5: '8',
            },
          },
        });
      }
      if (url === '/products/40450/related') {
        return Promise.resolve({
          data: [
            40450,
            40450,
            40450,
            40450,
          ],
        });
      }
      return Promise.reject(new Error('Mock axios GET failed'));
    });
  });

  afterEach(cleanup);

  describe('Related Products Carousel', () => {
    beforeEach(async () => {
      const mockProductID = 40450;
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <Carousel />
          </GlobalContext.Provider>,
        );
      });
    });

    it('should render product category', () => {
      expect(screen.getAllByText('Slacks')).toHaveLength(4);
    }); // using a regular expression here finds 'Slacks' 8 times. bc the name

    it('should render product name', () => {
      expect(screen.getAllByText(/Alivia Slacks/i)).toHaveLength(4);
    });

    it('should render product price', () => {
      expect(screen.getAllByText(/873.00/i)).toHaveLength(4);
    });

    it('should render product slogan', () => {
      expect(screen.getAllByText(/Voluptas maiores/i)).toHaveLength(4);
    });
  });
});
