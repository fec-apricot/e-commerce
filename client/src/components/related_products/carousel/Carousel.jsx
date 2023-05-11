import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel() {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const productSlider = document.querySelector('.productTrack');

  const changeProduct = (newID) => {
    setProductID(newID);
    productSlider.style.setProperty('--slider-index', 0);
    setSlideIndex(0);
  };

  const slide = (direction) => {
    const index = Number(productSlider.style.getPropertyValue('--slider-index'));
    console.log('------>', productSlider, direction);
    console.log('------index---->', index);
    if (direction === 'left') {
      productSlider.style.setProperty('--slider-index', index - 1);
      setSlideIndex(slideIndex - 1);
    } else {
      productSlider.style.setProperty('--slider-index', index + 1);
      setSlideIndex(slideIndex + 1);
    }
    console.log(Number(productSlider.style.getPropertyValue('--slider-index')));
  };

  useEffect(() => {
    parse
      .get(`/products/${productID}/related`)
      .then((res) => {
        console.log('Related Carousel GET res', res);
        setRelated(res);
      })
      .catch((err) => {
        console.log('Related Carousel GET err', err);
      });
  }, [productID]);

  return (
    <div className="carousel">
      <ul className="productTrack">
        {slideIndex < 1 ? ''
          : (
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
            .map(
              (id) => (
                <li key={id} className="productCard-slide">
                  <ProductCard relatedID={id} changeProduct={changeProduct} />
                </li>
              ),
            )
        }
        {related.length - slideIndex < 5 ? ''
          : (
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
