/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stars from '../Stars.jsx';
import '@testing-library/jest-dom';

describe('Stars module Non-Interactive', () => {
  it('Should say true is true', async () => {
    expect(true).toBe(true);
  });

  beforeEach(() => {
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
        cb={() => {}}
      />,
    );
  });

  it('Should render stars to the screen', async () => {
    const starsOnScreen = screen.getByText(/★★★★★/i);
    expect(starsOnScreen).toBeVisible();
  });

  it('Should find element with data-testid rendered on the screen', async () => {
    const starsOnScreen = screen.getByTestId(/theStars/i);
    expect(starsOnScreen).toBeInTheDocument();
  });
});

describe('Stars module', () => {
  it('Should say true is true', async () => {
    expect(true).toBe(true);
  });

  beforeEach(() => {
    const yes = true;
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
        interactive={yes}
        cb={() => {}}
      />,
    );
  });

  it('Should update stars classNames when hovered', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    fireEvent.mouseOver(fourthStar);
    expect(fourthStar.classList.contains('gold')).toBe(true);
  });

  it('Should update classNames when hovered', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    const secondStar = screen.getByTestId(/star2/i);
    fireEvent.mouseOver(fourthStar);
    expect(secondStar.classList.contains('gold')).toBe(true);
  });

  it('Should update classNames when hovered', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    const secondStar = screen.getByTestId(/star2/i);
    fireEvent.mouseOver(secondStar);
    expect(fourthStar.classList.contains('gold')).toBe(false);
  });
});
