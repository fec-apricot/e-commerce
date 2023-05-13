import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';
import DropdownLogo from '../../assets/dropdown-icon.svg';

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

const DefaultView = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ThumbnailViewContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 10px;
  width: 90px;
  height: 600px;
  display: felx;
  flex-direction: column;
  justify-content: space-between;
`;

const ThumbnailView = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  &.prev-left {
    top: 50%;
    left: 100px;
  }
  &.next-right {
    top: 50%;
    right: 30px;
  }
  &.prev-up {
    top: 15px;
    left: 30px;
    rotate: 180deg;
  }
  &.next-down {
    bottom: 15px;
    left: 30px;
  }
`;

function ImageGallery() {
  const { selectedStyle } = useContext(OverviewContext);
  const { photos } = selectedStyle;
  const [defaultViewIndex, setDefaultViewIndex] = useState(0);
  const [thumbnailViewIndexStart, setThumbnailIndexStart] = useState(0);
  const MAXTHUMBNAILVIEWLENGTH = 3;

  const handleScrollHorizontal = (direction) => {
    setDefaultViewIndex((prevIndex) => prevIndex + direction);
    if (defaultViewIndex < thumbnailViewIndexStart) {
      setThumbnailIndexStart((prevIndex) => prevIndex - 1);
    } else if (defaultViewIndex >= thumbnailViewIndexStart + MAXTHUMBNAILVIEWLENGTH - 1) {
      setThumbnailIndexStart((prevIndex) => prevIndex + 1);
    }
  };

  const handleScrollVertical = (direction) => {
    setThumbnailIndexStart((prevIndex) => prevIndex + direction);
  };

  return (
    <Host>
      <DefaultView src={photos && photos[defaultViewIndex]?.url} />
      {defaultViewIndex > 0
      && (
        <Button
          className="prev-left"
          onClick={() => {
            handleScrollHorizontal(-1);
          }}
        >
          ←
        </Button>
      )}
      {/* eslint-disable-next-line no-unsafe-optional-chaining */}
      {defaultViewIndex < photos?.length - 1
      && (
        <Button
          className="next-right"
          onClick={() => {
            handleScrollHorizontal(1);
          }}
        >
          →
        </Button>
      )}
      <ThumbnailViewContainer>
        {photos?.map((photo, index) => (
          thumbnailViewIndexStart <= index
          && index < thumbnailViewIndexStart + MAXTHUMBNAILVIEWLENGTH
          && (
            <ThumbnailView
              src={photo.thumbnail_url}
              key={photo.thumbnail_url}
              onClick={() => {
                setDefaultViewIndex(index);
              }}
            />
          )))}
      </ThumbnailViewContainer>
      {thumbnailViewIndexStart > 0
      && (
        <Button
          className="prev-up"
          onClick={() => {
            handleScrollVertical(-1);
          }}
        >
          <img src={DropdownLogo} alt="Scroll Up Logo" className="scroll-up-icon" />
        </Button>
      )}
      {thumbnailViewIndexStart + MAXTHUMBNAILVIEWLENGTH < photos?.length
      && (
        <Button
          className="next-down"
          onClick={() => {
            handleScrollVertical(1);
          }}
        >
          <img src={DropdownLogo} alt="Scroll Down Logo" className="scroll-down-icon" />
        </Button>
      )}
    </Host>
  );
}

export default ImageGallery;
