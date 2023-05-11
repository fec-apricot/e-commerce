import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';

const Host = styled.div`
  width: 65%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultView = styled.img`
  width: 100%;
  height: 100%;
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
