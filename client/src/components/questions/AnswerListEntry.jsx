import React, { useEffect, useState } from 'react';
import parse from '../../parse';

function AnswerListEntry({ answer }) {
  return (
    <div>
      <br></br>
      A.&ensp;
      {answer.body}
      <div>
        by {answer.answerer_name},&nbsp; {new Date(answer.date).toString().slice(4, 15)}
        &emsp;|&emsp; helpful?&ensp;
        <button type="button">Yes</button>
        &nbsp;
        {answer.helpfulness}
        &emsp;|&emsp;
        <button type="button">Report</button>
      </div>
      <br></br>
    </div>


  );
}

export default AnswerListEntry;
