import React, { useEffect, useState } from 'react';
import parse from '../../parse';
import './reviewStyle.css';
import Stars from '../related_products/stars_module/Stars.jsx';

function ReviewBreakdown({ productID, setReviewList, sortParam }) {
  const [allRatings, setAllRatings] = useState({})
  const [reviewScore1, setReviewScore1] = useState(0);
  const [reviewScore2, setReviewScore2] = useState(0);
  const [reviewScore3, setReviewScore3] = useState(0);
  const [reviewScore4, setReviewScore4] = useState(0);
  const [reviewScore5, setReviewScore5] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);
  const [bar4, setBar4] = useState(0);
  const [bar5, setBar5] = useState(0);

  const getAllReviews = () => (
    parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
      .then((data) => {
        setAllReviews(data.results);
      })
      .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); }));
  useEffect(() => { getAllReviews(); }, [productID]);

  const reviewMeta = () => parse.get(`reviews/meta/?product_id=${productID}`)
    .then((data) => {
      console.log('Metadata :', data);
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

  useEffect(() => { reviewMeta(); }, [productID]);

  const filterObj = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };
  const editFilterArray = (starRating) => {
    console.log('step 1.5');
    if (filterObj[starRating] === false) {
      filterObj[starRating] = true;
      return false;
    }
    if (filterObj[starRating] === true) {
      filterObj[starRating] = false;
      return true;
    }
    return filterObj;
  };

  const filterByRating = async (starRating) => {
    console.log('first');
    await editFilterArray(starRating);
    console.log('second :', filterObj);
    // if (Object.values(filterObj).every((filterBool) => filterBool === false)) {
    //   console.log('third');
    //   return parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
    //     .then((data) => {
    //       console.log('data results: ', data.results);
    //       setReviewList(data.results);
    //     })
    //     .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); });
    // }
    const filteredList = allReviews.filter((review) => filterObj[review.rating]);
    return setReviewList(filteredList);
    // return parse.get(`reviews/?page=1&count=500&sort=${sortParam}&product_id=${productID}`)
    //   .then((data) => {
    //     console.log('return to default');
    //     setReviewList(data.results);
    //   })
    //   .catch((err) => { console.log('CLIENT GET REVIEW ERROR: ', err); });
    // const filteredList = allReviews.filter((review) => filterObj[review.rating]);
    // return setReviewList(filteredList);
  };

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
      <div>
        <div className="review-average">
          {reviewAverage.toString().slice(0, 3)}
        </div>
        <div className="review-star-average">
          <Stars ratings={allRatings} size={20} interactive={false} />
        </div>
      </div>
      <div className="percent-recommend">{`${Math.floor((recommended / totalReviews) * 100)}% of reviews recommend this product`}</div>
      <div className="review-graph-background">
        <div
          role="presentation"
          onClick={() => {
            filterByRating(5);
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
            filterByRating(4);
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
