import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Host = styled.div`
  width: 76%;
  display: flex;
  margin: 50px 120px;
`;

const SloganAndDescriptionContainer = styled.div`
  width: 71%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Slogan = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const DescriptionContent = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

const VerticalLine = styled.div`
  border-left: 3px solid grey;
  height: 160px;
`;

const FeatureContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

function Description() {
  const product = useSelector((state) => state.overview.product);

  return (
    <Host>
      <SloganAndDescriptionContainer>
        <Slogan>{product.slogan}</Slogan>
        <DescriptionContent>{product.description}</DescriptionContent>
      </SloganAndDescriptionContainer>
      <VerticalLine />
      <FeatureContainer>
        {product.features
        && product.features.map((feature) => (
          <div key={feature.feature} style={{ height: '30px', fontSize: '15px' }}>
            &#10003;&nbsp;&nbsp;
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
