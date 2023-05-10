import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  OverviewContext,
  OverviewContextProvider,
} from './OverviewContext.jsx';
import ImageGallery from './ImageGallery.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Host = styled.div`
display: flex;
flex-direction: column;
`;

const TopContainer = styled.div`
display: flex;
`;

const WidgetPanel = styled.div`
display: flex;
flex-direction: column;
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
  const { product } = useContext(OverviewContext);

  return (
    <OverviewContextProvider>
      <Host>
        <TopContainer>
          <ImageGallery />
          <WidgetPanel>
            {/* <RatingContainer></RatingContainer> */}
            <Category>{product?.category}</Category>
            <Name>{product?.name}</Name>
            <Price>
              {product?.default_price}
            </Price>
            <StyleSelector />
            <AddToCart />
          </WidgetPanel>
        </TopContainer>
        <Description />
      </Host>
    </OverviewContextProvider>
  );
}

export default Overview;
