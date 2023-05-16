/* eslint-env jest */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import ReviewList from '../../client/src/components/reviews/ReviewList.jsx';
import { mockProductReviews } from './MockReviewData';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === 'reviews/?page=1&count=500&sort=relevant&product_id=40344') {
      return Promise.resolve({
        data: mockProductReviews,
      });
    }
    return Promise.reject(new Error('Mock axios error'));
  });
});

beforeEach(async () => {
  const mockProductID = 40344;
  const mockSort = 'relevant';

  await act(() => {
    render(
      <ReviewList
        productID={mockProductID}
        sortParam={mockSort}
        reviewList={mockProductReviews.results}
      />,
    );
  });
});

describe('Review Tiles', () => {
  it('Should have only 2 tiles initially', () => {
    const tiles = screen.getAllByTestId('review-tile');
    expect(tiles).toHaveLength(2);
  });

  it('Should render 2 more tiles when the "More Review" button is clicked', () => {
    const button = screen.getByText(/More Reviews/);
    fireEvent.click(button);
    const newTiles = screen.getAllByTestId('review-tile');
    expect(newTiles).toHaveLength(4);
  });
});
