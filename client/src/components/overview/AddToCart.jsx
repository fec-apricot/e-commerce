import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { OverviewContext } from './OverviewContext.jsx';

function AddToCart() {
  const { selectedStyle } = useContext(OverviewContext);
  const [skus, setSkus] = useState({});
  const [selectedSku, setSelectedSku] = useState('');
  const [isInStock, setIsInStock] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    const { skus: newSkus } = selectedStyle;
    if (newSkus) {
      setSkus(newSkus);
      setSelectedSku('');
      setIsInStock(
        _.some(Object.keys(newSkus), (key) => newSkus[key].quantity > 0),
      );
    }
  }, [selectedStyle]);

  const Host = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

  const SizeSelector = styled.div``;
  const QtySelector = styled.div``;

  return (
    <Host>
      <SizeSelector>
        <form>
          <select
            name="size"
            value={selectedSku}
            disabled={!isInStock}
            onChange={(event) => {
              event.preventDefault();
              setSelectedSku(event.target.value);
              setSelectedQty(1);
            }}
          >
            <option value="" hidden>
              {isInStock ? 'SELECT SIZE' : 'OUT OF STOCK'}
            </option>
            {_.map(
              skus,
              (value, key) => value.quantity && (
                <option key={key} value={key}>
                    {value.size}
                </option>
              ),
            )}
          </select>
        </form>
      </SizeSelector>
      <QtySelector>
        <form>
          <select
            name="qty"
            value={selectedSku && selectedQty}
            disabled={selectedSku === ''}
            onChange={(event) => {
              event.preventDefault();
              setSelectedQty(event.target.value);
            }}
          >
            <option value="" hidden>
              -
            </option>
            {skus[selectedSku]
            && _.range(1, Math.min(16, skus[selectedSku].quantity + 1)).map(
              (qty) => <option key={qty}>{qty}</option>,
            )}
          </select>
        </form>
      </QtySelector>
    </Host>
  );
}

export default AddToCart;
