import React, { useState, useContext } from 'react';
import DropdownIcon from '../../../assets/dropdown-icon.svg';
import ArrowIcon from '../../../assets/arrow-icon.png';
import {
  DefaultView, CarouselButton, ThumbnailViewContainer, ThumbnailView,
} from './ImageGallery.styled';
import { OverviewContext } from '../OverviewContext.jsx';
import ImageMagnifier from './ImageMagnifier.jsx';

function OverviewCarousel({
  defaultViewIndex,
  setDefaultViewIndex,
  thumbnailViewIndexStart,
  setThumbnailIndexStart,
  inExpandedView,
  handleClick,
  showMagnifier,
  setShowMagnifier,
  viewportWidth,
  viewportHeight,
}) {
  const { selectedStyle } = useContext(OverviewContext);
  const { photos } = selectedStyle;
  const defaultSrc = photos && photos[defaultViewIndex]?.url;
  const MAXTHUMBNAILVIEWLENGTH = 7;
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

  // cursor position to the viewport
  const [[clientX, clientY], setClientXY] = useState([0, 0]);
  const magnifierProps = {
    src: defaultSrc,
    viewportWidth,
    viewportHeight,
    clientX,
    clientY,
    zoomLevel: 2.5,
  };

  return (
    <>
      {showMagnifier && <ImageMagnifier {...magnifierProps} />}
      <DefaultView
        src={defaultSrc}
        expanded={inExpandedView}
        zoomedIn={showMagnifier}
        onClick={() => {
          if (inExpandedView) {
            handleClick(!showMagnifier);
          } else {
            handleClick(true);
          }
        }}
        onMouseMove={(event) => {
          setClientXY([event.clientX, event.clientY]);
        }}
        data-testid={`default-view-${inExpandedView ? 'expanded' : 'main'}`}
      />
      {defaultViewIndex > 0
      && (
        <CarouselButton
          className="prev-left"
          onClick={() => {
            handleScrollHorizontal(-1);
          }}
          data-testid="prev-left-btn"
        >
          <img src={ArrowIcon} alt="Scroll Left Logo" className="scroll-left-icon" style={{ width: '30px', height: '30px' }} />
        </CarouselButton>
      )}
      {/* eslint-disable-next-line no-unsafe-optional-chaining */}
      {defaultViewIndex < photos?.length - 1
      && (
        <CarouselButton
          className="next-right"
          onClick={() => {
            handleScrollHorizontal(1);
          }}
          data-testid="next-right-btn"
        >
          <img src={ArrowIcon} alt="Scroll Right Logo" className="scroll-right-icon" style={{ width: '30px', height: '30px' }} />
        </CarouselButton>
      )}
      <ThumbnailViewContainer>
        {photos?.map((photo, index) => (
          thumbnailViewIndexStart <= index
          && index < thumbnailViewIndexStart + MAXTHUMBNAILVIEWLENGTH
          && (
            <ThumbnailView
              src={photo.thumbnail_url}
              key={photo.thumbnail_url}
              selected={defaultViewIndex === index}
              onClick={() => {
                setDefaultViewIndex(index);
                setShowMagnifier(false);
              }}
            />
          )))}
      </ThumbnailViewContainer>
      {thumbnailViewIndexStart > 0
      && (
        <CarouselButton
          className="prev-up"
          onClick={() => {
            handleScrollVertical(-1);
          }}
          data-testid="prev-up-btn"
        >
          <img src={DropdownIcon} alt="Scroll Up Logo" className="scroll-up-icon" />
        </CarouselButton>
      )}
      {thumbnailViewIndexStart + MAXTHUMBNAILVIEWLENGTH < photos?.length
      && (
        <CarouselButton
          className="next-down"
          onClick={() => {
            handleScrollVertical(1);
          }}
          data-testid="next-down-btn"
        >
          <img src={DropdownIcon} alt="Scroll Down Logo" className="scroll-down-icon" />
        </CarouselButton>
      )}
    </>
  );
}

export default OverviewCarousel;
