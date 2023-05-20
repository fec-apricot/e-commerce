import styled from 'styled-components';

export const DefaultView = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 2px;
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
  display: grid;
  grid-template-rows: repeat(7, 14.28% [col-start]);
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
  box-shadow: ${(props) => (props.selected ? '2px 4px 4px 1px rgba(0,0,0,0.5)' : '1px 2px 2px 0 rgba(0,0,0,0.2)')};
  border-radius: 2px;
  border-bottom: ${(props) => (props.selected ? '4px solid rgb(81, 82, 83)' : 'none')};
  transition: 0.3s;
  &:hover {
    box-shadow: 1px 2px 4px 1px rgba(0,0,0,0.5);
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &.prev-left {
    top: 50%;
    left: 100px;
    & .scroll-left-icon {
      opacity: 0.8;
    }
  }
  &.next-right {
    top: 50%;
    right: 30px;
    & .scroll-right-icon {
      opacity: 0.8;
      rotate: 180deg;
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
