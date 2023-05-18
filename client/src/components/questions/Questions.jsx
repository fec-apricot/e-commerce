import React, { useEffect, useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import './questions.css';

function Questions() {
  const { productID } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    parse.get(`/qa/questions/?product_id=${productID}&page=1&count=100`)
      .then((data) => {
        setAllQuestions(data.results);
        setQuestions(data.results.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, [productID]);

  return (
    <div className="body">
      {/* <div className="head" title="My Header" data-testid="title">QUESTIONS & ANSWERS</div> */}
      {/* <br /> */}
      <Search
        setQuestions={setQuestions}
        allQuestions={allQuestions}
        setAllQuestions={setAllQuestions}
      />
      <br />
      <QuestionList questions={questions} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <button type="button" className="mainBtn" data-testid="moreBtn" onClick={() => setQuestions(allQuestions.slice(0, questions.length + 2))}>MORE ANSWERED QUESTIONS</button>
        &emsp;

        <button type="button" className="mainBtn" data-testid="addBtn" onClick={() => setIsOpen(true)}>
          ADD A QUESTION &ensp;+
        </button>
      </div>
      {isOpen && <QuestionForm setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Questions;
