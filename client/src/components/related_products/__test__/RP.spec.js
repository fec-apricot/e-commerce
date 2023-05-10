/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedCard from '../row1/RelatedCard.jsx';

describe('Related Products module', () => {
  test('Should render', async () => {
    render(
      <RelatedCard />,
    );
    screen.debug();
    const cardOnScreen = screen.getAllByText(/$/i);
    expect(cardOnScreen).toHaveLength(4);
  });
});
