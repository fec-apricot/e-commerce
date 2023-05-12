import React, { useState } from 'react';
import './questions.css';

function Search({ setQuestions, allQuestions, setAllQuestions }) {
  const [query, setQuery] = useState('');

  const searchButton = (event) => {
    event.preventDefault();
    setQuestions(allQuestions.filter((question) => {
      console.log('SEARCH CLICK', question)
      if (question.question_body.split(' ').includes(query)) {
        return question;
      }
    }));
    // return setQuestions(allQuestions.slice(0, 4));
  };

  return (
    <div>
      <form className="form">
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="search" onChange={(event) => setQuery(event.target.value)} />
        <button type="submit" className="searchBttn" onClick={(event) => searchButton(event)}><i className="fa fa-search fa-xl" /></button>
      </form>
    </div>
  );
}

export default Search;
