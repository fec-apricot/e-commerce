import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import parse from '../../parse';
import ReviewTile from './ReviewTile.jsx';

function Reviews() {
  const { productID } = useContext(GlobalContext);
  const [reviewList, setReviewList] = useState([]);
  const [countLimit, setCountLimit] = useState(2);
  const [sortParam, setSortParam] = useState('newest');
  const [pageParam, setPageParam] = useState(1);
  // setReviewList([...reviewList, ...data.results]);
  const getReviews = () => (
    parse.get(`reviews/?page=${pageParam}&count=${countLimit}&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList([...reviewList, ...data.results]); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const getMoreReviews = () => {
    setPageParam(pageParam + 1);
  };

  useEffect(() => { getReviews(); }, [pageParam]);

  return (
    <>
      <h5>{`sorted by ${sortParam}`}</h5>
      <div>
        {reviewList.map((review) => (<ReviewTile review={review} key={review.review_id} />))}
      </div>
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
    </>
  );
}

export default Reviews;
