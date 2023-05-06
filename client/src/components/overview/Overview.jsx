import React, { useState, useEffect, createContext } from 'react';
import parse from '../../parse.js';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const StyleContext = createContext();

function Overview({ productID }) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});

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
        setCurrentStyle(data.results[0]);
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

  const Category = styled.div``;
  const Name = styled.div``;
  const Price = styled.div``;

  return (
    <StyleContext.Provider value={(currentStyle, styles)}>
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
    </StyleContext.Provider>
  );
}

export default Overview;
