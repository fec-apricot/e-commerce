/* eslint-env jest */
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import WriteReview from '../../client/src/components/reviews/WriteReview.jsx';
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
  const mockProductID = 40344;

  await act(() => {
    render(
      <WriteReview productID={mockProductID} />,
    );
  });
});
describe('Write Review', () => {
  it('Should render all the forms in the modal', () => {
    const overallRating = screen.queryByText('Overall Rating (mandatory)');
    const recommendation = screen.queryByText(/Do you recommend this product?/i);
    const characteristics = screen.queryByText('Characteristics (mandatory)');
    const summary = screen.queryByText('Review Summary');
    const body = screen.queryByText('Review Body (mandatory)');
    const uploadPhotos = screen.queryByText('Upload your photos');
    const nickname = screen.queryByText('What is your nickname (mandatory)');
    const email = screen.queryByText('Your email (mandatory)');
    expect(overallRating).toBeInTheDocument();
    expect(recommendation).toBeInTheDocument();
    expect(characteristics).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(uploadPhotos).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })
});
