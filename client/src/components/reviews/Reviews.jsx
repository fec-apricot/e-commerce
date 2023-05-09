import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import parse from '../../parse';
import ReviewTile from './ReviewTile.jsx';

function Reviews() {
  const { productID } = useContext(GlobalContext);
  const [reviewList, setReviewList] = useState([]);
  const [countLimit, setCountLimit] = useState(500);
  const [sortParam, setSortParam] = useState('relevant');
  const [pageParam, setPageParam] = useState(1);
  const [sliceCount, setSliceCount] = useState(2);

  const getReviews = () => (
    parse.get(`reviews/?page=${pageParam}&count=${countLimit}&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList([...reviewList, ...data.results]); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const sortReviews = () => (
    parse.get(`reviews/?page=${pageParam}&count=${countLimit}&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList([...data.results]); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const getMoreReviews = () => {
    setSliceCount(sliceCount + 2);
  };
  // const changeSort = (e) => new Promise(()=>{setSortParam(e.target.value)})
  //   .then(() => { console.log(sortParam); });
  useEffect(() => { getReviews(); }, [sliceCount]);
  useEffect(() => { sortReviews(); }, [sortParam]);
  return (
    <>
      <form>
        <label htmlFor="sort-list">
          Sorted By
          <select
            id="sort-list"
            onChange={(e) => {
              setSortParam(e.target.value);
            }}
          >
            <option value="relevant">Relevance</option>
            <option value="newest">Newest</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </label>
      </form>
      <div>
        {reviewList.slice(0, sliceCount)
          .map((review) => (
            <ReviewTile review={review} key={review.review_id} getReviews={getReviews} />
          ))}
      </div>
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
    </>
  );
}

export default Reviews;
