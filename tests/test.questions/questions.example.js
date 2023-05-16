// /* eslint-env jest */

// import React from 'react';
// import axios from 'axios';
// import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
// // import App from '../App.jsx';
// import Questions from '../../client/src/components/questions/Questions.jsx';
// import QuestionList from '../../client/src/components/questions/QuestionList.jsx';
// import QuestionListEntry from '../../client/src/components/questions/QuestionListEntry.jsx';
// import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
// import '@testing-library/jest-dom/';

// // test('if the title renders in the component', () => {
// //   render(
// //     <GlobalContextProvider>
// //       <Questions />
// //     </GlobalContextProvider>,
// //   );
// //   const title = screen.getByTestId('title');
// //   expect(title).toBeInTheDocument();
// // });

// // test('test', () => {
// //   expect(true).toBe(true);
// // });

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

//   describe('Questions Component', () => {
//     beforeEach(async () => {
//       const mockProductID = 40344;
//       await act(() => {
//         render(
//           <GlobalContextProvider value={{ productID: mockProductID }}>
//             <Questions />
//           </GlobalContextProvider>,
//         );
//       });
//     });
//     it('should render title Questions & Answers', () => {
//       const title = screen.getByTestId('title');
//       expect(title).toBeInTheDocument();
//     });

//     it('should render a more questions button', () => {
//       const moreBtn = screen.getByTestId('moreBtn');
//       expect(moreBtn).toBeInTheDocument();
//     });

//     it('should render a Add a Question button', () => {
//       const addBtn = screen.getByTestId('addBtn');
//       expect(addBtn).toBeInTheDocument();
//     });
//     it('should render a helpful button', () => {
//       const helpBtn = screen.getByTestId('helpBtn');
//       expect(helpBtn).toBeInTheDocument();
//     });

//     it('should render a Add an Answer button', () => {
//       const addAnswer = screen.getByTestId('addAnswer');
//       expect(addAnswer).toBeInTheDocument();
//     });
//   });

//   describe('Questions Component', () => {
//     beforeEach(async () => {
//       const mockProductID = 40344;
//       await act(() => {
//         render(
//           <GlobalContextProvider value={{ productID: mockProductID }}>
//             <QuestionList />
//           </GlobalContextProvider>,
//         );
//       });
//     });
//     it('should render a helpful button', () => {
//       const helpBtn = screen.getByTestId('helpBtn');
//       expect(helpBtn).toBeInTheDocument();
//     });

//     it('should render a Add an Answer button', () => {
//       const addAnswer = screen.getByTestId('addAnswer');
//       expect(addAnswer).toBeInTheDocument();
//     });
//   });
// });

// describe('QuestionList', () => {
//   test('Should say true is true', async () => {
//     expect(true).toBe(true);
//   });

//   test('Should a list of Questions', async () => {
//     render(
//       <QuestionListEntry />,
//     );
//     const questionList = screen.getByText(/Q:/i);
//     expect(questionList).toBeVisible();
//   });

  // test('Should render stars to the screen', async () => {
  //   render(
  //     <Stars
  //       ratings={{
  //         1: '60',
  //         2: '60',
  //         3: '60',
  //         4: '600',
  //         5: '60',
  //       }}
  //       size={20}
  //       interactive={false}
  //     />,
  //   );
  //   const starsOnScreen2 = screen.getByTestId(/theStars/i);
  //   expect(starsOnScreen2).toBeInTheDocument();
  // });
// });



//// MOCK

// jest.mock('axios');

// describe('Overview component', () => {
//   beforeEach(() => {
//     axios.get.mockImplementation((url) => {
//       if (url === '/qa/questions/?product_id=40344') {
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
//       return Promise.reject(new Error('Mock axios GET failed'));
//     });
//   });

//   afterEach(cleanup);

//   describe('Product overview and description', () => {
//     beforeEach(async () => {
//       const mockProductID = 40344;
//       await act(() => {
//         render(
//           <GlobalContextProvider value={{ productID: mockProductID }}>
//             <Questions />
//           </GlobalContextProvider>,
//         );
//       });
//     });
//     it('should render question body', () => {
//       expect(screen.getByText('Why is this product cheaper here than other sites?')).toBeInTheDocument();
//     });
//   });
// });

// END MOCK
