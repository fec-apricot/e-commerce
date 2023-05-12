import React, { useEffect, useState } from 'react';
import parse from '../../parse';
// import { GlobalContext } from '../GlobalContext.jsx';
import AnswerListEntry from './AnswerListEntry.jsx';
import AnswerForm from './AnswerForm.jsx';
import './questions.css';

function QuestionListEntry({ question }) {
  // const { productID } = useContext(GlobalContext);
  const [answers, setAnswers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  // const [helpCount, setHelpCount] = useState(0);
  // console.log('I AM A QUESTION', question)

  useEffect(() => {
    parse.get(`/qa/questions/${question.question_id}/answers`)
      .then((data) => setAnswers(data.results))
      .catch((err) => console.log(err));
  },[question.question_id]);

  // setAnswers(question.answers)
  // console.log('I AM ANSWERS', answers);
  // console.log('I AM A QUESTION ID', question.question_id)

  const updateHelp = (event) => {
    event.preventDefault();
    parse.put(`qa/questions/${question.question_id}/helpful`, {
      helpfulness: question.question_helpfulness + 1,
    })
      .then(() => console.log('I am helpful'))
      .catch((err) => console.log('I did not update helpfulnerss', err));
  };

  return (
    <div>
      <section>
        <span className="questionList">
          Q:&ensp;
          <span className="qbody">{question.question_body}</span>

        </span>
        <span className="navQ">
          Helpful?&ensp;
          <button
            type="button"
            className="Btn"
            onClick={(event) => updateHelp(event)}
          >
            Yes
          </button>
          &nbsp;
          {question.question_helpfulness}
          &emsp;|&emsp;
          <button type="button" className="Btn" onClick={() => setOpenForm(true)}>Add Answer</button>
          {openForm && <AnswerForm setOpenForm={setOpenForm} question={question} />}
        </span>
        <div>
          {answers.slice(0, 2).map((answer, i) => <AnswerListEntry key={i} answer={answer} />)}
        </div>
        <br />
      </section>
    </div>
  );
}

export default QuestionListEntry;
