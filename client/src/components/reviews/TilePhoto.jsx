import React from 'react';
import './reviewStyle.css';

function TilePhoto({ url, setTileModal }) {
  return (

    <div role="presentation" className="tile-modal-background" onClick={() => { setTileModal(false); }}>
      <img className="tile-modal" alt="" src={url} />
      <button type="submit" onClick={() => { setTileModal(false); }}>X</button>
    </div>

  );
}

export default TilePhoto;
