import React from 'react';
import Star from './SingleStar.jsx';
import '../Related.css';

function Stars() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <li className="starIcon">
          <Star key={i} />
        </li>
      ))}
    </div>
  );
}

export default Stars;
