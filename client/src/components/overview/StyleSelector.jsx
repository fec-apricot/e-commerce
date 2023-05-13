import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverviewContext } from './OverviewContext.jsx';

const Host = styled.div`
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: 80%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  overflow-y: scroll;
  scroll-behavior: auto;
`;

const StyleThumbnailContainer = styled.div`
  position: relative;
`;

const StyleThumbnail = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
`;

const Checkmark = styled.span`
  display: inline-block;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  margin-left: -20px;
  margin-top: 10px;
  background-color: white;
  text-align: center;
  position: absolute;
  top: -10px;
  right: 15px;
`;

function StyleSelector() {
  const { selectedStyle, setSelectedStyle, styles } = useContext(OverviewContext);

  return (
    <Host data-testid="style-selector">
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
        {styles && styles.map((style, index) => (
          <StyleThumbnailContainer
            key={style.style_id}
            onClick={() => {
              setSelectedStyle(style);
            }}
            data-testid={`style-item-${index}`}
          >
            <StyleThumbnail
              src={style.photos[0].thumbnail_url}
            />
            {style.style_id === selectedStyle.style_id && (
              <Checkmark data-testid="checkmark">✓</Checkmark>
            )}
          </StyleThumbnailContainer>
        ))}
      </StyleList>
    </Host>
  );
}

export default StyleSelector;
