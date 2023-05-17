import React, { useState, useEffect } from 'react';

function WriteButtons({ detail, detailObj, setDetailObj }) {
  const editRating = (rating) => {
    setDetailObj({ ...detailObj, [detail[1].id]: rating });
  };

  return (
    <>
      <div className="detail-container-modal">
        <span className="detail-name-modal">{`${detail[0]}: `}</span>
        <span className="detail-buttons-modal">
          <input type="radio" name={detail[0]} onClick={() => { editRating(1); }} />
          <input type="radio" name={detail[0]} onClick={() => { editRating(2); }} />
          <input type="radio" name={detail[0]} onClick={() => { editRating(3); }} />
          <input type="radio" name={detail[0]} onClick={() => { editRating(4); }} />
          <input type="radio" name={detail[0]} onClick={() => { editRating(5); }} />
        </span>
      </div>
      <div className="detail-scale-modal">
        <span className="detail-one-modal">{(detail[0] === 'Fit' && 'Runs tight') || (detail[0] === 'Length' && 'Runs Short') || (detail[0] === 'Width' && 'Too narrow') || (detail[0] === 'Comfort' && 'Uncomfortable') || (detail[0] === 'Quality' && 'Poor') || (detail[0] === 'Size' && 'A size too small')}</span>
        <span className="detail-three-modal">{(detail[0] === 'Fit' && 'Perfect') || (detail[0] === 'Length' && 'Perfect') || (detail[0] === 'Width' && 'Perfect') || (detail[0] === 'Comfort' && 'Ok') || (detail[0] === 'Quality' && 'What I expected') || (detail[0] === 'Size' && 'Perfect')}</span>
        <span className="detail-five-modal">{(detail[0] === 'Fit' && 'Runs long') || (detail[0] === 'Length' && 'Runs long') || (detail[0] === 'Width' && 'Too wide') || (detail[0] === 'Comfort' && 'Perfect') || (detail[0] === 'Quality' && 'Perfect') || (detail[0] === 'Size' && 'A size too wide')}</span>
      </div>
    </>
  );
}
export default WriteButtons;
