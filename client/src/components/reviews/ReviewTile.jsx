import React from 'react';

function ReviewTile({ review }) {
  console.log('Review Tile: ', review);
  let reviewDate = new Date(review.date);
  if (review.response && review.recommend) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{'By: ' + review.reviewer_name + ' Date: ' + reviewDate.toDateString()}</div>
        <div>{review.body}</div>
        <div>I recommend this product</div>
        <div>{'Reponse: ' + review.response}</div>
        <div>{'Was this Review Helpful? Yes ' + `(${review.helpfulness})`}</div>
      </>
    );
  }
  if (review.reponse) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{'By: ' + review.reviewer_name + ' Date: ' + reviewDate.toDateString()}</div>
        <div>{review.body}</div>
        <div>{'Reponse: ' + review.response}</div>
        <div>{'Was this Review Helpful? Yes ' + `(${review.helpfulness})`}</div>
      </>
    );
  }
  if (review.recommend) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{'By: ' + review.reviewer_name + ' Date: ' + reviewDate.toDateString()}</div>
        <div>{review.body}</div>
        <div>I recommend this product</div>
        <div>{'Was this Review Helpful? Yes ' + `(${review.helpfulness})`}</div>
      </>
    );
  }
  return (
    <>
      <h3>{review.summary}</h3>
      <div>{'By: ' + review.reviewer_name + ' Date: ' + reviewDate.toDateString()}</div>
      <div>{review.body}</div>
      <div>{'Was this Review Helpful? Yes ' + `(${review.helpfulness})`}</div>
    </>
  );
}

export default ReviewTile;
