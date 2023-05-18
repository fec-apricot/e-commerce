/* eslint-env jest */

import React from 'react';
// import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import Carousel from '../Carousel.jsx';
import { GlobalContext } from '../../GlobalContext.jsx';

describe('Carousel component', () => {
  describe('Related Products Carousel', () => {
    beforeEach(async () => {
      const dataStore = {
        10001: [
          {
            name: 'Blank',
            slogan: 'No product yet',
            category: 'outfit placeholder',
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

        40345: [
          {
            name: 'Sunglasses',
            slogan: 'Protect your eyes',
            category: 'Accessories',
            default_price: '999.00',
          },
          {
            results: [
              {
                'default?': true,
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
              4: '1',
              5: '0',
            },
          },
        ],

        40346: [
          {
            name: 'Joggers',
            slogan: 'Protect your legs',
            category: 'Pants',
            default_price: '998.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '1',
              4: '0',
              5: '0',
            },
          },
        ],

        40350: [
          {
            name: 'Blues Shoes',
            slogan: 'Protect your feet',
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
      const related = [40344, 40345, 40346, 40351, 40350];
      const burn = 0;
      const outfitList = [];
      const mockSetID = () => { console.log('id change'); };
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID, setProductID: mockSetID }}>
            <Carousel
              rpMode={yes}
              dataStore={dataStore}
              related={related}
              burn={burn}
              outfitList={outfitList}
              outfitToggle={() => {}}
            />
          </GlobalContext.Provider>,
        );
      });
    });

    it('should render product category', () => {
      expect(screen.getByText('Kicks')).toBeVisible();
    });

    it('should render product name', () => {
      expect(screen.getByText(/Joggers/i)).toBeVisible();
    });

    it('should render product price', () => {
      expect(screen.getByText(/999.00/i)).toBeVisible();
    });

    it('should render product slogan', () => {
      expect(screen.getByText(/Protect your legs/i)).toBeVisible();
    });

    it('should render nav buttons if product list > 4', () => {
      expect(screen.getByText(/>/i)).toBeVisible();
    });

    it('should call slide function when nav button is clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const navBtn = screen.getByText(/>/i);
      await fireEvent.click(navBtn);

      expect(logSpy).toHaveBeenCalledWith('RP slide');
    });

    it('should call changeProduct function when card is clicked', async () => {
      const logSpy = jest.spyOn(console, 'log');

      const productCard = screen.getByText('Kicks');
      await fireEvent.click(productCard);

      expect(logSpy).toHaveBeenCalledWith('id change');
    });
  });

  describe('Outfit Carousel', () => {
    beforeEach(async () => {
      const dataStore = {
        10001: [
          {
            name: 'Blank',
            slogan: 'No product yet',
            category: 'outfit placeholder',
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

        40345: [
          {
            name: 'Sunglasses',
            slogan: 'Protect your eyes',
            category: 'Accessories',
            default_price: '999.00',
          },
          {
            results: [
              {
                'default?': true,
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
              4: '1',
              5: '0',
            },
          },
        ],

        40346: [
          {
            name: 'Joggers',
            slogan: 'Protect your legs',
            category: 'Pants',
            default_price: '998.00',
          },
          {
            results: [
              {
                'default?': true,
                photos: [
                  {
                    thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  },
                ],
              },
            ],
          },
          {
            ratings: {
              1: '0',
              2: '0',
              3: '1',
              4: '0',
              5: '0',
            },
          },
        ],

        40350: [
          {
            name: 'Blues Shoes',
            slogan: 'Protect your feet',
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
      const related = [40344, 40345, 40346, 40351, 40350];
      const burn = 0;
      const outfitList = [10001, 10001, 10001];
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <Carousel
              rpMode={false}
              dataStore={dataStore}
              related={related}
              burn={burn}
              outfitList={outfitList}
              outfitToggle={() => {}}
            />
          </GlobalContext.Provider>,
        );
      });
    });

    it('should render product category', () => {
      expect(screen.getByText('Jackets')).toBeVisible();
    });

    it('should render product name', () => {
      expect(screen.getByText(/Camo Onsie/i)).toBeVisible();
    });

    it('should render product name', () => {
      expect(screen.getAllByText(/Blank/i)).toHaveLength(3);
    });

    it('should render product price', () => {
      expect(screen.getByText(/995.00/i)).toBeVisible();
    });

    it('should render product slogan', () => {
      expect(screen.getByText(/Protect your torso/i)).toBeVisible();
    });

    it('should render blank outfit cards', () => {
      expect(screen.getAllByText('$$$')).toHaveLength(3);
    });
  });
});
