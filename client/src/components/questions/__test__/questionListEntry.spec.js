// /* eslint-env jest */

import React from 'react';
import {
  render, screen, cleanup, act, fireEvent,
} from '@testing-library/react';
import QuestionListEntry from '../QuestionListEntry.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('Questions Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const question = {
      question_id: 645217,
      question_body: 'test',
      question_date: '2023-02-21T00:00:00.000Z',
      asker_name: 'afg',
      question_helpfulness: 0,
      reported: false,
      answers: {},
    };
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <QuestionListEntry question={question} />
        </GlobalContextProvider>,
      );
    });
  });
  it('should have a list of Questions', () => {
    screen.debug();
    screen.logTestingPlaygroundURL();
    const helpBtn = screen.getAllByText(/Q:/);
    expect(helpBtn[0]).toBeInTheDocument();
  });

  it('should render a helpful button', () => {
    screen.debug();
    screen.logTestingPlaygroundURL();
    const helpBtn = screen.getByTestId('helpBtn');
    expect(helpBtn).toBeInTheDocument();
  });

  it('should render a Add an Answer button', () => {
    const addAnswer = screen.getByTestId('addAnswer');
    expect(addAnswer).toBeInTheDocument();
  });

  it('should increment the helpfulness count', () => {
    const button = screen.getByTestId('helpBtn');
    expect(screen.getByText(/0/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});
