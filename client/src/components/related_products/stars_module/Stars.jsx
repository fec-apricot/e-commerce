import React, { useState, useEffect } from 'react';
import Star from './SingleStar.jsx';
import './Stars.css';

function Stars({ ratings, size, interactive }) {
  const [percentage, setPercentage] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const computeRating = () => {
    console.log('this is the ratings------>', ratings);
    console.log('and this is interactive', interactive);
    let total = 0;
    let totalVotes = 0;
    for (let i = 1; i < 6; i += 1) {
      totalVotes += Number(ratings[i]);
      total += ratings[i] * i;
    }
    console.log('totalVotes', totalVotes);
    console.log('total', total);
    console.log('totalVotes / total, score:', (total / totalVotes).toFixed(2));
    console.log('(totalVotes / total) / 5, percentage:', ((total / totalVotes) / 5).toFixed(2) * 100);

    const percent = new Intl.NumberFormat('en-US', { style: 'percent' }).format((total / totalVotes) / 5);
    console.log('and now this is percent', percent);
    setPercentage(percent);
  };

  useEffect(() => {
    computeRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  if (interactive) {
    return (
      <div className="starsDiv">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="spanStar"
            onMouseEnter={() => setHoveredStar(i)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            <Star gold={i <= hoveredStar} size={size} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="starsDiv" data-testid="theStars" style={{ '--ratings': `${percentage}` }}>
      ★★★★★
    </div>
  );
}

export default Stars;
