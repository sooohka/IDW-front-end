import styled, { css } from "styled-components";

const FileList = styled.div`
  margin: 1rem 0 0 0;
  border: 2px solid black;
  border-radius: 5px;
  min-height: 3rem;
  position: relative;
`;

const Title = styled.h3`
  flex: 1;
  padding-left: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Files = styled.div<{ isFolded: boolean }>`
  transition: all;
  transform-origin: top;
  ${({ isFolded }) => {
    if (isFolded)
      return css`
        transform: scaleY(0);
        max-height: 0;
      `;
    return css`
      transform: scaleY(1);
      padding: 2rem 0 0;
      max-height: 10000px;
    `;
  }}
`;

const IconWrapper = styled.div<{ isFolded: boolean }>`
  cursor: pointer;
  & > svg {
    transition: all 0.2s;
    ${({ isFolded }) => {
      if (isFolded) {
        return css`
          transform: rotate(180deg);
        `;
      }
      return css`
        transform: rotate(0deg) translateY(30%);
      `;
    }}
  }
`;

const NotFoundText = styled.p`
  text-align: center;
`;

export { FileList, Header, Title, NotFoundText, Files, IconWrapper };
