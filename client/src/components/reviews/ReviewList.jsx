import React, { useState, useEffect } from 'react';
import parse from '../../parse';
import ReviewTile from './ReviewTile.jsx';

function ReviewList({
  productID, sortParam, setSortParam, reviewList, setReviewList, reviewModal, setReviewModal,
}) {
  const [sliceCount, setSliceCount] = useState(2);
  const [totalReviews, setTotalReviews] = useState([]);
  const getReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => {
        setReviewList([...reviewList, ...data.results]);
        setTotalReviews([...data.results]);
      })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const sortReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList([...data.results]); setTotalReviews([...data.results]); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const getMoreReviews = () => {
    setSliceCount(sliceCount + 2);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getReviews(); }, [productID]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { sortReviews(); }, [sortParam, productID]);
  // sliceCount,
  return (
    <>
      <div className="review-list">
        <form>
          <label htmlFor="sort-list">
            {`${totalReviews.length} reviews, sorted by `}
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
      </div>
      <div className="review-list-buttons">
        {((sliceCount !== reviewList.length || sliceCount < reviewList.length) && <button className="more-reviews" type="button" onClick={getMoreReviews}>MORE REVIEWS</button>)}
        <div>
          <button className="write-review-button" type="button" onClick={() => { setReviewModal(!reviewModal); }}>ADD A REVIEW +</button>
        </div>
      </div>
    </>
  );
}

export default ReviewList;
