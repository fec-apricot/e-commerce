import React from 'react';
import DropdownIcon from '../../../assets/dropdown-icon.svg';
import ArrowIcon from '../../../assets/arrow-icon.svg';
import {
  DefaultView, CarouselButton, ThumbnailViewContainer, ThumbnailView,
} from './ImageGallery.styled';

function OverviewCarousel({
  photos,
  defaultViewIndex,
  setDefaultViewIndex,
  thumbnailViewIndexStart,
  setThumbnailIndexStart,
  inExpandedView,
  setShowExpandedView,
}) {
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

  return (
    <>
      <DefaultView
        src={photos && photos[defaultViewIndex]?.url}
        expanded={inExpandedView}
        onClick={() => {
          if (!inExpandedView) {
            setShowExpandedView(true);
          }
        }}
      />
      {defaultViewIndex > 0
      && (
        <CarouselButton
          className="prev-left"
          onClick={() => {
            handleScrollHorizontal(-1);
          }}
        >
          <img src={ArrowIcon} alt="Scroll Left Logo" className="scroll-left-icon" />
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
        >
          <img src={ArrowIcon} alt="Scroll Right Logo" className="scroll-right-icon" />
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
        >
          <img src={DropdownIcon} alt="Scroll Down Logo" className="scroll-down-icon" />
        </CarouselButton>
      )}
    </>
  );
}

export default OverviewCarousel;
