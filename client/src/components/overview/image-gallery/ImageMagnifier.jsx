import React, { useState } from 'react';

function ImageMagnifier({
  src, top, left, x, y, zoomLevel,
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
        // set position of the magnifier div
        top: `${top - y}px`,
        left: `${left - x}px`,
        opacity: '5', // reduce opacity so position can be verified
        zIndex: 10,
      }}
      alt="maginifier"
      onLoad={(event) => {
        setImgSize([event.target.naturalWidth, event.target.naturalHeight]);
      }}
    />
  );
}

export default ImageMagnifier;
