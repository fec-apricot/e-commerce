import React, { useState } from 'react';
import styled from 'styled-components';
import OverviewCarousel from './OverviewCarousel.jsx';
import ExpandedView from './ExpandedView.jsx';

const Host = styled.div`
  position: relative;
  width: 65%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ImageGallery() {
  const [defaultViewIndex, setDefaultViewIndex] = useState(0);
  const [thumbnailViewIndexStart, setThumbnailIndexStart] = useState(0);
  const [showExpandedView, setShowExpandedView] = useState(false);

  const carouselProps = {
    defaultViewIndex,
    setDefaultViewIndex,
    thumbnailViewIndexStart,
    setThumbnailIndexStart,
    inExpandedView: false,
    handleClick: setShowExpandedView,
  };

  return (
    <Host>
      {showExpandedView
      && (
        <ExpandedView handleHide={setShowExpandedView} />
      )}
      <OverviewCarousel {...carouselProps} />
    </Host>
  );
}

export default ImageGallery;
