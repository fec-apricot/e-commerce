import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../GlobalContext.jsx';

const Host = styled.div`
  width: 76%;
  display: flex;
  margin: 50px 100px;
`;

const SloganAndDescriptionContainer = styled.div`
  width: 75%;
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
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

function Description() {
  const { product } = useContext(GlobalContext);

  return (
    <Host>
      <SloganAndDescriptionContainer>
        <Slogan>{product?.slogan}</Slogan>
        <DescriptionContent>{product?.description}</DescriptionContent>
      </SloganAndDescriptionContainer>
      <VerticalLine />
      <FeatureContainer>
        {product?.features
        && product.features.map((feature) => (
          <div key={feature.feature}>
            {feature.feature}
            :&nbsp;
            {feature.value}
          </div>
        ))}
      </FeatureContainer>
    </Host>
  );
}

export default Description;
