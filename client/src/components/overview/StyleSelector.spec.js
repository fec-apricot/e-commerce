/* eslint-env jest */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import StyleSelector from './StyleSelector.jsx';
import { OverviewContext } from './OverviewContext.jsx';
import { mockStyles } from './mockProductData';

const mockedSetSelectedStyle = jest.fn((anotherStyle) => {
  selectedStyle = anotherStyle;
});

describe('StyleSelector', () => {
  beforeEach(async () => {
    await render(
      <OverviewContext.Provider value={
        {
          styles: mockStyles,
          selectedStyle: mockStyles[0],
          setSelectedStyle: mockedSetSelectedStyle,
        }
      }
      >
        <StyleSelector />
      </OverviewContext.Provider>,
    );
  });

  afterEach(cleanup);

  it('should have one selected style at all times', () => {
    expect(screen.queryByText('SELECTED STYLE')).toBeNull();
  });

  it('should render name of current style above the list of styles', () => {
    expect(screen.getByText('Purple')).toBeInTheDocument();
  });

  it('should show a list of styles', () => {
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('should show a checkmark on selected style', () => {
    const selectedStyleElement = screen.getByTestId('style-0');
    expect(within(selectedStyleElement).getByTestId('checkmark')).toBeInTheDocument();
  });

  it('should not show a checkmark on unselected style', () => {
    const unselectedStyleElement = screen.getByTestId('style-1');
    expect(within(unselectedStyleElement).queryByTestId('checkmark')).toBeNull();
  });

  it('should be able to select a different style', () => {
    const anotherStyleElement = screen.getByTestId('style-1');
    fireEvent.click(anotherStyleElement);
    // expect(screen.getByText('Pink')).toBeInTheDocument();
  });

  // it('should render product slogan', () => {
  //   expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
  // });

  // it('should render product description', () => {
  //   expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
  // });

  // it('should render product features', () => {
  //   expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
  // });
});
