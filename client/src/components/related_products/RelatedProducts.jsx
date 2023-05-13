import React from 'react';
import Carousel from './carousel/Carousel.jsx';
import RowTwo from './row2/RowTwo.jsx';
import './Related.css';

function RelatedProducts() {
  const yes = true; // Airbnb made me do it
  const no = false;
  return (
    <div className="widgetContainer">
      <Carousel relatedProductsMode={yes} />
      <Carousel relatedProductsMode={no} />
    </div>
  );
}

export default RelatedProducts;
