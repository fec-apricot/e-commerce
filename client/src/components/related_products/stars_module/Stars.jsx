import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import Star from './SingleStar.jsx';
import './Stars.css';

function Stars({ rating, interactive }) {
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const computeRating = () => {
    console.log('this is the rating------>', rating);
    console.log('and this is interactive', interactive);
    let total = 0;
    let totalVotes = 0;
    for (let i = 1; i < 6; i += 1) {
      totalVotes += Number(rating[i]);
      total += rating[i] * i;
    }
    console.log('totalVotes', totalVotes);
    console.log('total', total);
    console.log('totalVotes / total', (total / totalVotes).toFixed(2));
    setScore((total / totalVotes).toFixed(2));
    setPercentage(((total / totalVotes) / 5).toFixed(2));
  };

  useEffect(() => {
    computeRating();
  }, [rating]);

  if (interactive) {
    return (
      <div className="starsDiv">
        {[1, 2, 3, 4, 5].map((i) => (
          <li
            key={i}
            className="liStar"
            onMouseEnter={() => setHoveredStar(i)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            <Star gold={i <= hoveredStar} />
          </li>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="starsDiv">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="liStar">
            <Star gold={false} />
          </span>
        ))}
      </div>
      <div className="goldStarsDiv">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="spanGoldStar">
            <Star gold={true} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Stars;
