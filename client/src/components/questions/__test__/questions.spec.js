// /* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import Questions from '../Questions.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

jest.mock('axios');

describe('Questions and Answers Tests', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/qa/questions/?page=1&count=4&product_id=40344') {
        return Promise.resolve({
          data: {
            product_id: '5',
            results: [{
              question_id: 37,
              question_body: 'Why is this product cheaper here than other sites?',
              question_date: '2018-10-18T00:00:00.000Z',
              asker_name: 'williamsmith',
              question_helpfulness: 4,
              reported: false,
              answers: {
                68: {
                  id: 68,
                  body: 'We are selling it here without any markup from the middleman!',
                  date: '2018-08-18T00:00:00.000Z',
                  answerer_name: 'Seller',
                  helpfulness: 4,
                  photos: [],
                },
              },
            }],
          },
        });
      }
      return Promise.reject(new Error('Mock axios GET failed'));
    });
  });
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

    it('should render a Add a Question button', () => {
      const addBtn = screen.getByTestId('addBtn');
      expect(addBtn).toBeInTheDocument();
    });
  });
});
