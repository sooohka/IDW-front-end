import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Sort } from "../../assets/icons/sort-up-solid.svg";

const StyledFileList = styled.div`
  margin: 1rem 0 0 0;
  border: 2px solid black;
  border-radius: 5px;
  min-height: 3rem;
  position: relative;
`;

const FileListTitle = styled.h3`
  flex: 1;
  padding-left: 1rem;
`;

const FileListHeader = styled.div`
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

interface IProps {
  children: React.ReactNode;
}

const FileList: React.FC<IProps> = ({ children }) => {
  const [isFolded, setIsFolded] = useState(false);
  const bottomEl = useRef<HTMLDivElement>(null);

  const handleFoldBtnClick = () => {
    setIsFolded((prev) => !prev);
  };
  useEffect(() => {
    if (isFolded) window.scrollTo({ behavior: "smooth", top: 0 });
    else bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isFolded]);
  return (
    <StyledFileList>
      <FileListHeader onClick={handleFoldBtnClick}>
        <FileListTitle>파일들</FileListTitle>
        <IconWrapper isFolded={isFolded}>
          <Sort width={30} height={30} />
        </IconWrapper>
      </FileListHeader>
      <Files isFolded={isFolded}>{children}</Files>
      <div ref={bottomEl} style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconWrapper onClick={handleFoldBtnClick} isFolded={isFolded}>
          go Top
          <Sort width={30} height={30} />
        </IconWrapper>
      </div>
    </StyledFileList>
  );
};

export default FileList;
