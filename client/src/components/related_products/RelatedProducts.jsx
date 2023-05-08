import React from 'react';
import RowOne from './row1/RowOne.jsx';
import RowTwo from './row2/RowTwo.jsx';
// import styles from './Related.css';

function RelatedProducts() {
  return (
    <div>
      <RowOne className="row1" />
      <RowTwo />
    </div>
  );
}

export default RelatedProducts;
