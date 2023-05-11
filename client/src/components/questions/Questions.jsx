import React, { useEffect, useContext } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import './questions.css';

function Questions() {
  const { productID } = useContext(GlobalContext);
  const [questions, setQuestions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    parse.get(`/qa/questions/?product_id=${productID}&page=30&count=4`)
      .then((data) => setQuestions(data.results))
      .catch((err) => console.log(err));
  }, [productID]);
  console.log('I AM THE QUESTIONS', questions);

  return (
    <div className="body">
      <div className="head" title="My Header" data-testid="title">QUESTIONS & ANSWERS</div>
      <br />
      <Search />
      <br />
      <QuestionList questions={questions} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <button type="button" className="mainBtn">MORE ANSWERED QUESTIONS</button>
        &emsp;
        <button type="button" className="mainBtn" onClick={() => setIsOpen(true)}>
          ADD A QUESTION +
        </button>
      </div>
      {isOpen && <QuestionForm setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Questions;
