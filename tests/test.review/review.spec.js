/* eslint-env jest */
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import Reviews from '../../client/src/components/reviews/Reviews.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';

jest.mock('axios');

// test('test', () => {
//   expect(true).toBe(true);
// });

describe('Review and Ratings', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === 'reviews/?page=1&count=500&sort=newest&product_id=40344') {
        return Promise.resolve({
          data: {
            product: '40344',
            page: 0,
            count: 2,
            results: [
              {
                review_id: 1279637,
                rating: 4,
                summary: 'asdfasfasd',
                recommend: true,
                response: null,
                body: 'asdasdasdasdasdasdasdasdasdasdasdasdsasdsasdsasdsasd',
                date: '2023-04-23T00:00:00.000Z',
                reviewer_name: 'testbot',
                helpfulness: 1,
                photos: [],
              },
              {
                review_id: 1279590,
                rating: 1,
                summary: 'Summary text of the review',
                recommend: false,
                response: null,
                body: 'Continued or full text of the review',
                date: '2023-04-10T00:00:00.000Z',
                reviewer_name: 'reksa',
                helpfulness: 0,
                photos: [
                  {
                    id: 2458647,
                    url: 'url1',
                  },
                  {
                    id: 2458648,
                    url: 'url2',
                  },
                ],
              },
            ],
          },
        });
      }
      // if (url === 'reviews/meta/?product_id=40344') {
      //   return Promise.resolve({
      //     data: {
      //       product_id: '40344',
      //       ratings: {
      //         1: '139',
      //         2: '201',
      //         3: '316',
      //         4: '301',
      //         5: '668',
      //       },
      //       recommended: {
      //         false: '418',
      //         true: '1207',
      //       },
      //       characteristics: {
      //         Fit: {
      //           id: 135219,
      //           value: '3.3014705882352941',
      //         },
      //         Length: {
      //           id: 135220,
      //           value: '3.3251072961373391',
      //         },
      //         Comfort: {
      //           id: 135221,
      //           value: '3.3782559456398641',
      //         },
      //         Quality: {
      //           id: 135222,
      //           value: '3.3322222222222222',
      //         },
      //       },
      //     },
      //   }),
      // }
      return Promise.reject(new Error('Mock axios error'));
    });
  });
  // test('renders sort text button', async () => {
  //   render(
  //     <GlobalContextProvider>
  //       <Reviews />
  //     </GlobalContextProvider>,
  //   );
  //   const linkElement = await screen.getByText(/More Reviews/);
  //   expect(linkElement).toBeInTheDocument();
  // });
  describe('Review List Component', () => {
    beforeEach(async () => {
      const mockProductID = 40344;
      await act(() => {
        render(
          <GlobalContextProvider value={{ productID: mockProductID }}>
            <Reviews />
          </GlobalContextProvider>,
        );
      });
    });
    it('should render a more reviews button', () => {
      expect(screen.getByText('More Reviews')).toBeInTheDocument();
    });

    it('should render the sort menu', () => {
      expect(screen.getByText('Sorted By')).toBeInTheDocument();
    });

    it('should render the rating breakdown', () => {
      expect(screen.getByText('Rating Breakdown')).toBeInTheDocument();
    });
  });
});
