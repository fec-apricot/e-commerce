import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import Stars from '../stars_module/Stars.jsx';
import './ProductCard.css';

function ProductCard({
  relatedID,
  triggerFunction,
  burn,
  rpMode,
  dataStore,
  outfitToggle,
  outfitButton,
  openModal,
}) {
  const { productID } = useContext(GlobalContext);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [ratings, setRatings] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const updateImageURL = () => {
    if (productStyles === undefined) { return; }
    let imgURL = '';
    if (productStyles.results) {
      for (let i = 0; i < productStyles.results.length; i += 1) {
        if (productStyles.results[i]['default?'] === true) {
          imgURL = productStyles.results[i].photos[0].thumbnail_url;
          setPrice(productStyles.results[i].original_price);
          setSalePrice(productStyles.results[i].sale_price);
          break;
        }
      }
      if (imgURL === '') {
        imgURL = productStyles.results[0].photos[0].thumbnail_url;
        setPrice(productStyles.results[0].original_price);
        setSalePrice(productStyles.results[0].sale_price);
      }
    }
    setImageURL(imgURL);
  };

  const buildTitle = (id) => {
    let expandedTitle = `${dataStore[id][0].name} - ${dataStore[id][0].slogan ? dataStore[id][0].slogan : ''}`;
    if (expandedTitle.length > 40) {
      expandedTitle = expandedTitle.slice(0, 40);
      expandedTitle += '...';
    }
    setTitle(expandedTitle);
  };

  useEffect(() => {
    updateImageURL();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStyles, productID, burn]);

  useEffect(() => {
    if (dataStore[relatedID] !== undefined && dataStore[relatedID][0] !== undefined) {
      setProductInfo(dataStore[relatedID][0]);
      setProductStyles(dataStore[relatedID][1]);
      setRatings(dataStore[relatedID][2].ratings);
      buildTitle(relatedID);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatedID, dataStore[relatedID], burn, productID]);

  return (
    <div
      className="cardContainer"
      role="button"
      tabIndex="0"
      onKeyDown={() => {}}
      onClick={(e) => {
        e.preventDefault();

        if (outfitButton) {
          outfitToggle();
        } else {
          triggerFunction(relatedID);
        }
      }}
    >
      <div className="imgDiv">
        <img className="relatedIMG" src={imageURL} alt="Coming soon!" />

        {outfitButton ? '' : (
          <button
            className="compareButton"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (rpMode) {
                openModal(relatedID);
              } else {
                outfitToggle(relatedID);
              }
            }}
          >
            {rpMode ? '★' : 'x'}
          </button>
        )}

      </div>
      <div className="category">{productInfo ? productInfo.category : ''}</div>
      <div className="productName">{title}</div>
      <div className="priceContainer">
        <div className="sale">{salePrice !== null ? salePrice : ''}</div>
        <div className={salePrice !== null ? 'price strike' : 'price'}>{price}</div>
      </div>
      <Stars ratings={ratings} size={20} interactive={false} cb={() => {}} />
    </div>
  );
}

export default ProductCard;
