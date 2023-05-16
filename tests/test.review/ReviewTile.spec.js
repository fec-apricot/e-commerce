/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import ReviewTile from '../../client/src/components/reviews/ReviewTile.jsx';
import { mockProductReviews } from './MockReviewData';

jest.mock('axios');

beforeEach(() => {
  axios.put.mockImplementation((url) => {
    if (url === 'reviews/1279590/helpful') {
      return Promise.resolve({
        status: 204,
      });
    }
    return Promise.reject(new Error('Mock axios error'));
  });
});

// beforeEach(async () => {

//   await act(() => {
//     render(
//       <ReviewTile
//         review={mockProductReviews.result[0]}
//       />,
//     );
//   });
// });

describe('Review Tiles', () => {
  it('Should have only a body and summary', () => {
    render(
      <ReviewTile
        review={mockProductReviews.results[0]}
      />,
    );
    const summary = screen.getByTestId('review-summary');
    expect(summary).toBeInTheDocument();
    const body = screen.getByTestId('review-body');
    expect(body).toBeInTheDocument();
  });

  it('Should render the text "I recommend this product" if the reviewer so', () => {
    render(
      <ReviewTile
        review={mockProductReviews.results[0]}
      />,
    );
    const recommend = screen.queryByText('I recommend this product');
    expect(recommend).toBeInTheDocument();
  });

  it('Should not render the text "I recommend this product" if the reviewer does not do so', () => {
    render(
      <ReviewTile
        review={mockProductReviews.results[1]}
      />,
    );
    const noRecommend = screen.queryByText('I recommend this product');
    expect(noRecommend).not.toBeInTheDocument();
  });

  it('Should update the helfupness count when the user clicks on "Was this Review Helpful?', () => {
    render(
      <ReviewTile
        review={mockProductReviews.results[1]}
      />,
    );
    const addHelpful = screen.getByTestId('helpful-link');
    fireEvent.click(addHelpful);
    const oldHelpful = screen.queryByText('Yes (0)');
    const incHelpful = screen.getByText('Yes (1)');
    expect(oldHelpful).not.toBeInTheDocument();
    expect(incHelpful).toBeInTheDocument();
  });
});
