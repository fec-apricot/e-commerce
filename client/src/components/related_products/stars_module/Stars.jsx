import React, { useState, useEffect } from 'react';
import Star from './SingleStar.jsx';
import './Stars.css';

function Stars({
  ratings,
  size,
  interactive,
  cb,
}) {
  const [percentage, setPercentage] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const computeRating = () => {
    let total = 0;
    let totalVotes = 0;
    for (let i = 1; i < 6; i += 1) {
      totalVotes += Number(ratings[i]);
      total += ratings[i] * i;
    }

    const percent = new Intl.NumberFormat('en-US', { style: 'percent' }).format((total / totalVotes) / 5);
    setPercentage(percent);
  };

  useEffect(() => {
    cb(selectedStar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStar]);

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
            role="button"
            onClick={() => setSelectedStar(i)}
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <Star gold={i <= hoveredStar || i <= selectedStar} size={size} i={i} />
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
