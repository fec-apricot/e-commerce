import React, { useState } from 'react';
import parse from '../../parse';
import './questions.css';

function AnswerListEntry({ answer }) {
  const [text, setText] = useState('Report');
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  console.log('I AM HELPFUL', answer);

  function changeText(event) {
    event.preventDefault();
    setText('Reported');
  }

  const updateHelpful = (event) => {
    event.preventDefault();
    setHelpfulness(helpfulness + 1);
    parse.put(`qa/answers/${answer.answer_id}/helpful`, {
      helpfulness: answer.helpfulness + 1,
    })
      .then(() => console.log('I am helpful'))
      .catch((err) => console.log('I did not update helpfulness', err));
  };

  return (
    <div>
      <br />
      <span className="answerList">A:</span>
      &ensp;
      <span className="answerText">{answer.body}</span>
      <div className="navA">
        by&nbsp;
        {answer.answerer_name}
        ,&nbsp;
        {new Date(answer.date).toString().slice(4, 15)}
        &emsp;|&emsp; Helpful?
        <button type="button" className="Btn" data-testid="help" onClick={(event) => updateHelpful(event)}>Yes</button>
        &#40;
        {helpfulness}
        &#41;
        &emsp;|&emsp;
        <button onClick={(event) => changeText(event)} type="button" className="Btn" data-testid="report">{text}</button>
      </div>
    </div>
  );
}

export default AnswerListEntry;
