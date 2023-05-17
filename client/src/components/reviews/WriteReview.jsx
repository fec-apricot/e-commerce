import React, { useState, useEffect } from 'react';
import Stars from '../related_products/stars_module/Stars.jsx';
import WriteButtons from './WriteButtons.jsx';
import parse from '../../parse';
const axios = require('axios');

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
  const [image, setImage] = useState('');
  const [url, setUrl] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [details, setDetails] = useState([]);
  const [detailObj, setDetailObj] = useState({});
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (image !== '') {
      console.log('EFFECT');

      const cloudData = new FormData();
      cloudData.append('file', image);
      cloudData.append('upload_preset', 'fec-apricot');
      cloudData.append('cloud_name', 'dodjbyydc');
      fetch('https://api.cloudinary.com/v1_1/dodjbyydc/image/upload', {
        method: 'post',
        body: cloudData,
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
          setUrl([...url, result.url]);
        })
        .catch((err) => console.log('Cloudinary Error:', err));
    }
  }, [image]);

  const submitReview = () => parse.post('/reviews', {
    product_id: productID,
    rating: userRating,
    summary: userSummary,
    body: userBody,
    recommend: userRecommend,
    name: username,
    email: userEmail,
    photos: url,
    characteristics: detailObj,
  }).then(() => { setReviewModal(!reviewModal); }).catch((err) => { console.log('Review Submission Error: ', err); });
  const yes = true;

  // const parseObj = {
  //   product_id: productID,
  //   rating: userRating,
  //   summary: userSummary,
  //   body: userBody,
  //   recommend: userRecommend,
  //   name: username,
  //   email: userEmail,
  //   photos: url,
  //   characteristics: detailObj,
  // };

  useEffect(() => {
    if (characteristics) {
      setDetails(Object.keys(characteristics).map((key) => [key, characteristics[key]]));
    }
  }, [productID, characteristics]);

  useEffect(() => {
    if (userRating && userRecommend
      && Object.keys(detailObj).length === Object.keys(characteristics).length
      && userBody.length > 50 && username && userEmail) {
      setEnabled(true);
    }
  }, [userRating, userRecommend, detailObj, userBody, username, userEmail])
  return (
    <div className="review-modal">
      <div role="presentation" className="modal-overlay">
        <div
          role="presentation"
          className="review-form"
        >
          <h2 onClick={()=>{console.log('parseobj :', parseObj); console.log('chara :', characteristics)}} style={{textAlign: 'center'}}>{`Write Your Review For ${product.name}`}</h2>
          <div style={{ fontSize: 'small' }}>* indicates a required field</div>
          <div>
            Overall Rating *
            <Stars className="review-tile-stars" ratings={ratingScale} size={20} interactive={yes} cb={(starRating) => { setRating(starRating); }} />
          </div>
          <div>
            Do you recommend this product? *
            <input type="radio" name="recommend" onClick={() => { setRecommend(true); }} />
            Yes
            <input type="radio" name="recommend" onClick={() => { setRecommend(false); }} />
            No
          </div>
          <div>
            Characteristics *
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
              Review Body *
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
                  {(thumbnails.length < 5)
                  && (
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setThumbnails(thumbnails.concat(URL.createObjectURL(e.target.files[0])));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>{(thumbnails.length > 0) && (thumbnails.map((photo) => <img alt="" height="100" src={photo} key={photo} />))}</div>
            <div>
              What is your nickname *
              <div>
                <input type="text" style={{ width: '60%' }} placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value); }} />
              </div>
            </div>
            <div>
              Your email *
              <div>
                <input type="text" style={{ width: '60%' }} placeholder="Example: jackson11!@email.com" onChange={(e) => { setEmail(e.target.value); }} />
              </div>
            </div>
            <button type="button" disabled={!enabled} onClick={() => { submitReview(); }}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
