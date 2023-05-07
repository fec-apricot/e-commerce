import React, { useState, useEffect, createContext } from 'react';
import parse from '../../parse.js';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

export const ProductContext = createContext();

function Overview({ productID }) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    parse
      .get(`http://localhost:3000/products/${productID}`)
      .then((data) => {
        setProduct(data);
      })
      .then(() =>
        parse.get(`http://localhost:3000/products/${productID}/styles`)
      )
      .then((data) => {
        setStyles(data.results);
        setSelectedStyle(data.results[0]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

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

  return (
    <ProductContext.Provider
      value={{ product, selectedStyle, setSelectedStyle, styles }}
    >
      <Host>
        <TopContainer>
          <ImageGallery></ImageGallery>
          <WidgetPanel>
            {/* <RatingContainer></RatingContainer> */}
            <Category>{product.category}</Category>
            <Name>{product.name}</Name>
            <Price>${product.default_price}</Price>
            <StyleSelector></StyleSelector>
            <AddToCart></AddToCart>
          </WidgetPanel>
        </TopContainer>
        <Description></Description>
      </Host>
    </ProductContext.Provider>
  );
}

export default Overview;
