import React from 'react';
import Carousel from './carousel/Carousel.jsx';
import RowTwo from './row2/RowTwo.jsx';
import './Related.css';

function RelatedProducts() {
  return (
    <div className="widgetContainer">
      <Carousel className="row1" />
      <RowTwo />
    </div>
  );
}

export default RelatedProducts;
