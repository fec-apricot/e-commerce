import React, { useEffect, useContext } from 'react';
// import styled from 'styled-components';
import parse from '../../parse';
// import { ProductIDContext } from '../App.jsx';
import { GlobalContext } from '../GlobalContext.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import './questions.css';

function Questions() {
  const { productID } = useContext(GlobalContext);
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    parse.get(`/qa/questions/?product_id=${productID}&page=30&count=4`)
      .then((data) => setQuestions(data.results))
      .catch((err) => console.log(err));
  },[]);
  console.log('I AM THE QUESTIONS', questions);

  // const ContainerMain = styled.div`
  //   width: 700px;
  //   padding-left: 20%;
  //   `;

  return (
    <div className="body">
      <div title="My Header">QUESTIONS & ANSWERS</div>
      <br />
      <Search />
      <br />
      <QuestionList questions={questions} />
      <div>
        <button type="button" className="mainBtn">More Answered Questions</button>
        &emsp;
        <button type="button" className="mainBtn">Add Questions +</button>
      </div>
    </div>

  );
}

export default Questions;
