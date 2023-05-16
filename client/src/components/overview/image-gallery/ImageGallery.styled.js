import styled from 'styled-components';

export const DefaultView = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: ${(props) => (props.zoomedIn ? 'zoom-out' : 'zoom-in')};
  margin-left: ${(props) => (props.expanded ? '100px' : 0)};
`;

export const ThumbnailViewContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 10px;
  width: 90px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 3px;
`;

export const ThumbnailView = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  padding-bottom: 1px;
  cursor: pointer;
  box-shadow: ${(props) => (props.selected ? '4px 6px 12px 2px rgba(0,0,0,0.5)' : '0 4px 8px 0 rgba(0,0,0,0.2)')};
  border-radius: 2px;
  border-bottom: ${(props) => (props.selected ? '3px solid black' : 'none')};
`;

export const CarouselButton = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
  }
  &.prev-left {
    top: 50%;
    left: 120px;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    height: 80px;
    width: 30px;
    & .scroll-left-icon {
      opacity: 0.8;
      rotate: 225deg;
    }
  }
  &.next-right {
    top: 50%;
    right: 30px;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    height: 80px;
    width: 30px;
    & .scroll-right-icon {
      opacity: 0.8;
      rotate: 45deg;
    }
  }
  &.prev-up {
    top: 15px;
    left: 40px;
    width: 30px;
    height: 30px;
    rotate: 180deg;
  }
  &.next-down {
    bottom: 15px;
    left: 35px;
    width: 30px;
    height: 30px;
  }
`;
