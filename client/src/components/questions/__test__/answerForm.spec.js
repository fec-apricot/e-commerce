// /* eslint-env jest */

import React from 'react';
import {
  render, screen, cleanup, act, fireEvent,
} from '@testing-library/react';
import AnswerForm from '../AnswerForm.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('QuestionForm Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const mockQuestion = {
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
          <AnswerForm question={mockQuestion} />
        </GlobalContextProvider>,
      );
    });
  });
  it('should render a title, Submint your Answer', () => {
    screen.debug();
    screen.logTestingPlaygroundURL();
    const title = screen.getByText(/Submit your Answer/i);
    expect(title).toBeInTheDocument();
  });

  it('should render an input field for answers', () => {
    const answerField = screen.getByText(/Your Answer/);
    expect(answerField).toBeInTheDocument();
  });

  it('should render an input for name', () => {
    const nickname = screen.getByText(/What is your nickname/i);
    expect(nickname).toBeInTheDocument();
  });

  it('should render an input for name', () => {
    const email = screen.getByText(/Your email/i);
    expect(email).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    const submit = screen.getByTestId('submit');
    expect(submit).toBeInTheDocument();
  });

  it('should render cancel button', () => {
    const cancel = screen.getByTestId('cancel');
    expect(cancel).toBeInTheDocument();
  });

  it('should not submit without input fields filled in', () => {
    const button = screen.getByTestId('submit');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toBeVisible();
  });

  it('should test for change on answer field', () => {
    const input = screen.getByTestId('input1');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });

  it('should test for change on name input', () => {
    const input = screen.getByTestId('input2');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });

  it('should test for change on email input', () => {
    const input = screen.getByTestId('input3');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });
});
