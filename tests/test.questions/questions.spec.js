/* eslint-env jest */

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
// import App from '../App.jsx';
import Questions from '../../client/src/components/questions/Questions.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
import '@testing-library/jest-dom/';

// test('test', () => {
//   expect(true).toBe(true);
// });

test('nother test', () => {
  render(
    <GlobalContextProvider>
      <Questions />
    </GlobalContextProvider>,
  );
  const title = screen.getByTestId('title');
  expect(title).toBeInTheDocument();
});

//// MOCK

jest.mock('axios');

describe('Overview component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/qa/questions/?product_id=40344') {
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

  afterEach(cleanup);

  describe('Product overview and description', () => {
    beforeEach(async () => {
      const mockProductID = 40344;
      await act(() => {
        render(
          <GlobalContextProvider value={{ productID: mockProductID }}>
            {/* <OverviewContextProvider> */}
            <Questions />
            {/* </OverviewContextProvider> */}
          </GlobalContextProvider>,
        );
      });
    });
    it('should render question body', () => {
      expect(screen.getByText('Why is this product cheaper here than other sites?')).toBeInTheDocument();
    });
  });
});

// END MOCK






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
      // if (url === '/products/40450/styles') {
      //   return Promise.resolve({
      //     data: {
      //       product_id: '40450',
      //       results: [{
      //         style_id: 240910,
      //         name: 'Purple',
      //         original_price: '873.00',
      //         sale_price: '668.00',
      //         default: true,
      //         photos: [
      //           {
      //             thumbnail_url: 'https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      //             url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
      //           },
      //         ],
      //         skus: {
      //           1397049: {
      //             quantity: 15,
      //             size: 'XS',
      //           },
      //           1397050: {
      //             quantity: 15,
      //             size: 'S',
      //           },
      //           1397051: {
      //             quantity: 51,
      //             size: 'M',
      //           },
      //         },
      //       },
      //       ],
      //     },
      //   });
      // }
  //     return Promise.reject(new Error('Mock axios GET failed'));
  //   });
  // });

  // afterEach(cleanup);

  // describe('Product overview and description', () => {
  //   beforeEach(async () => {
  //     const mockProductID = 40344;
  //     await act(() => {
  //       render(
  //         <GlobalContextProvider value={{ productID: mockProductID }}>
  //           {/* <OverviewContextProvider> */}
  //           <Questions />
  //           {/* </OverviewContextProvider> */}
  //         </GlobalContextProvider>,
  //       );
  //     });
  //   });
  //   it('should render question body', () => {
  //     expect(screen.getByText('Why is this product cheaper here than other sites?')).toBeInTheDocument();
  //   });

    // it('should render product name', () => {
    //   expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
    // });

    // it('should render product price', () => {
    //   expect(screen.getByText('873.00')).toBeInTheDocument();
    // });

    // it('should render product slogan', () => {
    //   expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
    // });

    // it('should render product description', () => {
    //   expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
    // });

    // it('should render product features', () => {
    //   expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
    // });
//   });
// });
// END MOCJK



// test("Validate something", async () => {
//   const {container} = render(<MyComponent url={url} />);
//   await waitFor(() => expect(container.getElementsByClassName('someGrid').length).toBe(2));
// });
// import App from '../../client/src/components/App.jsx';
// // import Questions from '../../client/src/components/questions/Questions.jsx';

// describe('Question Component', () => {
// // Test 1
//   it('renders Questions from App', () => {
//     render(<App />); // Rendering the App
//     // const button = screen.getByTestId('moreQuestions');
//     // expect(button).toBeInTheDocument();
//     expect(screen.getByText('Questions & Answers')).toBeInTheDocument();
//   });
// });
