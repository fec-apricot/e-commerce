import React, { useState } from 'react';

function ImageMagnifier({
  src, viewportWidth, viewportHeight, clientX, clientY, zoomLevel,
}) {
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  return (
    <img
      src={src}
      style={{
        position: 'absolute',
        // prevent magnifier blocks the mousemove event of img
        pointerEvents: 'none',
        // set size of magnifier div
        width: `${imgWidth * zoomLevel}px`,
        height: `${imgHeight * zoomLevel}px`,
        // set position of the zoomed image
        top: `-${(imgHeight * zoomLevel - viewportHeight) * (clientY / viewportHeight)}px`,
        left: `-${(imgWidth * zoomLevel - viewportWidth) * (clientX / viewportWidth)}px`,
        opacity: '5', // reduce opacity so position can be verified
        zIndex: 10,
      }}
      alt="maginifier"
      onLoad={(event) => {
        setImgSize([event.target.naturalWidth, event.target.naturalHeight]);
      }}
      data-testid="magnifier"
    />
  );
}

export default ImageMagnifier;
