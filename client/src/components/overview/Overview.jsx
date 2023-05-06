import React, { useState, useEffect } from "react";
import parse from "../../parse.js";
import styled from "styled-components";
import ImageGallery from "./ImageGallery.jsx";
import Description from "./Description.jsx";
import StyleSelector from "./StyleSelector.jsx";
import AddToCart from "./AddToCart.jsx";

function Overview({ productID }) {
  const [product, setProduct] = useState({});
  useEffect(() => {
    parse
      .get(`http://localhost:3000/products/${productID}`)
      .then((data) => {
        setProduct(data);
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
    <Host>
      <TopContainer>
        <ImageGallery></ImageGallery>
        <WidgetPanel>
          {/* <RatingContainer></RatingContainer> */}
          <Category>{product.category}</Category>
          <Name>{product.name}</Name>
          <Price>{product.price}</Price>
          <StyleSelector></StyleSelector>
          <AddToCart></AddToCart>
        </WidgetPanel>
      </TopContainer>
      <Description></Description>
    </Host>
  );
}

export default Overview;
