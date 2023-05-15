// /* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import QuestionList from '../QuestionList.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

// jest.mock('axios');

// describe('Questions and Answers Tests', () => {
//   beforeEach(() => {
//     axios.get.mockImplementation((url) => {
//       if (url === '/qa/questions/?page=1&count=4&product_id=40344') {
//         return Promise.resolve({
//           data: {
//             product_id: '5',
//             results: [{
//               question_id: 37,
//               question_body: 'Why is this product cheaper here than other sites?',
//               question_date: '2018-10-18T00:00:00.000Z',
//               asker_name: 'williamsmith',
//               question_helpfulness: 4,
//               reported: false,
//               answers: {
//                 68: {
//                   id: 68,
//                   body: 'We are selling it here without any markup from the middleman!',
//                   date: '2018-08-18T00:00:00.000Z',
//                   answerer_name: 'Seller',
//                   helpfulness: 4,
//                   photos: [],
//                 },
//               },
//             }],
//           },
//         });
//       }
//       if (url === '/qa/questions/?question_id=37/answers') {
//         return Promise.resolve({
//           data: {
//             question: '1',
//             page: 0,
//             count: 5,
//             results: [
//               {
//                 answer_id: 8,
//                 body: 'What a great question!',
//                 data: '2018-01-04T00:00:00.000Z',
//                 answerer_name: 'metslover',
//                 helpfulness: 8,
//                 photos: [],
//               }],
//           },
//         });
//       }
//       return Promise.reject(new Error('Mock axios GET failed'));
//     });
//   });

// });
afterEach(cleanup);

describe('Questions Component', () => {
  beforeEach(async () => {
    const mockProductID = 40344;
    const mockQuestions = [
      {
        question_id: 645217,
        question_body: "test",
        question_date: "2023-02-21T00:00:00.000Z",
        asker_name: "afg",
        question_helpfulness: 0,
        reported: false,
        answers: {}
      },
      {
        question_id: 645216,
        question_body: "hjh",
        question_date: "2023-02-21T00:00:00.000Z",
        asker_name: "afg",
        question_helpfulness: 0,
        reported: false,
        answers: {}
      },
      {
        question_id: 644189,
        question_body: "If you see this text me at 9257867239",
        question_date: "2022-12-03T00:00:00.000Z",
        asker_name: "Jeff",
        question_helpfulness: 0,
        reported: false,
        answers: {}
      },
      {
        question_id: 644188,
        question_body: "If you see this text me at 9257867239",
        question_date: "2022-12-03T00:00:00.000Z",
        asker_name: "Jeff",
        question_helpfulness: 0,
        reported: false,
        answers: {}
      },
    ];
    await (() => {
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
    const helpBtn = screen.getByTestId('helpBtn');
    expect(helpBtn).toBeInTheDocument();
  });

  it('should render a Add an Answer button', () => {
    const addAnswer = screen.getByTestId('addAnswer');
    expect(addAnswer).toBeInTheDocument();
  });
});
