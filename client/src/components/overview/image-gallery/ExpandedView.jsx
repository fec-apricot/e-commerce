import React, { useState } from 'react';
import styled from 'styled-components';
import OverviewCarousel from './OverviewCarousel.jsx';
import Modal from '../../common/Modal.jsx';
import CloseIcon from '../../../assets/close-icon.png';

const Host = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(255,255,255,0.2);
    box-shadow: -2px 4px 8px 0 rgba(255,255,255,0.3);
  }
`;

function ExpandedView({ handleHide, initialDefaultViewIndex }) {
  const [defaultViewIndex, setDefaultViewIndex] = useState(initialDefaultViewIndex);
  const [thumbnailViewIndexStart, setThumbnailIndexStart] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const carouselProps = {
    defaultViewIndex,
    setDefaultViewIndex,
    thumbnailViewIndexStart,
    setThumbnailIndexStart,
    inExpandedView: true,
    handleClick: setShowMagnifier,
    showMagnifier,
    setShowMagnifier,
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: document.documentElement.clientHeight,
  };

  return (
    <Modal>
      <Host>
        <CloseButton
          onClick={() => {
            handleHide(false);
          }}
          data-testid="close-btn"
        >
          <img src={CloseIcon} alt="Close Logo" className="close-icon" data-testid="expanded-view" />
        </CloseButton>
        <OverviewCarousel {...carouselProps} />
      </Host>
    </Modal>
  );
}

export default ExpandedView;
