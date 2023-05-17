import React, { useState, useEffect } from 'react';

function WriteButtons({ detail, detailObj, setDetailObj }) {
  const editRating = (rating) => {
    setDetailObj({ ...detailObj, [detail[1].id]: rating });
  };

  return (
    <div className="detail-buttons">
      {`${detail[0]}: `}
      <input type="radio" name={detail[0]} onClick={() => { editRating(1); }} />
      <input type="radio" name={detail[0]} onClick={() => { editRating(2); }} />
      <input type="radio" name={detail[0]} onClick={() => { editRating(3); }} />
      <input type="radio" name={detail[0]} onClick={() => { editRating(4); }} />
      <input type="radio" name={detail[0]} onClick={() => { editRating(5); }} />
      <span>1</span>
      <span>5</span>
    </div>
  );
}
export default WriteButtons;
