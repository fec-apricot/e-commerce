import React, { useEffect, useContext, useState } from 'react';
import parse from '../../parse';
import { GlobalContext } from '../GlobalContext.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import './questions.css';
const axios = require('axios');

function Questions() {
  const { productID } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    parse.get(`/qa/questions/?product_id=${productID}&page=1&count=100`)
      .then((data) => setQuestions(data.results.slice(0, 4)))
      .catch((err) => console.log(err));
  }, [productID]);

  // useEffect(() => {
  //   const getData = () => {
  //     parse.get(`/qa/questions/?product_id=${productID}&page=${pageNum}&count=100`)
  //       .then((data) => {
  //         setQuestions([...data.results]);
  //         setPageNum(pageNum + 1);
  //       });
  //   };
  //   getData();
  // }, [productID]);

  // console.log('I AM THE QUESTIONS', questions);

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
