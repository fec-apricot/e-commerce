import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel({ relatedProductsMode }) {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [outfit, setOutfit] = useState([]);
  const blankProduct = 10001;

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
        list.push(blankProduct);
      }
    }
    return list;
  };

  useEffect(() => {
    if (relatedProductsMode) {
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
        {
          related
            .map((id, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${id}-${index}`} className="productCard-slide">
                <ProductCard relatedID={id} changeProduct={changeProduct} />
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
