import React from 'react';
import QuestionListEntry from './QuestionListEntry.jsx';

function QuestionList({ questions }) {
  return (
    <div className="question-list-section">
      {questions.map((question, i) => <QuestionListEntry key={i} question={question} />)}
    </div>
  );
}

export default QuestionList;
