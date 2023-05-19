import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../GlobalContext.jsx';
import { OverviewContext } from './OverviewContext.jsx';
import ImageGallery from './image-gallery/ImageGallery.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import Stars from '../stars_module/Stars.jsx';

const Host = styled.div`
  width: 1200px;
  margin-left: -120px;
  height: fit-content;
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
  justify-content: space-around;
  padding: 16px 25px;
`;

const RatingsContainer = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-size: 20px;
`;
const Name = styled.div`
  font-weight: bold;
  font-size: 36px;
`;
const Price = styled.div`
  font-size: 16px;
`;
const ShareContainer = styled.div`
  margin-top: -15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

function Overview() {
  const { product, metadata } = useContext(GlobalContext);
  const { selectedStyle } = useContext(OverviewContext);

  return (
    <Host>
      <TopContainer>
        <ImageGallery />
        <WidgetPanel>
          <RatingsContainer>
            <Stars ratings={metadata?.ratings ? metadata.ratings : {}} cb={() => {}} />
            <span style={{ textDecoration: 'underline', padding: '4px 0 0 10px', fontSize: '12px' }}>Read all reviews</span>
          </RatingsContainer>
          <Category>{product?.category}</Category>
          <Name>{product?.name}</Name>
          <Price>
            <span>&#36;</span>
            <span style={{ color: 'red' }}>
              {selectedStyle?.sale_price || '' }
              &nbsp;
            </span>
            <span style={{ textDecoration: selectedStyle?.sale_price && 'line-through', fontStyle: selectedStyle?.sale_price && 'italic' }}>{selectedStyle?.original_price}</span>
          </Price>
          <StyleSelector />
          <AddToCart />
          <ShareContainer>
            <div
              className="fb-share-button"
              data-href="https://developers.facebook.com/docs/plugins/"
              data-layout=""
              data-size=""
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
                rel="noreferrer"
              >
                Share
              </a>
            </div>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
            <a
              data-pin-do="buttonBookmark"
              href="https://www.pinterest.com/pin/create/button/"
            >
            </a>
          </ShareContainer>
        </WidgetPanel>
      </TopContainer>
      <Description />
    </Host>
  );
}

export default Overview;
