/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, cleanup, debug } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import RelatedProducts from '../RelatedProducts.jsx';
import { GlobalContext } from '../../GlobalContext.jsx';

// jest.mock('axios');

describe('RelatedProducts component', () => {
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

      if (url === '/products/40451') {
        return Promise.resolve({
          data: {
            id: 40451,
            campus: 'hr-rfp',
            name: 'Product2',
            slogan: 'Number 2 is great!',
            description: 'A test product to test with',
            category: 'Tests',
            default_price: '999.00',
          },
        });
      }
      if (url === '/products/40451/styles') {
        return Promise.resolve({
          data: {
            product_id: '40451',
            results: [{
              style_id: 240910,
              name: 'Purple',
              original_price: '999.00',
              sale_price: '998.00',
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
      if (url === '/reviews/meta?product_id=40451') {
        return Promise.resolve({
          data: {
            product_id: '40451',
            ratings: {
              1: '0',
              2: '0',
              3: '0',
              4: '1',
              5: '0',
            },
          },
        });
      }

      if (url === '/products/40452') {
        return Promise.resolve({
          data: {
            id: 40452,
            campus: 'hr-rfp',
            name: 'Product3',
            slogan: 'Number 3 is great!',
            description: 'Another test product to test with',
            category: 'Nother Test!',
            default_price: '998.00',
          },
        });
      }
      if (url === '/products/40452/styles') {
        return Promise.resolve({
          data: {
            product_id: '40452',
            results: [{
              style_id: 240910,
              name: 'Purple',
              original_price: '998.00',
              sale_price: '997.00',
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
      if (url === '/reviews/meta?product_id=40452') {
        return Promise.resolve({
          data: {
            product_id: '40452',
            ratings: {
              1: '0',
              2: '0',
              3: '1',
              4: '0',
              5: '0',
            },
          },
        });
      }

      if (url === '/products/40453') {
        return Promise.resolve({
          data: {
            id: 40453,
            campus: 'hr-rfp',
            name: 'Product4',
            slogan: 'Number 4 is best!',
            description: 'Second to Last test product to test with',
            category: 'Test!',
            default_price: '997.00',
          },
        });
      }
      if (url === '/products/40453/styles') {
        return Promise.resolve({
          data: {
            product_id: '40453',
            results: [{
              style_id: 240910,
              name: 'Purple',
              original_price: '997.00',
              sale_price: '996.00',
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
      if (url === '/reviews/meta?product_id=40453') {
        return Promise.resolve({
          data: {
            product_id: '40453',
            ratings: {
              1: '0',
              2: '1',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        });
      }

      if (url === '/products/40454') {
        return Promise.resolve({
          data: {
            id: 40454,
            campus: 'hr-rfp',
            name: 'Product5',
            slogan: 'Number 5 is best!',
            description: 'Last test product to test with',
            category: 'Final Test!',
            default_price: '996.00',
          },
        });
      }
      if (url === '/products/40454/styles') {
        return Promise.resolve({
          data: {
            product_id: '40454',
            results: [{
              style_id: 240910,
              name: 'Purple',
              original_price: '996.00',
              sale_price: '995.00',
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
      if (url === '/reviews/meta?product_id=40454') {
        return Promise.resolve({
          data: {
            product_id: '40454',
            ratings: {
              1: '1',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        });
      }

      if (url === '/products/40455') {
        return Promise.resolve({
          data: {
            id: 40455,
            campus: 'hr-rfp',
            name: 'Product6',
            slogan: 'Cant See ME!',
            description: 'Test product hidden off screen',
            category: 'Hidden Test!',
            default_price: '995.00',
          },
        });
      }
      if (url === '/products/40455/styles') {
        return Promise.resolve({
          data: {
            product_id: '40455',
            results: [{
              style_id: 240910,
              name: 'Purple',
              original_price: '995.00',
              sale_price: '994.00',
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
      if (url === '/reviews/meta?product_id=40455') {
        return Promise.resolve({
          data: {
            product_id: '40455',
            ratings: {
              1: '1',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        });
      }

      if (url === '/products/40450/related') {
        return Promise.resolve({
          data: [
            40451,
            40452,
            40453,
            40454,
            40455,
          ],
        });
      }
      return Promise.reject(new Error('Mock axios GET failed'));
    });
  });

  // afterEach(cleanup);

  describe('Related Products Carousel and Product Cards', () => {
    beforeEach(async () => {
      const mockProductID = 40450;
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <RelatedProducts />
          </GlobalContext.Provider>,
        );
      });
    });

    describe('Product Cards', () => {
      it('should render product category Slacks', async () => {
        // screen.debug();
        expect(screen.getByText('Slacks')).toBeVisible();
      });

      it('should render product category Nother Test!', async () => {
        expect(screen.getByText('Nother Test!')).toBeVisible();
      });

      it('should render product name', async () => {
        expect(screen.getByText(/Alivia Slacks/i)).toBeVisible();
      });

      it('should render product price', async () => {
        expect(screen.getByText(/873.00/i)).toBeVisible();
      });

      it('should render product slogan', async () => {
        expect(screen.getByText(/Alivia Slacks - Voluptas maiores/i)).toBeVisible();
      });

      it('Should render stars to all 8 cards on the screen', async () => {
        const starIcons = screen.getAllByText(/★★★★★/i);
        expect(starIcons).toHaveLength(9);
      });

      it('Should render 3 blank outfit cards', async () => {
        const blankCards = screen.getAllByText('$$$');
        expect(blankCards).toHaveLength(3);
      });
    });

    describe('Related Products List Functionality', () => {
      it('should render nav buttons if product list > 4', () => {
        expect(screen.getByText(/>/i)).toBeVisible();
      });
    });

    describe('Outfit List Functionality', () => {
      it('Should render 2 blank outfit cards', async () => {
        const outfitCategory = screen.getByText('Slacks');
        const addToOutfitBtn = outfitCategory.closest('.cardContainer');
        await fireEvent.click(addToOutfitBtn);
        const blankCards = screen.getAllByText('$$$');
        expect(blankCards).toHaveLength(2);
      });

      it('Should render 2 blank outfit cards', async () => {
        const outfitCategory = screen.getByText('Slacks');
        const addToOutfitBtn = outfitCategory.closest('.cardContainer');
        await fireEvent.click(addToOutfitBtn);
        await fireEvent.click(addToOutfitBtn);
        const blankCards = screen.getAllByText('$$$');
        expect(blankCards).toHaveLength(3);
      });
    });
  });
});
