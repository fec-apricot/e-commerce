// /* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import QuestionListEntry from '../QuestionList.jsx';
import { GlobalContextProvider } from '../../GlobalContext.jsx';
import '@testing-library/jest-dom/';

// afterEach(cleanup);

// describe('Questions Component', () => {
//   beforeEach(async () => {
//     const mockProductID = 40344;
//     const mockQuestion = {
//       question_id: 645217,
//       question_body: "test",
//       question_date: "2023-02-21T00:00:00.000Z",
//       asker_name: "afg",
//       question_helpfulness: 0,
//       reported: false,
//       answers: {},
//     };
//     await (() => {
//       render(
//         <GlobalContextProvider value={{ productID: mockProductID }}>
//           <QuestionListEntry question={mockQuestion} />
//         </GlobalContextProvider>,
//       );
//     });
//   });
//   it('should render a helpful button', () => {
//     screen.debug();
//     screen.logTestingPlaygroundURL();
//     const helpBtn = screen.getByTestId('helpBtn');
//     expect(helpBtn).toBeInTheDocument();
//   });

//   it('should render a Add an Answer button', () => {
//     const addAnswer = screen.getByTestId('addAnswer');
//     expect(addAnswer).toBeInTheDocument();
//   });
// });
