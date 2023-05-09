import React from 'react';
import parse from '../../parse';

function ReviewTile({ review, getReviews }) {
  console.log('Review Tile: ', review);
  let reviewDate = new Date(review.date);
  const [helpCount, setHelpCount] = React.useState(review.helpfulness);
  const upvote = () => {
    parse.put(`reviews/${review.review_id}/helpful`)
    //     .then(() => {
    //       getReviews()
    //         .then(() => { console.log('Client refreshed reviews'); })
    //         .catch((err) => { console.log('Client refresh review error: ', err); });
    //     })
      .then(() => { console.log('Client marked review as helpful'); })
      .catch((err) => { console.log('Client put error :', err); });
  };
  if (review.response && review.recommend) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{`By: ${review.reviewer_name} Date: ${reviewDate.toDateString()}`}</div>
        <div>{review.body}</div>
        <div>I recommend this product</div>
        <div>{`Reponse: ${review.response}`}</div>
        <div>Was this Review Helpful?</div>
        <div
          onClick={() => {
            upvote();
            setHelpCount(helpCount + 1);
          }}
          style={{ cursor: 'pointer' }}
          role="presentation"
        >
          {`Yes (${helpCount})`}
        </div>
      </>
    );
  }
  if (review.reponse) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{`By: ${review.reviewer_name} Date: ${reviewDate.toDateString()}`}</div>
        <div>{review.body}</div>
        <div>{`Reponse: ${review.response}`}</div>
        <div>Was this Review Helpful?</div>
        <div
          onClick={() => {
            upvote();
            setHelpCount(helpCount + 1);
          }}
          style={{ cursor: 'pointer' }}
          role="presentation"
        >
          {`Yes (${helpCount})`}
        </div>
      </>
    );
  }
  if (review.recommend) {
    return (
      <>
        <h3>{review.summary}</h3>
        <div>{`By: ${review.reviewer_name} Date: ${reviewDate.toDateString()}`}</div>
        <div>{review.body}</div>
        <div>I recommend this product</div>
        <div>Was this Review Helpful?</div>
        <div
          onClick={() => {
            upvote();
            setHelpCount(helpCount + 1);
          }}
          style={{ cursor: 'pointer' }}
          role="presentation"
        >
          {`Yes (${helpCount})`}
        </div>
      </>
    );
  }
  return (
    <>
      <h3>{review.summary}</h3>
      <div>{`By: ${review.reviewer_name} Date: ${reviewDate.toDateString()}`}</div>
      <div>{review.body}</div>
      <div>Was this Review Helpful?</div>
      <div
        onClick={() => {
          upvote();
          setHelpCount(helpCount + 1);
        }}
        style={{ cursor: 'pointer' }}
        role="presentation"
      >
        {`Yes (${helpCount})`}
      </div>
    </>
  );
}

export default ReviewTile;
