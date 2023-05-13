import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import parse from '../../parse';
import './questions.css';

function AnswerListEntry({ answer }) {
  const [text, setText] = useState('Report');
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  function changeText() {
    setText('Reported');
  }


  const updateHelpful = (event) => {
    event.preventDefault();
    setHelpfulness(helpfulness + 1);
    parse.put(`qa/answers/${answer.id}/helpful`, {
      helpfulness: answer.helpfulness + 1,
    })
      .then(() => console.log('I am helpful'))
      .catch((err) => console.log('I did not update helpfulnerss', err));
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
        &emsp;|&emsp; Helpful?&ensp;
        <button type="button" className="Btn" onClick={(event) => updateHelpful(event)}>Yes</button>
        &nbsp;
        {helpfulness}
        &emsp;|&emsp;
        <button onClick={() => changeText()} type="button" className="Btn">{text}</button>
      </div>
      <br />
    </div>
  );
}

export default AnswerListEntry;
