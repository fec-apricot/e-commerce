/* eslint-env jest */

import { render, screen } from '@testing-library/react';


import React from 'react';
import { render, screen } from '@testing-library/react';
import Questions from '../Questions.jsx';
// import Questions from '../../client/src/components/questions/Questions.jsx';

test('render title', async () => {
  render(<Questions title="my header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});








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
