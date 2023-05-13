import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel({ rpMode }) {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [outfit, setOutfit] = useState([]);
  const [currentProductInOutfit, setCurrentProductInOutfit] = useState(false);

  const productSlider = document.querySelector('.productTrack');

  const changeProduct = (newID) => {
    setProductID(newID);
    productSlider.style.setProperty('--slider-index', 0);
    setSlideIndex(0);
  };

  const slide = (direction) => {
    const index = Number(productSlider.style.getPropertyValue('--slider-index'));
    if (direction === 'left') {
      productSlider.style.setProperty('--slider-index', index - 1);
      setSlideIndex(slideIndex - 1);
    } else {
      productSlider.style.setProperty('--slider-index', index + 1);
      setSlideIndex(slideIndex + 1);
    }
    // console.log(Number(productSlider.style.getPropertyValue('--slider-index')));
  };

  const addBlanksToOutfit = (list) => {
    if (list.length < 3) {
      for (let i = list.length; i < 3; i += 1) {
        list.push(10001); // blank product
      }
    }
    return list;
  };

  const toggleOutfitProduct = () => {
    const outfitList = [...outfit];
    const index = outfitList.indexOf(productID);
    if (index === -1) {
      setOutfit([productID, ...outfitList]);
    } else {
      outfitList.splice(index, 1);
      setOutfit(outfitList);
    }
  };

  useEffect(() => {
    if (rpMode) {
      parse
        .get(`/products/${productID}/related`)
        .then((res) => {
          setRelated(res);
        })
        .catch((err) => {
          console.log('RP Carousel GET err', err);
        });
    } else {
      setRelated(outfit);
    }
  }, [productID, outfit]);

  useEffect(() => {
    let localList = [];
    if (localList.indexOf(productID) === -1) {
      setCurrentProductInOutfit(false);
    } else {
      setCurrentProductInOutfit(true);
    }
    localList = addBlanksToOutfit(localList);
    setOutfit(localList); // set to outfit stored in local storage or nothing
  }, []);

  return (
    <div className="carousel">
      <ul className="productTrack">
        {slideIndex < 1 ? '' : (
          <button
            className="carouselButton productLeft"
            type="button"
            onClick={() => {
              slide('left');
            }}
          >
            &lt;
          </button>
        )}
        {rpMode ? '' : (
          <li key="addToOutfitButton" className={`${rpMode ? 'productCard-slide' : 'outfitCard-slide'} AddToOutfitBtn`}>
            <ProductCard relatedID={productID} triggerFunction={toggleOutfitProduct} />
          </li>
        )}
        {
          related
            .map((id, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${id}-${index}`} className="productCard-slide">
                <ProductCard relatedID={id} triggerFunction={changeProduct} />
              </li>
            ))
        }
        {related.length - slideIndex < 5 ? '' : (
          <button
            className="carouselButton productRight"
            type="button"
            onClick={() => {
              slide('right');
            }}
          >
            &gt;
          </button>
        )}
      </ul>
    </div>
  );
}

export default Carousel;
