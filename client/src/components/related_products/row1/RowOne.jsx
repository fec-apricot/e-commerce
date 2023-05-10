import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import RelatedCard from './RelatedCard.jsx';
import '../Related.css';

function RowOne() {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);

  const changeProduct = (newID) => {
    setProductID(newID);
  };

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
  }, [productID]);

  return (
    <ul className="row productTrack">
      {
        related
          .map(
            (id) => (
              <li key={id} className="productCard-li">
                <RelatedCard relatedID={id} changeProduct={changeProduct} />
              </li>
            ),
          )
      }
    </ul>
  );
}

export default RowOne;
