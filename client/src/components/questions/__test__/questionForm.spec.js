// /* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act, fireEvent } from '@testing-library/react';
import QuestionForm from '../QuestionForm.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

afterEach(cleanup);

describe('QuestionForm Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    await act(() => {
      render(
        <GlobalContextProvider value={{ productID: mockProductID }}>
          <QuestionForm />
        </GlobalContextProvider>,
      );
    });
  });
  it('should render a title, Have A Question?', () => {
    screen.debug();
    screen.logTestingPlaygroundURL();
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
});
