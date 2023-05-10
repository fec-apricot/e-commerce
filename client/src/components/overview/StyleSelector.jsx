import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';

const Host = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleTitle = styled.div`
  display: flex;
`;

const StyleHeader = styled.div`
  font-weight: bold;
`;

const SelectedStyle = styled.div`
  margin-left: 10px;
`;

const StyleList = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
`;

const StyleThumbnailContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

const StyleThumbnail = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Checkmark = styled.span`
  display: inline-block;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  margin-left: -20px;
  margin-top: 10px;
  background-color: white;
  text-align: center;
  position: absolute;
  top: 1px;
  right: 4px;
`;

function StyleSelector() {
  const { selectedStyle, setSelectedStyle, styles } = useContext(OverviewContext);

  return (
    <Host>
      <StyleTitle>
        <StyleHeader>STYLE &gt; </StyleHeader>
        <SelectedStyle>
          {selectedStyle ? (
            <span>{selectedStyle.name}</span>
          ) : (
            <span>SELECTED STYLE</span>
          )}
        </SelectedStyle>
      </StyleTitle>
      <StyleList>
        {styles && styles.map((style) => (
          <StyleThumbnailContainer key={style.style_id}>
            <StyleThumbnail
              src={style.photos[0].thumbnail_url}
              onClick={() => {
                setSelectedStyle(style);
              }}
            />
            {style.style_id === selectedStyle.style_id && (
              <Checkmark>✓</Checkmark>
            )}
          </StyleThumbnailContainer>
        ))}
      </StyleList>
    </Host>
  );
}

export default StyleSelector;
