// /* eslint-env jest */

import React from 'react';
import {
  render, screen, cleanup, act, fireEvent,
} from '@testing-library/react';
import QuestionForm from '../QuestionForm.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('QuestionForm Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const setIsOpen = () => false;
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <QuestionForm setIsOpen={setIsOpen} />
        </GlobalContextProvider>,
      );
    });
  });
  it('should render a title, Have A Question?', () => {
    screen.debug();
    // screen.logTestingPlaygroundURL();
    const title = screen.getByText(/Have A Question/i);
    expect(title).toBeInTheDocument();
  });

  it('should render an input field for questions', () => {
    const questionField = screen.getByText(/Your Question/i);
    expect(questionField).toBeInTheDocument();
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

  it('should render a Add a Question button', () => {
    const cancel = screen.getByTestId('cancel');
    expect(cancel).toBeInTheDocument();
  });

  it('should render a more questions form', () => {
    const form = screen.getByTestId('questionForm');
    expect(form).toBeInTheDocument();
  });

  it('should not submit without input fields filled in', () => {
    const button = screen.getByTestId('submit');
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/Submit/)).toBeVisible();
  });

  it('should not submit without input fields filled in', () => {
    const button = screen.getByTestId('submit');
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/Submit/)).toBeVisible();
  });

  it('should test for change', () => {
    const input = screen.getByTestId('input1');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });

  it('should test for change', () => {
    const input = screen.getByTestId('input2');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });

  it('should test for change', () => {
    const input = screen.getByTestId('input3');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');
  });
});
