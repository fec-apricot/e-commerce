import React from 'react';

function QuestionFrom({ isOpen }) {
  return (
    <div>
      <form>
        <label>Post your question</label>
        <input type="text" placeholder="WHAT CAN WE HELP YOU WITH?"></input>
        <buttton>submit</buttton>
      </form>
    </div>
  );
}

export default QuestionFrom;
