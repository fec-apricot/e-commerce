import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';

const Host = styled.div``;
const DefaultView = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

function ImageGallery() {
  const { selectedStyle } = useContext(OverviewContext);

  const defaultPhoto = selectedStyle.photos;
  return (
    <Host>
      <DefaultView src={defaultPhoto && defaultPhoto[0]?.url} />
    </Host>
  );
}

export default ImageGallery;
