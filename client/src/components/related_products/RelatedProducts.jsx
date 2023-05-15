import React, { useState, useEffect } from 'react';
import Carousel from './carousel/Carousel.jsx';
import './Related.css';

function RelatedProducts() {
  const [dataStore, setDataStore] = useState({});
  useEffect(() => {
    console.log('dataStore updated!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@', dataStore);
  }, [dataStore]);
  const yes = true; // Airbnb made me do it
  const no = false;
  return (
    <div className="widgetContainer">
      <Carousel rpMode={yes} setDataStore={setDataStore} />
      <Carousel rpMode={no} dataStore={dataStore} />
    </div>
  );
}

export default RelatedProducts;
