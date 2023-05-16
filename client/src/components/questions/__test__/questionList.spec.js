// /* eslint-env jest */

import React from 'react';
import {
  render, screen, cleanup, act,
} from '@testing-library/react';
import QuestionList from '../QuestionList.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('Questions Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const mockQuestions = [
      {
        question_id: 645217,
        question_body: 'test',
        question_date: '2023-02-21T00:00:00.000Z',
        asker_name: 'afg',
        question_helpfulness: 0,
        reported: false,
        answers: {},
      },
      {
        question_id: 645216,
        question_body: 'hjh',
        question_date: '2023-02-21T00:00:00.000Z',
        asker_name: 'afg',
        question_helpfulness: 0,
        reported: false,
        answers: {},
      },
      {
        question_id: 644189,
        question_body: 'If you see this text me at 9257867239',
        question_date: '2022-12-03T00:00:00.000Z',
        asker_name: 'Jeff',
        question_helpfulness: 0,
        reported: false,
        answers: {},
      },
      {
        question_id: 644188,
        question_body: 'If you see this text me at 9257867239',
        question_date: '2022-12-03T00:00:00.000Z',
        asker_name: 'Jeff',
        question_helpfulness: 0,
        reported: false,
        answers: {},
      },
    ];
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <QuestionList questions={mockQuestions} />
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
    const addAnswer = screen.getAllByText(/Add Answer/i);
    expect(addAnswer[0]).toBeInTheDocument();
  });
});
