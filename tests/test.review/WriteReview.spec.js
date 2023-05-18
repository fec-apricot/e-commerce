/* eslint-env jest */
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
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
  const mockProduct = { name: 'Camo Onesie' };
  let mockModal = true;
  const setMockModal = () => { mockModal = false; };
  await act(() => {
    render(
      <WriteReview productID={mockProductID} product={mockProduct} reviewModal={mockModal} setReviewModal={()=>{setMockModal()}} />,
    );
  });
});
describe('Write Review', () => {
  it('Should render all the forms in the modal', () => {
    const overallRating = screen.queryByText('Overall Rating *');
    const recommendation = screen.queryByText(/Do you recommend this product?/i);
    const characteristics = screen.queryByText('Characteristics *');
    const summary = screen.queryByText('Review Summary');
    const body = screen.queryByText('Review Body *');
    const uploadPhotos = screen.queryByText('Upload your photos');
    const nickname = screen.queryByText('What is your nickname *');
    const email = screen.queryByText('Your email *');
    expect(overallRating).toBeInTheDocument();
    expect(recommendation).toBeInTheDocument();
    expect(characteristics).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(uploadPhotos).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('Should not be able to be submitted until all forms are clicked', () => {
    const submit = screen.getByText(/Submit Review/i);
    // expect(screen.getByText(/Write Your Review For Camo Onesie/i)).not.toBeInTheDocument();
    expect(submit).toBeDisabled();
    const body = screen.getByTestId('review-form-body');
    const bodyWarning = screen.getByText(/Review Body Should Be At Least 50 characters long/i);
    expect(bodyWarning).toBeInTheDocument();
    fireEvent.change(body, { target: { value: 'this is 50 characters yea this is 50 characters yea' } });
    expect(bodyWarning).not.toBeInTheDocument();

    const recommend = screen.getByTestId('review-form-recommend');
    const detailclick = screen.getByTestId('detail-score-1');
    fireEvent.click(recommend);
    // need to pass in mock detail
    fireEvent.click(detailclick);
  });
});
