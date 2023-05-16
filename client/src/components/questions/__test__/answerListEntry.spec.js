// /* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act, fireEvent } from '@testing-library/react';
import AnswerListEntry from '../AnswerListEntry.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('Questions Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const mockAnswer = {
      answer_id: 8,
      body: "What a great question!",
      date: "2018-01-04T00:00:00.000Z",
      answerer_name: "metslover",
      helpfulness: 8,
      photos: [],
    };
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <AnswerListEntry answer={mockAnswer} />
        </GlobalContextProvider>,
      );
    });
  });
  it('should render a helpful button', () => {
    screen.debug();
    screen.logTestingPlaygroundURL();
    const helpBtn = screen.getAllByText(/Yes/i);
    expect(helpBtn[0]).toBeInTheDocument();
  });

  it('should render a Add an Answer button', () => {
    const report = screen.getAllByText(/Report/i);
    expect(report[0]).toBeInTheDocument();
  });

  it('should trigger click event', () => {
    const button = screen.getByTestId('report');
    expect(button.textContent).toBe('Report');
    fireEvent.click(button);
    expect(button.textContent).toBe('Reported');
  });

  it('should incement the helpfulness count', () => {
    const button = screen.getByTestId('help');
    expect(screen.getByText(/0/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});
