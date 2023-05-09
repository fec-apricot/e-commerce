import React from 'react';
// import styled from 'styled-components';
import Star from './SingleStar.jsx';
import './Stars.css';

function Stars() {
  return (
    <div className="starsDiv">
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="liStar">
          <Star />
        </li>
      ))}
    </div>
  );
}

export default Stars;
