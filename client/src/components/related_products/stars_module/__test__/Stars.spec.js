/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stars from '../Stars.jsx';
import SingleStar from '../SingleStar.jsx';
import '@testing-library/jest-dom';

describe('Stars module (Non-Interactive)', () => {
  it('Should say true is true', async () => {
    expect(true).toBe(true);
  });

  beforeEach(() => {
    render(
      <Stars
        ratings={{
          1: '0',
          2: '0',
          3: '0',
          4: '0',
          5: '1',
        }}
        size={20}
        interactive={false}
        cb={() => {}}
      />,
    );
  });

  it('Should render stars to the screen', async () => {
    const starIcons = screen.getByText(/★★★★★/i);
    expect(starIcons).toBeVisible();
  });

  it('Should find element with data-testid rendered on the screen', async () => {
    const starsDiv = screen.getByTestId(/theStars/i);
    expect(starsDiv).toBeInTheDocument();
  });

  it('Should have correct percentage stored in css variable', async () => {
    const starsDiv = screen.getByTestId(/theStars/i);
    expect(starsDiv).toHaveStyle('--ratings: 100%');
  });
});

describe('Stars module (Interactive)', () => {
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

  it('Should not update classNames of stars higher than hovered star', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    const secondStar = screen.getByTestId(/star2/i);
    fireEvent.mouseOver(secondStar);
    expect(fourthStar.classList.contains('gold')).toBe(false);
  });

  it('Should keep classNames when clicked', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    fireEvent.mouseOver(fourthStar);
    fireEvent.click(fourthStar);
    fireEvent.mouseLeave(fourthStar);
    expect(fourthStar.classList.contains('gold')).toBe(true);
  });

  it('Should update update selection when new star is clicked', async () => {
    const fourthStar = screen.getByTestId(/star4/i);
    const secondStar = screen.getByTestId(/star2/i);
    fireEvent.click(fourthStar);
    expect(fourthStar.classList.contains('gold')).toBe(true);
    fireEvent.click(secondStar);
    expect(fourthStar.classList.contains('gold')).toBe(false);
  });
});

describe('SingleStar module', () => {
  beforeEach(() => {
    const gold = true;
    render(
      <SingleStar
        gold={gold}
        size={20}
        i={1}
      />,
    );
  });

  it('Should update stars classNames when hovered', async () => {
    const star = screen.getByTestId(/star1/i);
    expect(star.classList.contains('gold')).toBe(true);
  });
});
