import React, { useState, useEffect } from 'react';

function DetailBar({ detail }) {

  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(Math.floor((detail[1].value/5) * 100));
  }, []);
  return (
    <div className="detail-breakdown" onClick={()=>{detail[1].value}}>
      <div>{detail[0]}</div>
      <span className="detail-bar">
        <span className="poor">Poor</span>
        <span className="detail-position" style={{left: `${value}%`}}>{value}</span>
        <span className="great">Great</span>
      </span>
    </div>
  );
}

export default DetailBar;
