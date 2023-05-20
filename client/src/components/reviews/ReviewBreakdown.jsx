import React, { useEffect, useState } from 'react';
import parse from '../../parse';
import './reviewStyle.css';
import Stars from '../stars_module/Stars.jsx';

function ReviewBreakdown({
  productID, setReviewList, sortParam, allReviews, sortSwitch,
}) {
  const [allRatings, setAllRatings] = useState({});
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
  const [filterObj, setFilterObj] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [filterKeys] = useState(Object.keys(filterObj));

  const reviewMeta = () => parse.get(`reviews/meta/?product_id=${productID}`)
    .then((data) => {
      const totalReviewArray = Object.values(data.ratings);
      setAllRatings(data.ratings);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { reviewMeta(); }, [productID]);

  const editFilterObj = (starRating) => {
    if (filterObj[starRating] === false) {
      setFilterObj({
        ...filterObj,
        [starRating]: true,
      });
    } else {
      setFilterObj({
        ...filterObj,
        [starRating]: false,
      });
    }
    return filterObj;
  };
  const filterByRating = () => {
    if (Object.values(filterObj).every((filterBool) => filterBool === false)) {
      return parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
        .then((data) => {
          setReviewList(data.results);
        })
        .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); });
    }
    const filteredList = allReviews.filter((review) => filterObj[review.rating]);
    return setReviewList(filteredList);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { filterByRating(); }, [filterObj, sortSwitch]);

  const resetFilter = () => {
    setFilterObj({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    });
  };
  useEffect(() => { resetFilter(); }, [productID]);
  return (
    <>
      <h3>
        Rating Breakdown
      </h3>
      <div>
        {!(Object.values(filterObj).every((filterBool) => filterBool === false))
        && (
        <>
          <div>
            Filtered reviews by star ratings
            <div>{filterKeys.filter((key) => filterObj[key]).slice(0, filterKeys.length - 1).join(', ')}</div>
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            onClick={() => { resetFilter(); }}
          >
            <u style={{ cursor: 'pointer' }}>Remove All Filters</u>
          </div>
        </>
        )}
      </div>
      <div>
        <div className="review-average">
          {reviewAverage.toString().slice(0, 3)}
        </div>
        <div className="review-star-average">
          <Stars ratings={allRatings} size={20} interactive={false} cb={() => {}} />
        </div>
      </div>
      <div className="review-graph-background">
        <div className="rating-breakdown" role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => { editFilterObj(5); }}>
          <div className="review-bar-label"> 5 stars </div>
          <div className="outer">
            <div className="inner" data-testid="inner" style={{ width: `${bar5}%` }}></div>
          </div>
          <div className="review-total">{`(${reviewScore5})`}</div>
        </div>
        <div className="rating-breakdown" role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => { editFilterObj(4); }}>
          <div className="review-bar-label"> 4 stars </div>
          <div className="outer">
            <div className="inner" data-testid="inner" style={{ width: `${bar4}%` }}></div>
          </div>
          <div className="review-total">{`(${reviewScore4})`}</div>
        </div>
        <div className="rating-breakdown" role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => { editFilterObj(3); }}>
          <div className="review-bar-label"> 3 stars </div>
          <div className="outer">
            <div className="inner" data-testid="inner" style={{ width: `${bar3}%` }}></div>
          </div>
          <div className="review-total">{`(${reviewScore3})`}</div>
        </div>
        <div className="rating-breakdown" role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => { editFilterObj(2); }}>
          <div className="review-bar-label"> 2 stars </div>
          <div className="outer">
            <div className="inner" data-testid="inner" style={{ width: `${bar2}%` }}></div>
          </div>
          <div className="review-total">{`(${reviewScore2})`}</div>
        </div>
        <div className="rating-breakdown" role="presentation" onClick={() => { editFilterObj(1); }}>
          <div className="review-bar-label"> 1 stars </div>
          <div className="outer">
            <div className="inner" data-testid="inner" style={{ width: `${bar1}%` }}></div>
          </div>
          <div className="review-total">{`(${reviewScore1})`}</div>
        </div>
      </div>
      <div className="percent-recommend">{`${Math.floor((recommended / totalReviews) * 100)}% of reviews recommend this product`}</div>
    </>
  );
}
export default ReviewBreakdown;
