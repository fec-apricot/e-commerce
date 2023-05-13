import React, { useState, useEffect } from 'react';
import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';
import './ProductCard.css';

function ProductCard({ relatedID, triggerFunction }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');

  const updateImageURL = () => {
    let imgURL = '';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStyles]);

  useEffect(() => {
    if (relatedID !== 10001) {
      const endpoints = [
        `/products/${relatedID}`,
        `/products/${relatedID}/styles`,
        `/reviews/meta?product_id=${relatedID}`,
      ];

      Promise.all(endpoints.map((endpoint) => parse.get(endpoint)))
        .then((res) => {
          console.log('this is all the data for a single RP', res);
          setProductInfo(res[0]);
          setProductStyles(res[1]);
          setRatings(res[2].ratings);
          let expandedTitle = `${res[0].name} - ${res[0].slogan ? res[0].slogan : ''}`;
          if (expandedTitle.length > 45) {
            expandedTitle = expandedTitle.slice(0, 45);
            expandedTitle += '...';
          }
          setTitle(expandedTitle);
        })
        .catch((err) => {
          console.log('promise.all err', err);
        });
    } else {
      const blankInfo = {
        category: 'Category',
        default_price: '$$',
      };
      const blankStyles = {
        results: [{
          photos: [{
            thumbnail_url: '',
          }],
        }],
      };
      const blankRatings = {
        1: '0',
        2: '0',
        3: '0',
        4: '0',
        5: '1',
      };
      setProductInfo(blankInfo);
      setProductStyles(blankStyles);
      setRatings(blankRatings);
      setTitle('Name and Description');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatedID]);

  return (
    <div className="cardContainer" role="button" tabIndex="0" onKeyDown={() => {}} onClick={() => triggerFunction(relatedID)}>
      <div className="imgDiv">
        <img className="relatedIMG" src={imageURL} alt="Coming soon!" />

        <button className="compareButton" type="button">★</button>

      </div>
      <div className="category">{productInfo ? productInfo.category : ''}</div>
      <div className="productName">{title}</div>
      <div className="price">{productInfo ? `$${productInfo.default_price}` : ''}</div>
      <Stars ratings={ratings} size={20} interactive={false} cb={() => {}} />
    </div>
  );
}

export default ProductCard;
