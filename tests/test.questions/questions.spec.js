/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Questions from '../../client/src/components/questions/Questions.jsx';
import { GlobalContextProvider } from '../../client/src/components/GlobalContext.jsx';
// import Questions from '../../client/src/components/questions/Questions.jsx';
import '@testing-library/jest-dom/';

test('render title', async () => {
  render(
    <GlobalContextProvider>
      <Questions />
    </GlobalContextProvider>
  );
  const linkElement = screen.getByText(/More Answered Questions/);
  expect(linkElement).toBeInDocument();
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
