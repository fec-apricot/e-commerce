import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from '../../parse';

function AnswerListEntry({ answer }) {
  return (
    <div>
      <br />
      <span className="answerList">A:</span>
      &ensp;
      <span className="answerText">{answer.body}</span>
      <br />
      <div className="navA">
        by&nbsp;
        {answer.answerer_name}
        ,
        &nbsp;
        {new Date(answer.date).toString().slice(4, 15)}
        &emsp;|&emsp; Helpful?&ensp;
        <button type="button" className="Btn">Yes</button>
        &nbsp;
        {answer.helpfulness}
        &emsp;|&emsp;
        <button type="button" className="Btn">Report</button>
      </div>
      <br />
    </div>
  );
}

export default AnswerListEntry;
