import React, { useState, useEffect } from 'react';
import Stars from '../related_products/stars_module/Stars.jsx';

function WriteReview({ productID, setReviewModal, reviewModal }) {
  const ratingScale = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [details, setDetails] = useState({});

  useEffect(() => {
    console.log('rating: ', rating); console.log('productID: ', productID); console.log('summary :', summary); console.log('Body :', body); console.log('recommend :', recommend); console.log('name :', name); console.log('email', email); console.log('photos :', photos); console.log('characteristics :', details);
  }, [rating, body, recommend, name, email, photos, details])

  return (
    <div className="review-modal">
      <div role="presentation" className="modal-overlay">
        <div
          role="presentation"
          className="review-form"
        >
          FORM HERE
          <h1>Write Your Review</h1>
          <div>
            Overall Rating (mandatory)
            <Stars className="review-tile-stars" ratings={ratingScale} size={20} interactive={true} cb={(starRating) => { setRating(starRating); }} />
          </div>
          <div>
            Do you recommend this product? (mandatory)
            <input type="radio" name="recommend" onClick={()=>{setRecommend(true)}}/>
            Yes
            <input type="radio" name="recommend" onClick={()=>{setRecommend(false)}}/>
            No
          </div>
          <div>Characteristics (mandatory)</div>
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
                {(body.length < 50)
                && <div>Review Body Should Be At Least 50 characters long</div>}
              </div>
            </div>
            <div>
              Upload your photos
              <div>
                <div>
                  {(photos.length < 5)
                  && (
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        setPhotos(photos.concat(URL.createObjectURL(e.target.files[0])));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>{`Photolist: ${photos}`}</div>
            <div>{(photos.length > 0) && (photos.map((photo) => <img alt="" height="100" src={photo} />))}</div>
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
            <button type="button">Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
