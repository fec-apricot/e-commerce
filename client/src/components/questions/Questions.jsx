import React from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';

function Questions({productID}) {
  const [questions, setQuestions] = React.useState([]);
  return (
    <div>
      <div>HEllo Questions & Answers!!</div>

      <Search />
      <QuestionList questions={questions} />
      <div>
        <button>More Answered Questions</button>
        <button>Add Questions +</button>
      </div>

    </div>

  );
}

export default Questions;
