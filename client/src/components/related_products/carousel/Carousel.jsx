import React, { useState, useContext, useEffect, useRef, useLayoutEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
// import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel({
  rpMode,
  dataStore,
  related,
  burn,
  outfitToggle,
  outfitList,
}) {
  const { productID, setProductID } = useContext(GlobalContext);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slide2Index, setSlide2Index] = useState(0);

  const trackLimit = (rpMode ? 5 : 4);
  const productSlider = document.querySelector('.productTrack');

  const changeProduct = (newID) => {
    if (newID === 10001) { return; }
    setProductID(newID);
    productSlider.style.setProperty('--slider-index', 0);
    productSlider.style.setProperty('--slider2-index', 0);
    setSlideIndex(0);
    setSlide2Index(0);
    // setOutfitBtnID(newID);
  };

  const slide = (direction) => {
    if (rpMode) {
      const index = Number(productSlider.style.getPropertyValue('--slider-index'));
      if (direction === 'left') {
        productSlider.style.setProperty('--slider-index', index - 1);
        setSlideIndex(slideIndex - 1);
      } else {
        productSlider.style.setProperty('--slider-index', index + 1);
        setSlideIndex(slideIndex + 1);
      }
      console.log('rp slide index:', Number(productSlider.style.getPropertyValue('--slider-index')));
    } else {
      const index = Number(productSlider.style.getPropertyValue('--slider2-index'));
      if (direction === 'left') {
        productSlider.style.setProperty('--slider2-index', index - 1);
        setSlide2Index(slide2Index - 1);
      } else {
        productSlider.style.setProperty('--slider2-index', index + 1);
        setSlide2Index(slide2Index + 1);
      }
      console.log('outfit slide index:', Number(productSlider.style.getPropertyValue('--slider2-index')));
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div className="carousel">
      <ul className="productTrack">
        {(rpMode ? (slideIndex < 1) : (slide2Index < 1)) ? '' : (
          <button
            className="carouselButton productLeft"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              slide('left');
            }}
          >
            &lt;
          </button>
        )}
        {rpMode ? '' : (
          <li key={productID} className={`AddToOutfitBtn ${productID}`}>
            <ProductCard
              relatedID={productID}
              triggerFunction={outfitToggle}
              // products={products}
              burn={burn}
              rpMode={rpMode}
              dataStore={dataStore}
            />
          </li>
        )}
        {
          (rpMode ? related : outfitList)
            .map((id, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${id}-${index}`} className={`${rpMode ? 'productCard-slide' : 'outfitCard-slide'} ${id}`}>
                <ProductCard
                  relatedID={id}
                  triggerFunction={changeProduct}
                  // products={products}
                  burn={burn}
                  rpMode={rpMode}
                  dataStore={dataStore}
                />
              </li>
            ))
        }
        {(rpMode ? (related.length - slideIndex < trackLimit) : (outfitList.length - slide2Index < trackLimit)) ? '' : (
          <button
            className="carouselButton productRight"
            type="button"
            onClick={(e) => {
              e.preventDefault();
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
