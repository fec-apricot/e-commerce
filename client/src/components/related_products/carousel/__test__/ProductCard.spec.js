/* eslint-env jest */

import React from 'react';
// import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard.jsx';
import { GlobalContext } from '../../../GlobalContext.jsx';

describe('Carousel component', () => {
  describe('Related Products Carousel', () => {
    beforeEach(async () => {
      const dataStore = {
        10001: [
          {
            name: 'Blank',
            slogan: 'No product yet',
            category: 'outfitBlank',
            default_price: '$$',
          },
          {
            results: [
              {
                photos: [
                  {
                    thumbnail_url: null,
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '0',
              4: '0',
              5: '1',
            },
          },
        ],

        40350: [
          {
            name: 'Blues Shoes',
            slogan: 'Protect your feet and this slogan is super long to make sure it gets cut down by my expanded title function',
            category: 'Shoes',
            default_price: '997.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '1',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],

        40351: [
          {
            name: 'Yeasy 350',
            slogan: 'Protect your feets',
            category: 'Kicks',
            default_price: '996.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1505248254168-1d…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '1',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],

        40344: [
          {
            name: 'Camo Onsie',
            slogan: 'Protect your torso',
            category: 'Jackets',
            default_price: '995.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],
      };
      const mockProductID = 40344;
      const yes = true;
      const relatedID = 40351;
      let burn = 0;
      const mockToggle = () => {
        burn = 1;
        console.log('triggered');
      };
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <ProductCard
              rpMode={yes}
              dataStore={dataStore}
              relatedID={relatedID}
              burn={burn}
              triggerFunction={mockToggle}
            />
          </GlobalContext.Provider>,
        );
      });
    });

    it('should render product category', () => {
      expect(screen.getByText('Kicks')).toBeVisible();
    });

    it('should not render wrong product category', () => {
      expect(screen.queryByText('Jackets')).toBe(null);
    });

    it('should render product name', () => {
      expect(screen.getByText(/Yeasy 350/i)).toBeVisible();
    });

    it('should render expanded product name', () => {
      expect(screen.getByText(/Yeasy 350 - Protect your feets/)).toBeVisible();
    });

    it('should render product price', () => {
      expect(screen.getByText(/996.00/i)).toBeVisible();
    });

    it('should render product slogan', () => {
      expect(screen.getByText(/Protect your feets/i)).toBeVisible();
    });

    it('should render stars', () => {
      expect(screen.getByText('★★★★★')).toBeVisible();
    });

    it('should trigger changeProduct function when card is clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const productCard = screen.getByText(/Kicks/i);
      const productCardBtn = productCard.closest('.cardContainer');
      await fireEvent.click(productCardBtn);

      expect(logSpy).toHaveBeenCalledWith('triggered');
    });

    it('should trigger compare buttons console.log when clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const compareBtn = screen.getByText('★');
      await fireEvent.click(compareBtn);

      expect(logSpy).toHaveBeenCalledWith('compare button pressed');
    });
  });

  describe('Related Products Carousel', () => {
    beforeEach(async () => {
      const dataStore = {
        10001: [
          {
            name: 'Blank',
            slogan: 'No product yet',
            category: 'outfitBlank',
            default_price: '$$',
          },
          {
            results: [
              {
                photos: [
                  {
                    thumbnail_url: null,
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '0',
              4: '0',
              5: '1',
            },
          },
        ],

        40350: [
          {
            name: 'Blues Shoes',
            slogan: 'Protect your feet and this slogan is super long to make sure it gets cut down by my expanded title function',
            category: 'Shoes',
            default_price: '997.00',
          },
          {
            results: [
              {
                'default?': false,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '1',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],

        40351: [
          {
            name: 'Yeasy 350',
            slogan: 'Protect your feets',
            category: 'Kicks',
            default_price: '996.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1505248254168-1d…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '1',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],

        40344: [
          {
            name: 'Camo Onsie',
            slogan: 'Protect your torso',
            category: 'Jackets',
            default_price: '995.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '0',
              4: '0',
              5: '0',
            },
          },
        ],
      };
      const mockProductID = 40344;
      const yes = true;
      const relatedID = 40350;
      let burn = 0;
      const mockToggle = () => {
        burn = 1;
        console.log('triggered');
      };
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <ProductCard
              rpMode={yes}
              dataStore={dataStore}
              relatedID={relatedID}
              burn={burn}
              triggerFunction={mockToggle}
            />
          </GlobalContext.Provider>,
        );
      });
    });

    it('should render product category', () => {
      expect(screen.getByText('Shoes')).toBeVisible();
    });

    it('should not render wrong product category', () => {
      expect(screen.queryByText('Jackets')).toBe(null);
    });

    it('should render product name', () => {
      expect(screen.getByText(/Blues Shoes/i)).toBeVisible();
    });

    it('should render expanded product name', () => {
      expect(screen.getByText(/Blues Shoes - Protect your feet and this slog.../)).toBeVisible();
    });

    it('should render product price', () => {
      expect(screen.getByText(/997.00/i)).toBeVisible();
    });

    it('should render product slogan', () => {
      expect(screen.getByText(/Protect your feet and/i)).toBeVisible();
    });

    it('should render stars', () => {
      expect(screen.getByText('★★★★★')).toBeVisible();
    });

    it('should trigger changeProduct function when card is clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const productCard = screen.getByText(/Blues Shoes/i);
      const productCardBtn = productCard.closest('.cardContainer');
      await fireEvent.click(productCardBtn);

      expect(logSpy).toHaveBeenCalledWith('triggered');
    });

    it('should trigger compare buttons console.log when clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const compareBtn = screen.getByText('★');
      await fireEvent.click(compareBtn);

      expect(logSpy).toHaveBeenCalledWith('compare button pressed');
    });
  });
});
