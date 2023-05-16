import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import WriteReview from './WriteReview.jsx';
import parse from '../../parse';

function Reviews() {
  const { productID } = useContext(GlobalContext);
  const [reviewList, setReviewList] = useState([]);
  const [sortParam, setSortParam] = useState('relevant');
  const [metadata, setMetadata] = useState({});
  const [reviewModal, setReviewModal] = useState(false);

  const reviewMeta = () => parse.get(`reviews/meta/?product_id=${productID}`)
    .then((data) => {
      console.log('Metadata :', data);
      setMetadata(data);
    })
    .catch((err) => { console.log('Client get review metadata error :', err); });
  useEffect(() => { reviewMeta(); }, [productID]);

  return (
    <>
      <div data-testid="reviewcomponent" className="reviews">
        <div className="breakdown">
          <ReviewBreakdown className="review-breakdown" productID={productID} reviewList={reviewList} setReviewList={setReviewList} sortParam={sortParam} />
          <ProductBreakdown productID={productID} characteristics={metadata.characteristics} />
        </div>
        <ReviewList
          productID={productID}
          sortParam={sortParam}
          setSortParam={setSortParam}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      </div>
      <div className="write-review-btn">
        <button type="button" onClick={() => { setReviewModal(!reviewModal); }}>ADD REVIEW</button>
      </div>
      <div>
        {reviewModal && (
          <WriteReview
            productID={productID}
            reviewModal={reviewModal}
            setReviewModal={setReviewModal}
          />
        )}
      </div>
    </>
  );
}

export default Reviews;
