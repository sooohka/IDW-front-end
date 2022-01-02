import styled from "styled-components";

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.25rem 0.5rem rgba(1, 1, 1, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    & > img {
      opacity: 0.3;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0;
  width: 100%;

  & > * {
    margin: 0 0 1rem 0;
  }
`;

const ExtraBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToolBox = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 0;
  & > * {
    margin: 0 0.5rem 0 0;
  }
`;

const SvgWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const PlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export { Card, ImgBox, Box, ExtraBox, IconWrapper, PlayWrapper, SvgWrapper, ToolBox };
