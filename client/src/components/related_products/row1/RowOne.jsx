import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import RelatedCard from './RelatedCard.jsx';
import '../Related.css';

function RowOne() {
  const { productID, setProductID } = useContext(GlobalContext);
  const [related, setRelated] = useState([]);
  const [relatedID, setRelatedID] = useState(0);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      {
        related
          .map(
            (id) => {
              setRelatedID(id);
              return (
                <RelatedCard onClick={() => changeProduct(id)} key={id} relatedID={relatedID} />
              );
            },
          )
      }
    </div>
  );
}

export default RowOne;
