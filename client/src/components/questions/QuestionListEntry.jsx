import React, { useEffect, useState } from 'react';
import parse from '../../parse';
import AnswerListEntry from './AnswerListEntry.jsx';

function QuestionListEntry({question}) {
  const [answers, setAnswers] = useState([]);
  // console.log('I AM A QUESTION', question)

  useEffect(() => {
    parse.get(`/qa/questions/${question.question_id}/answers`)
      .then((data) => setAnswers(data.results))
      .catch((err) => console.log(err));
  },[]);

  // setAnswers(question.answers)
  console.log('I AM ANSWERS', answers);

  return (
    <div>
      <section>
        helpful?&ensp;
        <button type="button">Yes</button>
        &nbsp;
        {question.question_helpfulness}
        &emsp;|&emsp;
        <button type="button">Add Answer</button>
        <div>
          Q:&ensp;
          {question.question_body}
          {answers.map((answer, i) => <AnswerListEntry key={i} answer={answer} />)}
        </div>
        <br></br>
      </section>
    </div>
  );
}

export default QuestionListEntry;
