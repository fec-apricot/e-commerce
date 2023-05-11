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
    <div className="carousel">
      <ul className="productTrack">
        <button className="carouselButton productLeft" type="button">&lt;</button>
        {
          related
            .map(
              (id) => (
                <li key={id} className="productCard-slide">
                  <RelatedCard relatedID={id} changeProduct={changeProduct} />
                </li>
              ),
            )
        }
        <button className="carouselButton productRight" type="button">&gt;</button>
      </ul>
    </div>
  );
}

export default RowOne;
