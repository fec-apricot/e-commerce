import React, { useState, useEffect } from 'react';
import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';
import '../Related.css';

function RelatedCard({ relatedID, changeProduct }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStyles]);

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
  }, [relatedID]);

  return (
    <div className="card" role="button" tabIndex="0" onKeyDown={() => {}} onClick={() => changeProduct(relatedID)}>
      <div className="imgDiv">
        <img className="relatedIMG" src={imageURL} alt="Coming soon!" />
        <div className="btnDiv">
          <button className="compareButton" type="button">Compare</button>
        </div>
      </div>
      <div className="category">{productInfo ? productInfo.category : ''}</div>
      <div className="productName">{title}</div>
      <div className="price">{productInfo ? `$${productInfo.default_price}` : ''}</div>
      <Stars ratings={ratings} size={20} interactive={false} />
    </div>
  );
}

export default RelatedCard;
