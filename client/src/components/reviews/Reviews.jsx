import React, { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';

function Reviews() {
  const { productID } = useContext(GlobalContext);
  const [reviewList, setReviewList] = useState([]);
  const [sortParam, setSortParam] = useState('relevant');

  return (
    <>
      <ReviewBreakdown className="review-breakdown" productID={productID} reviewList={reviewList} setReviewList={setReviewList} sortParam={sortParam} />
      <ReviewList
        productID={productID}
        sortParam={sortParam}
        setSortParam={setSortParam}
        reviewList={reviewList}
        setReviewList={setReviewList}
      />
    </>
  );
}

export default Reviews;
