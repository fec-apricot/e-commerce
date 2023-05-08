import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ProductIDContext } from '../../App.jsx';
import parse from '../../../parse';
import RelatedCard from './RelatedCard.jsx';

const name = styled.div`
  display: inline;
`;

function RowOne() {
  const [productID, setProductID] = useContext(ProductIDContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    parse
      .get(`/products/${productID}/related`)
      .then((res) => {
        console.log('Related RowOne GET res', res);
        setRelated(res);
      })
      .then(() => {
        console.log('the related ids:', related);
      })
      .catch((err) => {
        console.log('Related RowOne GET err', err);
      });
  }, []);

  return (
    <div>
      {related.map((id) => <RelatedCard key={id} relatedID={id} />)}
    </div>
  );
}

export default RowOne;
