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
