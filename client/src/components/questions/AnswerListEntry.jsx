import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import parse from '../../parse';
import './questions.css';

function AnswerListEntry({ answer }) {
  const [text, setText] = useState('Report')

  function changeText() {
    setText('Reported');
  }

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
        <button type="button" className="Btn">Yes</button>
        &nbsp;
        {answer.helpfulness}
        &emsp;|&emsp;
        <button onClick={() => changeText()} type="button" className="Btn">{text}</button>
      </div>
      <br />
    </div>
  );
}

export default AnswerListEntry;
