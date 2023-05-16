import React, { useState, useEffect } from 'react';
import parse from '../../parse';
import ReviewTile from './ReviewTile.jsx';

function ReviewList({ productID, sortParam, setSortParam, reviewList, setReviewList }) {
  // const [countLimit, setCountLimit] = useState(500);
  // const [pageParam, setPageParam] = useState(1);
  const [sliceCount, setSliceCount] = useState(2);

  const getReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => {
        setReviewList([...reviewList, ...data.results]);
      })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const sortReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList([...data.results]); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const getMoreReviews = () => {
    setSliceCount(sliceCount + 2);
  };

  useEffect(() => { getReviews(); }, [sliceCount, productID]);
  useEffect(() => { sortReviews(); }, [sortParam, productID]);
  return (
    <div className="review-list">
      <form>
        <label htmlFor="sort-list">
          Sorted By
          <select
            id="sort-list"
            onChange={(e) => {
              setSliceCount(2);
              setSortParam(e.target.value);
            }}
          >
            <option value="relevant">Relevance</option>
            <option value="newest">Newest</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </label>
      </form>
      <div className="tile-list" data-testid="tile-list">
        {reviewList.slice(0, sliceCount)
          .map((review) => (
            <ReviewTile review={review} key={review.review_id} />
          ))}
      </div>
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
      <button type="submit">Write a review</button>
    </div>
  );
}

export default ReviewList;
