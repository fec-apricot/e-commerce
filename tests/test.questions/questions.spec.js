/* eslint-env jest */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

// jest.mock('axios');

// describe('Overview component', () => {
//   beforeEach(() => {
//     axios.get.mockImplementation((url) => {
//       if (url === '/products/40450') {
//         return Promise.resolve({
//           data: {
//             id: 40450,
//             campus: 'hr-rfp',
//             name: 'Alivia Slacks',
//             slogan: 'Voluptas maiores et dolores harum.',
//             description: 'Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.',
//             category: 'Slacks',
//             default_price: '873.00',
//             created_at: '2021-08-13T14:38:44.588Z',
//             updated_at: '2021-08-13T14:38:44.588Z',
//             features: [
//               {
//                 feature: 'Cut',
//                 value: '\'Striaght\'',
//               },
//             ],
//           },
//         });
//       }
//       if (url === '/products/40450/styles') {
//         return Promise.resolve({
//           data: {
//             product_id: '40450',
//             results: [{
//               style_id: 240910,
//               name: 'Purple',
//               original_price: '873.00',
//               sale_price: '668.00',
//               default: true,
//               photos: [
//                 {
//                   thumbnail_url: 'https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
//                   url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
//                 },
//               ],
//               skus: {
//                 1397049: {
//                   quantity: 15,
//                   size: 'XS',
//                 },
//                 1397050: {
//                   quantity: 15,
//                   size: 'S',
//                 },
//                 1397051: {
//                   quantity: 51,
//                   size: 'M',
//                 },
//               },
//             },
//             ],
//           },
//         });
//       }
//       return Promise.reject(new Error('Mock axios GET failed'));
//     });
//   });

//   afterEach(cleanup);

//   describe('Product overview and description', () => {
//     beforeEach(async () => {
//       const mockProductID = 40450;
//       await act(() => {
//         render(
//           <GlobalContext.Provider value={{ productID: mockProductID }}>
//             <OverviewContextProvider>
//               <Overview />
//             </OverviewContextProvider>
//           </GlobalContext.Provider>,
//         );
//       });
//     });
//     it('should render product category', () => {
//       expect(screen.getByText('Slacks')).toBeInTheDocument();
//     });

//     it('should render product name', () => {
//       expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
//     });

//     it('should render product price', () => {
//       expect(screen.getByText('873.00')).toBeInTheDocument();
//     });

//     it('should render product slogan', () => {
//       expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
//     });

//     it('should render product description', () => {
//       expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
//     });

//     it('should render product features', () => {
//       expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
//     });
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
