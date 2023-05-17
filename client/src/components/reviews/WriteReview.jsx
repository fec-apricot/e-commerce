import React, { useState, useEffect } from 'react';
import Stars from '../related_products/stars_module/Stars.jsx';
import WriteButtons from './WriteButtons.jsx';
import parse from '../../parse';

function WriteReview({ productID, product, setReviewModal, reviewModal, characteristics}) {
  const ratingScale = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const [userRating, setRating] = useState(0);
  const [userSummary, setSummary] = useState('');
  const [userBody, setBody] = useState('');
  const [userRecommend, setRecommend] = useState('');
  const [username, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPhotos, setPhotos] = useState([]);
  const [details, setDetails] = useState([]);
  const [detailObj, setDetailObj] = useState({});

  // useEffect(() => {
  //   console.log('rating: ', rating); console.log('productID: ', productID); console.log('summary :', summary); console.log('Body :', body); console.log('recommend :', recommend); console.log('name :', name); console.log('email', email); console.log('photos :', photos); console.log('characteristics :', details);
  // }, [rating, body, recommend, name, email, photos, details])
  // parse.post(`/qa/questions/${question.question_id}/answers`, {
  //   product_id: product_id,
  //   rating: rating,
  //   summary: summary,
  //   body: body,
  //   recommend: recommend,
  //   name: name,
  //   email: email,
  //   photos: photos,
  //   characteristics:
  // })
  const submitReview = () => parse.post('/reviews', {
    product_id: productID,
    rating: userRating,
    summary: userSummary,
    body: userBody,
    recommend: userRecommend,
    name: username,
    email: userEmail,
    photos: userPhotos,
    characteristics: detailObj,
  }).then(() => { setReviewModal(!reviewModal); }).catch((err) => { console.log('Review Submission Error: ', err); });
  const yes = true;
  const parseObj = {
    product_id: productID,
    rating: userRating,
    summary: userSummary,
    body: userBody,
    recommend: userRecommend,
    name: username,
    email: userEmail,
    photos: userPhotos,
    characteristics: detailObj,
  }
  // useEffect(() => {
  //   if (characteristics) {
  //     setDetails(Object.keys(characteristics));
  //   }
  // }, [productID, characteristics]);
  useEffect(() => {
    if (characteristics) {
      setDetails(Object.keys(characteristics).map((key) => [key, characteristics[key]]));
    }
  }, [productID, characteristics]);

  return (
    <div className="review-modal">
      <div role="presentation" className="modal-overlay">
        <div
          role="presentation"
          className="review-form"
        >
          FORM HERE
          <h1 onClick={()=>{console.log(parseObj)}}>Write Your Review For</h1>
          <h4>{product.name}</h4>
          <div>
            Overall Rating (mandatory)
            <Stars className="review-tile-stars" ratings={ratingScale} size={20} interactive={yes} cb={(starRating) => { setRating(starRating); }} />
          </div>
          <div>
            Do you recommend this product? (mandatory)
            <input type="radio" name="recommend" onClick={()=>{setRecommend(true)}}/>
            Yes
            <input type="radio" name="recommend" onClick={()=>{setRecommend(false)}}/>
            No
          </div>
          <div>
            Characteristics (mandatory)
            <div className="review-form-details">{details.map((detail) => (<WriteButtons detail={detail} key={detail[0]} detailObj={detailObj} setDetailObj={setDetailObj} />))}</div>
          </div>
          <div className="review-text-block">
            <div>
              Review Summary
              <div>
                <input
                  type="text"
                  placeholder="Example: Best purchase ever!"
                  className="review-form-summary"
                  maxLength="60"
                  onChange={(e) => {
                    setSummary(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              Review Body (mandatory)
              <div>
                <textarea
                  placeholder="Why did you like the product or not?"
                  className="review-form-body"
                  maxLength="1000"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </div>
              <div className="review-body-warning">
                {(userBody.length < 50)
                && <div>Review Body Should Be At Least 50 characters long</div>}
              </div>
            </div>
            <div>
              Upload your photos
              <div>
                <div>
                  {(userPhotos.length < 5)
                  && (
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        setPhotos(userPhotos.concat(URL.createObjectURL(e.target.files[0])));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <div>{`Photolist: ${userPhotos}`}</div> */}
            <div>{(userPhotos.length > 0) && (userPhotos.map((photo) => <img alt="" height="100" src={photo} key={photo} />))}</div>
            <div>
              What is your nickname (mandatory)
              <div>
                <input type="text" style={{ width: '60%' }} placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value); }} />
              </div>
            </div>
            <div>
              Your email (mandatory)
              <div>
                <input type="text" style={{ width: '60%' }} placeholder="Example: jackson11!@email.com" onChange={(e) => { setEmail(e.target.value); }} />
              </div>
            </div>
            <button type="button" onClick={() => { submitReview(); }}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
