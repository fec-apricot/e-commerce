import React, { useState, useEffect } from 'react';
import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';

function RelatedCard({ relatedID }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
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
    parse.get(`/products/${relatedID}`)
      .then((res) => {
        console.log('GET related product info res', res);
        setProductInfo(res);
      })
      .catch((err) => {
        console.log('GET related product info err', err);
      });
    parse.get(`/products/${relatedID}/styles`)
      .then((res) => {
        console.log('GET related product styles res', res);
        setProductStyles(res);
      })
      .catch((err) => {
        console.log('GET related product styles err', err);
      });
  }, []);

  return (
    <div>
      <img src={imageURL} alt="Coming soon!" />
      <button type="button">ActionButton</button>
      <div>{productInfo ? productInfo.category : ''}</div>
      <div>{productInfo ? productInfo.name : ''}</div>
      <div>{productInfo ? productInfo.default_price : ''}</div>
      <Stars />
    </div>
  );
}

export default RelatedCard;
