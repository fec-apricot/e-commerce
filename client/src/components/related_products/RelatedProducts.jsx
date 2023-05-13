import React from 'react';
import Carousel from './carousel/Carousel.jsx';
import './Related.css';

function RelatedProducts() {
  const yes = true; // Airbnb made me do it
  const no = false;
  return (
    <div className="widgetContainer">
      <Carousel rpMode={yes} />
      <Carousel rpMode={no} />
    </div>
  );
}

export default RelatedProducts;
