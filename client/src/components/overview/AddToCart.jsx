import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import parse from '../../parse';
import { OverviewContext } from './OverviewContext.jsx';

const Host = styled.div`
  height: 25%;
  margin: 0 10px;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SelectContainer = styled.div`
  position: relative;
  height: 60px;
  margin: 0;
  &.size-selector {
    width: 220px;
  }
  &.qty-selector {
    width: 120px;
  }
`;

const SelectLabel = styled.select`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid slategrey;
  border-radius: 3px;
  color: #111;
  padding-left: 10px;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

const DropdownItem = styled.option`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.15rem 0.5rem;
  font-size: 0.9rem;
  color: #333;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover, :focus, :focus:hover {
    background-color: #166edc;
    color: #fafafa;
    outline: none;
  }
`;

const Button = styled.button`
  height: 60px;
  border: 1px solid slategrey;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  &.add-btn {
    width: 280px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .add-icon {
    font-size: 25px;
    font-weight: light;
    color: grey;
  }
  &.collect-btn {
    width: 60px;
  }
`;

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

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  // };

  return (
    <Host>
      <FormContainer>
        <SelectContainer className="size-selector">
          <SelectLabel
            name="size"
            value={selectedSku}
            disabled={!isInStock}
            onChange={(event) => {
              event.preventDefault();
              setSelectedSku(event.target.value);
              setSelectedQty(1);
            }}
          >
            <DropdownItem value="">
              {isInStock ? 'SELECT SIZE' : 'OUT OF STOCK'}
            </DropdownItem>
            {_.map(
              skus,
              (value, key) => value.quantity && (
                <option key={key} value={key}>
                    {value.size}
                </option>
              ),
            )}
          </SelectLabel>
        </SelectContainer>
        <SelectContainer className="qty-selector">
          <SelectLabel
            name="qty"
            value={selectedSku && selectedQty}
            disabled={selectedSku === ''}
            onChange={(event) => {
              event.preventDefault();
              setSelectedQty(event.target.value);
            }}
          >
            <DropdownItem value="">
              -
            </DropdownItem>
            {skus[selectedSku]
            && _.range(1, Math.min(16, skus[selectedSku].quantity + 1)).map(
              (qty) => <DropdownItem key={qty}>{qty}</DropdownItem>,
            )}
          </SelectLabel>
        </SelectContainer>
        <Button className="add-btn" onClick={handleSubmit}>
          <span>ADD TO BAG</span>
          <span className="add-icon">&#43;</span>
        </Button>
        <Button className="collect-btn">&#9734;</Button>
      </FormContainer>
    </Host>
  );
}

export default AddToCart;
