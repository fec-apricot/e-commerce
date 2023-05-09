import React from 'react';
import styled from 'styled-components';
import QuestionListEntry from './QuestionListEntry.jsx';
// import PropTypes from 'prop-types';

function QuestionList({questions}) {
  return (
    <div>
      {questions.map((question, i) => <QuestionListEntry key={i} question={question} />)}
    </div>
  );
}

// QuestionList.proptype = {
//   questions: PropTypes.Array
// }

export default QuestionList;
