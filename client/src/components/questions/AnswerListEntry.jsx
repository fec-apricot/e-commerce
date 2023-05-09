import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from '../../parse';

function AnswerListEntry({ answer }) {
  return (
    <div>
      <br />
      A:&ensp;
      {answer.body}
      <div>
        by&nbsp;
        {answer.answerer_name}
        ,
        &nbsp;
        {new Date(answer.date).toString().slice(4, 15)}
        &emsp;|&emsp; helpful?&ensp;
        <button type="button">Yes</button>
        &nbsp;
        {answer.helpfulness}
        &emsp;|&emsp;
        <button type="button">Report</button>
      </div>
      <br />
    </div>
  );
}

export default AnswerListEntry;
