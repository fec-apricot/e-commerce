import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import parse from '../../parse';
import { OverviewContext } from './OverviewContext.jsx';
import DropdownIcon from '../../assets/dropdown-icon.svg';

const Host = styled.div`
  height: 30%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 80%;
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

const DropdownBtn = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
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
    background-color: rgb(243, 239, 243);
  }
  & .dropdown-icon {
    height: 20px;
    width: 20px;
  }
`;

const DropdownList = styled.div`
  width: 100%;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 1px solid slategrey;
  border-radius: 3px;
`;

const DropdownItem = styled.a`
  display: block;
  align-items: center;
  padding: 12px 16px;
  font-size: 0.9rem;
  text-decoration: none;
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
  background-color: white;
  border: 1px solid slategrey;
  color: rgb(81, 82, 83);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgb(243, 239, 243);
  }
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

const Notification = styled.div`
  height: 5%;
`;

function AddToCart() {
  const { selectedStyle } = useContext(OverviewContext);
  const [skus, setSkus] = useState({});
  const [sizeDropdownExpanded, setSizeDropdownExpanded] = useState(false);
  const [qtyDropdownExpanded, setQtyDropdownExpanded] = useState(false);
  const [selectedSku, setSelectedSku] = useState('');
  const [isInStock, setIsInStock] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectSizeMsgVisible, setSelectSizeMsgVisible] = useState(false);
  const [addToCartMsgVisible, setAddToCartMsgVisible] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedSku === '') {
      setSelectSizeMsgVisible(true);
      setSizeDropdownExpanded(true);
      setTimeout(() => {
        setSelectSizeMsgVisible(false);
      }, 5000);
    } else {
      parse.post('/cart', { sku_id: selectedSku }).then(() => {
        setAddToCartMsgVisible(true);
        setTimeout(() => {
          setAddToCartMsgVisible(false);
        }, 5000);
      }).catch();
    }
  };

  const getSelectSizeBtnContent = () => {
    if (!isInStock) {
      return 'OUT OF STOCK';
    }
    if (selectedSku !== '') {
      return skus[selectedSku].size;
    }
    return 'SELECT SIZE';
  };

  const getSelectQtyBtnContent = () => {
    if (selectedSku === '') {
      return '-';
    }
    return selectedQty;
  };

  return (
    <Host>
      <Notification>{selectSizeMsgVisible && <div>Please select size</div>}</Notification>
      <MainContainer>
        <SelectContainer className="size-selector">
          <DropdownBtn
            disabled={!isInStock}
            onClick={(event) => {
              event.preventDefault();
              setSizeDropdownExpanded(!sizeDropdownExpanded);
            }}
            data-testid="size-dropdown-btn"
          >
            <span>{getSelectSizeBtnContent()}</span>
            <span><img src={DropdownIcon} alt="Dropdown Logo" className="dropdown-icon" /></span>
          </DropdownBtn>
          {sizeDropdownExpanded
          && (
            <DropdownList
              onMouseLeave={() => {
                setSizeDropdownExpanded(false);
              }}
              data-testid="size-dropdown-list"
            >
                {_.map(
                  skus,
                  (value, key) => value.quantity && (
                    <DropdownItem
                      key={key}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedSku(key);
                        setSelectedQty(1);
                        setSizeDropdownExpanded(false);
                      }}
                      data-testid={`size-item-${key}`}
                    >
                        {value.size}
                    </DropdownItem>
                  ),
                )}
            </DropdownList>
          )}
        </SelectContainer>
        <SelectContainer className="qty-selector">
          <DropdownBtn
            disabled={selectedSku === ''}
            onClick={(event) => {
              event.preventDefault();
              setQtyDropdownExpanded(!qtyDropdownExpanded);
            }}
            data-testid="qty-dropdown-btn"
          >
            <span>{getSelectQtyBtnContent()}</span>
            <span><img src={DropdownIcon} alt="Dropdown Logo" className="dropdown-icon" /></span>
          </DropdownBtn>
          {qtyDropdownExpanded
            && (
              <DropdownList
                onMouseLeave={() => {
                  setQtyDropdownExpanded(false);
                }}
                data-testid="qty-dropdown-list"
              >
                {skus[selectedSku]
                && _.range(1, Math.min(16, skus[selectedSku].quantity + 1)).map(
                  (qty) => (
                    <DropdownItem
                      key={qty}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedQty(qty);
                        setQtyDropdownExpanded(false);
                      }}
                      data-testid={`qty-item-${qty}`}
                    >
                      {qty}
                    </DropdownItem>
                  ),
                )}
              </DropdownList>
            )}
        </SelectContainer>
        <Button className="add-btn" onClick={handleSubmit} data-testid="add-to-cart-btn">
          <span>ADD TO BAG</span>
          <span className="add-icon">&#43;</span>
        </Button>
        <Button className="collect-btn">&#9734;</Button>
      </MainContainer>
      <Notification>{addToCartMsgVisible && <div>Added to cart!</div>}</Notification>
    </Host>
  );
}

export default AddToCart;
