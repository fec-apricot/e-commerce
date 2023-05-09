import React, { useState, useContext, useEffect } from 'react';
import { ProductIDContext } from '../../App.jsx';
import parse from '../../../parse';
import RelatedCard from './RelatedCard.jsx';
import '../Related.css';

function RowOne() {
  const { productID, setProductID } = useContext(ProductIDContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    parse
      .get(`/products/${productID}/related`)
      .then((res) => {
        console.log('Related RowOne GET res', res);
        setRelated(res);
      })
      .catch((err) => {
        console.log('Related RowOne GET err', err);
      });
  }, []);

  return (
    <div className="row">
      {related.map((id) => <RelatedCard key={id} relatedID={id} />)}
    </div>
  );
}

export default RowOne;
