import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';

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

function Description() {
  const { product } = useContext(OverviewContext);

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
          <div key={feature.feature}>
            {feature.feature}
            :
            {feature.value}
          </div>
        ))}
      </FeatureContainer>
    </Host>
  );
}

export default Description;
