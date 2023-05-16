// /* eslint-env jest */

import React from 'react';
import {
  render, screen, act, cleanup,
} from '@testing-library/react';
import Questions from '../Questions.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('Questions Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <Questions />
        </GlobalContextProvider>,
      );
    });
  });
  it('should render title Questions & Answers', () => {
    screen.logTestingPlaygroundURL();
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
  });

  it('should render a more questions button', () => {
    const moreBtn = screen.getByTestId('moreBtn');
    expect(moreBtn).toBeInTheDocument();
  });

  it('should render an Add a Question button', () => {
    const addBtn = screen.getByTestId('addBtn');
    expect(addBtn).toBeInTheDocument();
  });
});
