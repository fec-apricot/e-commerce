import React, { useContext } from 'react';
import { ProductIDContext } from '../App.jsx';
import parse from '../../parse';
import ReviewTile from './ReviewTile.jsx';

function Reviews() {
  const { productID } = useContext(ProductIDContext);
  const [reviewList, setReviewList] = React.useState([]);
  const [countLimit, setCountLimit] = React.useState(2);
  const [sortParam, setSortParam] = React.useState('relevant');
  const [pageParam, setPageParam] = React.useState(1);

  const getReviews = () => (
    parse.get(`reviews/?page=${pageParam}&count=${countLimit}&sort=${sortParam}&product_id=${productID}`)
      .then((data) => { setReviewList(reviewList.concat(data.results)); })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));

  const getMoreReviews = () => {
    setPageParam(pageParam + 1);
  };

  React.useEffect(() => { getReviews(); }, [pageParam]);

  return (
    <>
      <h5>{'sorted by ' + sortParam}</h5>
      <div>
        {reviewList.map((review) => (<ReviewTile review={review} key={review.review_id} />))}
      </div>
      <button type="submit" onClick={getMoreReviews}>More Reviews</button>
    </>
  );
}

export default Reviews;
