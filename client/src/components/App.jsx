import React, { useState, useEffect } from 'react';
import Overview from './overview/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import Questions from './questions/Questions.jsx';
import Reviews from './reviews/Reviews.jsx';
import parse from '../parse';

function App() {
  const [productID, setProductID] = useState(40344);

  useEffect(() => {
    parse.get(`/products/${productID}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>HEllo!!</div>
      <Overview productID={productID} />
      <RelatedProducts productID={productID} setProductID={setProductID} />
      <Questions productID={productID} />
      <Reviews productID={productID} />
    </div>
  );
}

export default App;
