/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import RelatedCard from '../row1/RelatedCard.jsx';

describe('Related Products module', () => {
  test('Should render', async () => {
    render(
      <RelatedCard />,
    );
    screen.debug();
    const cardOnScreen = screen.getByText(/$/i);
    expect(cardOnScreen).toHaveLength(1);
  });
});
