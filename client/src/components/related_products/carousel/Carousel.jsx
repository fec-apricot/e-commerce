import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel() {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);

  const changeProduct = (newID) => {
    setProductID(newID);
  };

  const productSlider = document.querySelector('.productTrack');

  const slide = (direction) => {
    console.log('------>', productSlider, direction);
    const index = Number(productSlider.style.getPropertyValue('--slider-index'));
    console.log('------index---->', index);
    if (direction === 'left') {
      productSlider.style.setProperty('--slider-index', index - 1);
    } else {
      productSlider.style.setProperty('--slider-index', index + 1);
    }
  };
  // const resizeTrack = () => {
  //   console.log('window.innerWidth------>', window.innerWidth);
  //   trackWidth.style.setProperty('--slider-index', Math.floor(window.innerWidth / 228));
  // };

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
        <button
          className="carouselButton productLeft"
          type="button"
          onClick={() => {
            slide('left');
          }}
        >
          &lt;
        </button>
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
        <button
          className="carouselButton productRight"
          type="button"
          onClick={() => {
            slide('right');
          }}
        >
          &gt;
        </button>
      </ul>
    </div>
  );
}

export default Carousel;
