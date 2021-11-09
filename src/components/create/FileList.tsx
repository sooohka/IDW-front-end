import React, { useLayoutEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Sort } from "../../assets/icons/sort-up-solid.svg";
import useMount from "../../utils/hooks/useMount";
import Text from "../common/Text";
import NewFileUploadWithProgress from "./FileUploadWithProgress";

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

const FileNotFoundText = styled.p`
  text-align: center;
`;

interface IProps {
  imageFiles: TargetFile[];
  handleDelete: (id: string) => () => void;
  setImageFiles: React.Dispatch<React.SetStateAction<TargetFile[]>>;
}

const FileList: React.FC<IProps> = ({ imageFiles, handleDelete, setImageFiles }) => {
  const [isFolded, setIsFolded] = useState(true);
  const { isMount } = useMount();
  const bottomEl = useRef<HTMLDivElement>(null);

  const handleFoldBtnClick = () => {
    setIsFolded((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (isMount) return;
    if (isFolded) bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    else bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFolded]);

  useLayoutEffect(() => {
    if (imageFiles.length > 0) setIsFolded(false);
  }, [imageFiles]);

  return (
    <StyledFileList>
      <FileListHeader onClick={handleFoldBtnClick}>
        <FileListTitle>파일들</FileListTitle>
        <IconWrapper isFolded={isFolded}>
          <Sort width={30} height={30} />
        </IconWrapper>
      </FileListHeader>
      <Files isFolded={isFolded}>
        {imageFiles.length !== 0 ? (
          imageFiles.map((imageFile) => (
            <NewFileUploadWithProgress
              imageFile={imageFile}
              key={imageFile.id}
              handleDelete={handleDelete}
              setImageFiles={setImageFiles}
            />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <Text bold fontSize='strongBody' text='파일이 없습니다' />
          </div>
        )}
      </Files>
      <div ref={bottomEl} style={{ display: "flex", justifyContent: "flex-end" }}>
        {imageFiles.length > 5 ? (
          <IconWrapper onClick={handleFoldBtnClick} isFolded={isFolded}>
            go Top
            <Sort width={30} height={30} />
          </IconWrapper>
        ) : null}
      </div>
    </StyledFileList>
  );
};

export default FileList;
