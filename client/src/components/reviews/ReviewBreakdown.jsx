import React, { useEffect, useState } from 'react';
import parse from '../../parse';
import './reviewStyle.css';

function ReviewBreakdown({ productID, getReviews, setReviewList, allReviews}) {
  const [reviewScore1, setReviewScore1] = useState(0);
  const [reviewScore2, setReviewScore2] = useState(0);
  const [reviewScore3, setReviewScore3] = useState(0);
  const [reviewScore4, setReviewScore4] = useState(0);
  const [reviewScore5, setReviewScore5] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);
  const [bar4, setBar4] = useState(0);
  const [bar5, setBar5] = useState(0);

  const reviewMeta = () => parse.get(`reviews/meta/?product_id=${productID}`)
    .then((data) => {
      console.log('Metadata :', data);

      const totalReviewArray = Object.values(data.ratings);
      setTotalReviews(totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0));

      setReviewScore1(Number(data.ratings['1']));
      setReviewScore2(Number(data.ratings['2']));
      setReviewScore3(Number(data.ratings['3']));
      setReviewScore4(Number(data.ratings['4']));
      setReviewScore5(Number(data.ratings['5']));

      setRecommended(Number(data.recommended.true));

      setReviewAverage((((Number(data.ratings['1'])) * 1) + ((Number(data.ratings['2'])) * 2) + ((Number(data.ratings['3'])) * 3)
      + ((Number(data.ratings['4'])) * 4) + ((Number(data.ratings['5'])) * 5)) / (totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)));

      setBar1(Math.floor(((Number(data.ratings['1'])) / totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)) * 100));
      setBar2(Math.floor(((Number(data.ratings['2'])) / totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)) * 100));
      setBar3(Math.floor(((Number(data.ratings['3'])) / totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)) * 100));
      setBar4(Math.floor(((Number(data.ratings['4'])) / totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)) * 100));
      setBar5(Math.floor(((Number(data.ratings['5'])) / totalReviewArray.reduce((acc, rating) => acc + Number(rating), 0)) * 100));
    })
    .catch((err) => { console.log('Client get review metadata error :', err); });

  useEffect(() => { reviewMeta(); }, []);

  const [filterObj, setFilterObj] = useState({});
  const editFilterArray = (starRating) => {
    if (!filterObj[starRating]) {
      filterObj[starRating] = true;
    } else {
      filterObj[starRating] = false;
    }
    setFilterObj(filterObj);
  };
  const filterByRating = () => {
    const filteredList = allReviews.filter((review) => filterObj[review.rating]);
    setReviewList(filteredList);
  };
  if (Object.values(filterObj).every((filterBoolean) => filterBoolean === false)) {
    console.log('return default list');
    // getReviews();
  }
  return (
    <>
      <h3
        role="presentation"
        onClick={() => {
          // console.log('total reviews: ', totalReviews)
          // console.log('1: ', reviewScore1)
          // console.log('2: ', reviewScore2)
          // console.log('3: ', reviewScore3)
          // console.log('4: ', reviewScore4)
          // console.log('5: ', reviewScore5)
          // console.log('average: ', reviewAverage);
          // console.log('recommended ', recommended);
          // console.log('bar 1 percent', bar1)
          // console.log('bar 2 percent', bar2)
          // console.log('bar 3 percent', bar3)
          // console.log('bar 4 percent', bar4)
          // console.log('bar 5 percent', bar5)
          console.log('filterObj', filterObj);
          console.log('allreviews', allReviews);
        }}
      >
        Rating Breakdown
      </h3>
      <div>{`${Math.floor((recommended / totalReviews) * 100)}% of reviews recommend this product`}</div>
      <div className="review-graph-background">
        <div
          role="presentation"
          onClick={() => {
            editFilterArray(5);
            filterByRating();
          }}
        >
          <div className="review-bar-label"> 5 stars </div>
          <div className="outer">
            <div className="inner" style={{width: `${bar5}%`}}></div>
          </div>
        </div>
        <div
          role="presentation"
          onClick={() => {
            editFilterArray(4);
            filterByRating();
          }}
        >
          <div className="review-bar-label"> 4 stars </div>
          <div className="outer">
            <div className="inner" style={{width: `${bar4}%`}}></div>
          </div>
        </div>
        <div role="presentation" onClick={() => { editFilterArray(3); }}>
          <div className="review-bar-label"> 3 stars </div>
          <div className="outer">
            <div className="inner" style={{width: `${bar3}%`}}></div>
          </div>
        </div>
        <div role="presentation" onClick={() => { editFilterArray(2); }}>
          <div className="review-bar-label"> 2 stars </div>
          <div className="outer">
            <div className="inner" style={{width: `${bar2}%`}}></div>
          </div>
        </div>
        <div role="presentation" onClick={() => { editFilterArray(1); }}>
          <div className="review-bar-label"> 1 stars </div>
          <div className="outer">
            <div className="inner" style={{width: `${bar1}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReviewBreakdown;
