import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import WriteReview from './WriteReview.jsx';
import parse from '../../parse';

function Reviews() {
  const { productID, product } = useContext(GlobalContext);
  const [reviewList, setReviewList] = useState([]);
  const [sortParam, setSortParam] = useState('relevant');
  const [metadata, setMetadata] = useState({});
  const [reviewModal, setReviewModal] = useState(false);
  const [sortSwitch, setSortSwitch] = useState(true);
  const [totalReviews, setTotalReviews] = useState([]);
  const getReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => {
        setReviewList([...reviewList, ...data.results]);
        setTotalReviews([...data.results]);
      })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getReviews(); }, [productID]);

  const reviewMeta = () => parse.get(`reviews/meta/?product_id=${productID}`)
    .then((data) => {
      setMetadata(data);
    })
    .catch((err) => { console.log('Client get review metadata error :', err); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { reviewMeta(); }, [productID]);

  return (
    <>
      <div data-testid="reviewcomponent" className="reviews">
        <div className="breakdown">
          <ReviewBreakdown className="review-breakdown" productID={productID} reviewList={reviewList} setReviewList={setReviewList} sortParam={sortParam} allReviews={totalReviews} sortSwitch={sortSwitch} />
          <ProductBreakdown productID={productID} characteristics={metadata.characteristics} />
        </div>
        <div className="review-list-container">
          <ReviewList
            productID={productID}
            sortParam={sortParam}
            setSortParam={setSortParam}
            reviewList={reviewList}
            setReviewList={setReviewList}
            setTotalReviews={setTotalReviews}
            reviewModal={reviewModal}
            setReviewModal={setReviewModal}
            totalReviews={totalReviews}
            sortSwitch={sortSwitch}
            setSortSwitch={setSortSwitch}
          />
        </div>
      </div>
      <div>
        {reviewModal && (
          <WriteReview
            productID={productID}
            product={product}
            reviewModal={reviewModal}
            setReviewModal={setReviewModal}
            characteristics={metadata.characteristics}
          />
        )}
      </div>
    </>
  );
}

export default Reviews;
