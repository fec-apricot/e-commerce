/* eslint-env jest */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import App from '../App.jsx';
import Questions from '../../client/src/components/questions/Questions.jsx';
import '@testing-library/jest-dom/';

test('test', () => {
  expect(true).toBe(true);
});

test('nother test', async () => {
  render(
    <Questions />
  );
  const text = await screen.findAllByText(/Q:/i);
  await waitFor(() => expect(text).toHaveLength(4));
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
//     expect(screen.getByText('Questions and Answers')).toBeInTheDocument();
//   });
// });
