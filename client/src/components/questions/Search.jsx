import React from 'react';
// import styled from 'styled-components';
import './questions.css';

function Search() {
  return (
    <div>
      <form className="form">
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="search" />
        <button type="submit" className="searchBttn"><i className="fa fa-search" /></button>
      </form>
    </div>
  );
}

export default Search;
