import React, { useState, useEffect } from 'react';
import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';
import '../Related.css';

function RelatedCard({ relatedID }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [rating, setRating] = useState({});
  const [imageURL, setImageURL] = useState('');

  const updateImageURL = () => {
    let imgURL = '';
    console.log('----------->', productStyles);
    if (productStyles.results) {
      for (let i = 0; i < productStyles.results.length; i += 1) {
        if (productStyles.results[i]['default?'] === true) {
          imgURL = productStyles.results[i].photos[0].thumbnail_url;
          console.log('imgURL', imgURL);
          break;
        }
      }
      if (imgURL === '') {
        imgURL = productStyles.results[0].photos[0].thumbnail_url;
      }
    }
    setImageURL(imgURL);
  };

  useEffect(() => {
    updateImageURL();
  });

  useEffect(() => {
    const endpoints = [
      `/products/${relatedID}`,
      `/products/${relatedID}/styles`,
      `/reviews/meta?product_id=${relatedID}`,
    ];

    Promise.all(endpoints.map((endpoint) => parse.get(endpoint)))
      .then((res) => {
        console.log('this is all the data', res);
        setProductInfo(res[0]);
        setProductStyles(res[1]);
        setRating(res[2].ratings);
      })
      .catch((err) => {
        console.log('promise.all err', err);
      });
  }, []);

  return (
    <div className="card">
      <div className="imgDiv">
        <img className="relatedIMG" src={imageURL} alt="Coming soon!" />
        <div className="btnDiv">
          <button className="compareButton" type="button">Compare</button>
        </div>
      </div>
      <div className="category">{productInfo ? productInfo.category : ''}</div>
      <div className="productName">{productInfo ? `${productInfo.name} - ${productInfo.slogan ? productInfo.slogan : ''}` : ''}</div>
      <div className="price">{productInfo ? `$${productInfo.default_price}` : ''}</div>
      <Stars rating={rating} interactive={true} />
    </div>
  );
}

export default RelatedCard;
