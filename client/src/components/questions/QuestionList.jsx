import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

function QuestionList({ questions }) {
  return (
    <div className="question-list-section">
      {questions.map((question) => <QuestionListEntry key={question} question={question} />)}
    </div>
  );
}

export default QuestionList;
