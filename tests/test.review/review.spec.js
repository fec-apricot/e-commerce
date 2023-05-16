/* eslint-env jest */
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import Reviews from '../../client/src/components/reviews/Reviews.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import { mockProductReviews, mockMetaData, globalContextMock } from './MockReviewData';
// npx jest -- coverage
jest.mock('axios');

//     it('should render the rating breakdown', () => {
//       expect(screen.getByText('Rating Breakdown')).toBeInTheDocument();
//     });
//   });
// });
beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === 'reviews/?page=1&count=500&sort=relevant&product_id=40344') {
      return Promise.resolve({
        data: mockProductReviews,
      });
    }
    if (url === 'reviews/meta/?product_id=40344') {
      return Promise.resolve({
        data: mockMetaData,
      });
    }
    if (url === '/products/40344') {
      return Promise.resolve({
        data: globalContextMock,
      });
    }
    return Promise.reject(new Error('Mock axios error'));
  });
});

afterEach(cleanup);

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
describe('Review and Ratings', () => {
  it('Should have the review list, review breakdown, and product breakdown component', () => {
    expect(screen.getByTestId('reviewcomponent')).toHaveClass('reviews');
  });
  it('Should render the add reviews button', () => {
    expect(screen.getByText(/add review/i)).toBeInTheDocument();
  });
});
