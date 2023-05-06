import React, { useContext } from "react";
import { ProductContext } from "./Overview.jsx";
import styled from "styled-components";

function Description() {
  const { product } = useContext(ProductContext);
  const Host = styled.div`
    display: flex;
    margin: 20px 60px 20px 60px;
  `;

  const SloganAndDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  `;

  const Slogan = styled.div`
    font-weight: bold;
  `;

  const DescriptionContent = styled.div`
    margin-top: 20px;
  `;

  const VerticalLine = styled.div`
    border-left: 2px solid grey;
    height: 160px;
  `;

  const FeatureContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  `;

  return (
    <Host>
      <SloganAndDescriptionContainer>
        <Slogan>{product.slogan}</Slogan>
        <DescriptionContent>{product.description}</DescriptionContent>
      </SloganAndDescriptionContainer>
      <VerticalLine></VerticalLine>
      <FeatureContainer>
        {product.features &&
          product.features.map((feature, index) => (
            <div key={index}>
              {feature.feature}: {feature.value}
            </div>
          ))}
      </FeatureContainer>
    </Host>
  );
}

export default Description;
