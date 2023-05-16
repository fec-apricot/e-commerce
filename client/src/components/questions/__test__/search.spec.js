// /* eslint-env jest */

import React from 'react';
import {
  render, screen, cleanup, act, fireEvent,
} from '@testing-library/react';
import Search from '../Search.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('QuestionForm Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const setQuestions = () => {};
    const allQuestions = [
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
          <Search setQuestions={setQuestions} allQuestions={allQuestions} />
        </GlobalContextProvider>,
      );
    });
  });

  it('should render a submit button', () => {
    const button = screen.getByTestId('search');
    expect(button).toBeInTheDocument();
  });

  it('should test for change', () => {
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });

  it('should not clear input bar on submit', () => {
    const button = screen.getByTestId('search');
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
    fireEvent.click(button);
    expect(input.value).toBe('hello world');
  });
});
