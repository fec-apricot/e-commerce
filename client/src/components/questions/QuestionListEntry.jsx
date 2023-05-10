import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import parse from '../../parse';
import AnswerListEntry from './AnswerListEntry.jsx';
import './questions.css';

function QuestionListEntry({question}) {
  const [answers, setAnswers] = useState([]);
  // const [helpCount, setHelpCount] = useState({question.question_helpfulness});
  // console.log('I AM A QUESTION', question)

  useEffect(() => {
    parse.get(`/qa/questions/${question.question_id}/answers`)
      .then((data) => setAnswers(data.results))
      .catch((err) => console.log(err));
  },[]);

  // setAnswers(question.answers)
  console.log('I AM ANSWERS', answers);

  // const ContainerDiv = styled.div`
  //   width: 500px
  //   `;

  // const ContainerQ = styled.span`
  //   display: flex;
  //   justify-content: flex-end;
  //   `;

  return (
    <div>
      <section>
        <span className="questionList">
          Q:&ensp;
          {question.question_body}
        </span>
        <span className="navQ">
          Helpful?&ensp;
          <button type="button" className="Btn">Yes</button>
          &nbsp;
          {question.question_helpfulness}
          &emsp;|&emsp;
          <button type="button" className="Btn">Add Answer</button>
        </span>
        <div>
          {answers.map((answer, i) => <AnswerListEntry key={i} answer={answer} />)}
        </div>
        <br />
      </section>
    </div>
  );
}

export default QuestionListEntry;
