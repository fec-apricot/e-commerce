/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Stars from '../Stars.jsx';
import '@testing-library/jest-dom';

describe('Stars module', () => {
  test('Should say true is true', async () => {
    expect(true).toBe(true);
  });

  test('Should render stars to the screen', async () => {
    render(
      <Stars
        ratings={{
          1: '60',
          2: '60',
          3: '60',
          4: '600',
          5: '60',
        }}
        size={20}
        interactive={false}
      />,
    );
    const starsOnScreen = screen.getByText(/★★★★★/i);
    expect(starsOnScreen).toBeVisible();
  });
});
