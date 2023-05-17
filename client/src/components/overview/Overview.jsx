import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../GlobalContext.jsx';
import { OverviewContext } from './OverviewContext.jsx';
import ImageGallery from './image-gallery/ImageGallery.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Host = styled.div`
  width: 125%;
  height: fit-content;
  margin-left: -100px;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 600px;
`;

const WidgetPanel = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 25px;
`;

const Category = styled.div`
  font-size: 20px;
`;
const Name = styled.div`
  font-weight: bold;
  font-size: 40px;
`;
const Price = styled.div`
  font-size: 20px;
`;

function Overview() {
  const { product } = useContext(GlobalContext);
  const { selectedStyle } = useContext(OverviewContext);

  return (
    <Host>
      <TopContainer>
        <ImageGallery />
        <WidgetPanel>
          {/* <RatingContainer></RatingContainer> */}
          <Category>{product?.category}</Category>
          <Name>{product?.name}</Name>
          <Price>
            <span>&#36;</span>
            <span style={{ color: 'red' }}>{selectedStyle?.sale_price || '' }</span>
            <span style={{ textDecoration: selectedStyle?.sale_price && 'line-through' }}>{selectedStyle?.original_price}</span>
          </Price>
          <StyleSelector />
          <AddToCart />
        </WidgetPanel>
      </TopContainer>
      <Description />
    </Host>
  );
}

export default Overview;
