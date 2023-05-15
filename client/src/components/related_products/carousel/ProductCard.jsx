import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
// import parse from '../../../parse';
import Stars from '../stars_module/Stars.jsx';
import './ProductCard.css';

function ProductCard({
  relatedID,
  triggerFunction,
  products,
  details,
  burn,
  allProducts,
  rpMode,
}) {
  const { productID } = useContext(GlobalContext);
  const [productIdNum, setProductIdNum] = useState(0);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');
  const [isBtn, setIsBtn] = useState(false);
  const [myInfo, setMyInfo] = useState({});
  const backup = useRef({});

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
    let expandedTitle = `${products[id][0].name} - ${products[id][0].slogan ? products[id][0].slogan : ''}`;
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
  }, [productID]);

  useEffect(() => {
    if (relatedID === productID) {
      setIsBtn(true);
      setProductIdNum(productID);
      console.log('reset buttons productIdNum to????????????', productID);
    }
    // if (isBtn) {
    //   setProductIdNum(productID);
    // }
    console.log('my id: ', relatedID, ' my products: ', products[relatedID], ' my details: ', details, ' and allProducts: ', allProducts);
    if (products[productIdNum] !== undefined) {
      console.log('Info made it to the card', products[productIdNum]);
      setProductInfo(products[productIdNum][0]);
      setProductStyles(products[productIdNum][1]);
      setRatings(products[productIdNum][2].ratings);
      buildTitle(productIdNum);
      backup.current = allProducts.current;
    }
    console.log('backup------>>>>>', backup);
  }, [products[relatedID], productIdNum]);

  useEffect(() => {
    console.log('the details+++++++========', details, products);
    console.log('the diff? ', productID, relatedID);
    if (relatedID === 0) {
      const value = `${productID}`;
      setProductIdNum(Number(value));
    } else {
      setProductIdNum(relatedID);
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
        triggerFunction(isBtn ? productIdNum : relatedID); // was relatedID
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
