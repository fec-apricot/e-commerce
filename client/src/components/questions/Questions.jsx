import React, { useEffect, useContext } from 'react';
import parse from '../../parse';
import { ProductIDContext } from '../App.jsx';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';

function Questions() {
  const { productID } = useContext(ProductIDContext);
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    parse.get(`/qa/questions/?product_id=${productID}&page=30&count=4`)
      .then((data) => setQuestions(data.results))
      .catch((err) => console.log(err));
  },[]);
  console.log('I AM THE QUESTIONS', questions);

  return (
    <div>
      <div>HEllo Questions & Answers!!</div>
      <br></br>
      <Search />
      <br></br>
      <QuestionList questions={questions} />
      <div>
        <button type="button">More Answered Questions</button>
        <button type="button">Add Questions +</button>
      </div>

    </div>

  );
}

export default Questions;
