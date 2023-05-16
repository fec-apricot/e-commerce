/* eslint-env jest */
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import ReviewBreakdown from '../../client/src/components/reviews/ReviewBreakdown.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import { mockProductReviews, mockMetaData } from './MockReviewData';
// npx jest -- coverage
jest.mock('axios');

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
    return Promise.reject(new Error('Mock axios error'));
  });
});
beforeEach(async () => {
  render(
    <ReviewBreakdown />,
  );
});
describe('Review Breakdown', () => {
  // it('Should have the review list, review breakdown, and product breakdown component', () => {
  //   expect(screen.getByTestId('reviewcomponent')).toHaveClass('reviews');
  // });

  it('Should render each bar', () => {
    const bar1 = screen.getByText(/1 star/);
    const bar2 = screen.getByText(/2 stars/);
    const bar3 = screen.getByText(/3 stars/);
    const bar4 = screen.getByText(/4 stars/);
    const bar5 = screen.getByText(/5 stars/);
    expect(bar1).toBeInTheDocument();
    expect(bar2).toBeInTheDocument();
    expect(bar3).toBeInTheDocument();
    expect(bar4).toBeInTheDocument();
    expect(bar5).toBeInTheDocument();
  });
  // it('Should dynamically render the bar lengths', () => {
  //   const allBars = screen.getAllByTestId('inner');
  //   expect(allBars[0]).toBe(true);
  // });
});
