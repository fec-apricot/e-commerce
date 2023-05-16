/* eslint-env jest */
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';
import axios from 'axios';
import { act } from 'react-test-renderer';
import ProductBreakdown from '../../client/src/components/reviews/ProductBreakdown.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import { mockCharacteristics } from './MockReviewData';
// npx jest -- coverage
jest.mock('axios');

beforeEach(async () => {
  const mockProductID = 40344;

  await act(() => {
    render(
      <ProductBreakdown productID={mockProductID} characteristics={mockCharacteristics} />
    );
  });
});
describe('Product Breakdown', () => {
  // it('Should have the review list, review breakdown, and product breakdown component', () => {
  //   expect(screen.getByTestId('reviewcomponent')).toHaveClass('reviews');
  // });
  it('Should render the add reviews button', () => {
    expect(screen.getByText(/product breakdown/i)).toBeInTheDocument();
  });
});
