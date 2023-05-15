import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
// import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';
import './ProductCard.css';

function ProductCard({
  relatedID,
  triggerFunction,
  burn,
  rpMode,
  dataStore,
}) {
  const { productID } = useContext(GlobalContext);
  const [productIdNum, setProductIdNum] = useState(0);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');
  // const [isBtn, setIsBtn] = useState(false);
  // const [myInfo, setMyInfo] = useState({});

  const updateImageURL = () => {
    if (productStyles === undefined) { return; }
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

  const buildTitle = (id) => {
    let expandedTitle = `${dataStore[id][0].name} - ${dataStore[id][0].slogan ? dataStore[id][0].slogan : ''}`;
    if (expandedTitle.length > 45) {
      expandedTitle = expandedTitle.slice(0, 45);
      expandedTitle += '...';
    }
    setTitle(expandedTitle);
  };

  useEffect(() => {
    updateImageURL();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStyles, productID, burn]);

  useEffect(() => {
    console.log('------+++++++=======******* * * * * * productID changed', productID, relatedID);
    if (!rpMode) {
      // setProductIdNum(productID);
    }
  }, [productID]);

  useEffect(() => {
    if (!rpMode) { setProductIdNum(productID); }

    console.log(rpMode ? 'RP' : 'Outfit');
    console.log('my id: ', relatedID, ' and the dataStore:', dataStore);
    if (dataStore[relatedID] !== undefined && dataStore[relatedID][0] !== undefined) {
      console.log('Info made it to the card', dataStore[relatedID]);
      setProductInfo(dataStore[relatedID][0]);
      setProductStyles(dataStore[relatedID][1]);
      setRatings(dataStore[relatedID][2].ratings);
      buildTitle(relatedID);
    }
  }, [relatedID, dataStore[relatedID], burn, productID]);

  useEffect(() => {
    console.log('dataStore on card load', dataStore);
    if (relatedID === 0) {
      const value = `${productID}`;
      setProductIdNum(Number(value));
    } else {
      // setProductIdNum(relatedID);
    }
  }, []);

  return (
    <div
      className="cardContainer"
      role="button"
      tabIndex="0"
      onKeyDown={() => {}}
      onClick={(e) => {
        e.preventDefault();
        // triggerFunction(isBtn ? productIdNum : relatedID); // was relatedID
        triggerFunction(relatedID);
      }}
    >
      <div className="imgDiv">
        <img className="relatedIMG" src={imageURL} alt="Coming soon!" />

        <button
          className="compareButton"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('compare button pressed');
          }}
        >
          {rpMode ? '★' : 'x'}
        </button>

      </div>
      <div className="category">{productInfo ? productInfo.category : ''}</div>
      <div className="productName">{title}</div>
      <div className="price">{productInfo.default_price ? `$${productInfo.default_price}` : ''}</div>
      <Stars ratings={ratings} size={20} interactive={false} cb={() => {}} />
    </div>
  );
}

export default ProductCard;
