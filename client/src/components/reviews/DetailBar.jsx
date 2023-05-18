import React, { useState, useEffect } from 'react';

function DetailBar({ detail }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(Math.floor((detail[1].value / 5) * 100));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const perfectDetails = ['Size', 'Width', 'Length', 'Fit'];
  return (
    <div className="detail-breakdown">
      <div>{detail[0]}</div>
      <span className="detail-bar">
        <span className="poor">{(detail[0] === 'Fit' && 'Runs tight') || (detail[0] === 'Length' && 'Runs Short') || (detail[0] === 'Width' && 'Too narrow') || (detail[0] === 'Comfort' && 'Uncomfortable') || (detail[0] === 'Quality' && 'Poor') || (detail[0] === 'Size' && 'A size too small')}</span>
        <span className="tier-separator" style={{ left: '66%' }}></span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="detail-position"
          style={{ left: `${value}%` }}
        >
          <path
            d="M7.75735 5.63605L6.34314 7.05026L12 12.7071L17.6569 7.05029L16.2427 5.63608L12 9.87872L7.75735 5.63605Z"
            fill="currentColor"
          />
          <path
            d="M6.34314 12.7071L7.75735 11.2929L12 15.5356L16.2427 11.2929L17.6569 12.7071L12 18.364L6.34314 12.7071Z"
            fill="currentColor"
          />
        </svg>
        <span className="middle">{perfectDetails.includes(detail[0]) && 'Perfect'}</span>
        <span className="tier-separator"></span>
        <span className="great">{(detail[0] === 'Fit' && 'Runs long') || (detail[0] === 'Length' && 'Runs long') || (detail[0] === 'Width' && 'Too wide') || (detail[0] === 'Comfort' && 'Perfect') || (detail[0] === 'Quality' && 'Perfect') || (detail[0] === 'Size' && 'A size too wide')}</span>
      </span>
    </div>
  );
}

export default DetailBar;
