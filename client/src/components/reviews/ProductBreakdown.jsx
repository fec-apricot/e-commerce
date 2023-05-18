import React, { useState, useEffect } from 'react';
import DetailBar from './DetailBar.jsx';

function ProductBreakdown({ productID, characteristics }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (characteristics) {
      setDetails(Object.keys(characteristics).map((key) => [key, characteristics[key]]));
    }
  }, [productID, characteristics]);

  return (
    <>
      <h3>Product Breakdown</h3>
      <div className="product-breakdown-background">
        {details.map((detail) => <DetailBar detail={detail} key={detail[1].id} />)}
      </div>
    </>
  );
}

export default ProductBreakdown;
