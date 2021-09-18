import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import FileUploadWithProgress from "../../FileUploadWithProgress";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/cloud-upload-alt-solid.svg";
import { theme } from "../../../../style/theme";
import { ReactComponent as Sort } from "../../../../assets/icons/sort-up-solid.svg";

const Container = styled.div`
  min-height: 150%;
`;

const DropZone = styled.div`
  border: 3px dashed;
  border-color: ${() => theme.colors.secondary};
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  & > * {
    transform: ${({ isAccepting }) => isAccepting && "scale(1.5)"};
    opacity: ${({ isAccepting }) => isAccepting && 0.3};
  }
  & > p {
    font-weight: bold;
    color: ${() => theme.colors.secondary};
  }
`;

const FileList = styled.div`
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

const Files = styled.div`
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
const IconWrapper = styled.div`
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

const Template = ({ isFolded, setIsFolded, handleDelete, handleSubmittedFiles, files, isAccepting, getInputProps, getRootProps }) => {
  return (
    <Container>
      {/* DropZone */}
      <DropZone
        isAccepting={isAccepting}
        {...getRootProps()}

        // onClick={(e) => e.stopPropagation()}
      >
        <input {...getInputProps()} />
        <UploadIcon fill={theme.colors.secondary} width={50} height={50}></UploadIcon>
        <p>Drag and Drop or click here to upload</p>
      </DropZone>

      {/* ListFiles */}
      <FileList isFolded={isFolded}>
        <FileListHeader
          onClick={() => {
            setIsFolded((prev) => !prev);
          }}
          isFolded={isFolded}
        >
          <FileListTitle>파일들</FileListTitle>
          <IconWrapper isFolded={isFolded}>
            <Sort width={30} height={30}></Sort>
          </IconWrapper>
        </FileListHeader>
        <Files isFolded={isFolded}>
          {files.map((file) => (
            <FileUploadWithProgress
              handleDelete={handleDelete}
              handleSubmittedFiles={handleSubmittedFiles}
              file={file}
              // TODO: 제대로된 키값 설정하기
              key={`${file.name}${file.size}`}
            ></FileUploadWithProgress>
          ))}
          {files.length > 5 && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconWrapper onClick={() => setIsFolded(true)} isFolded={isFolded}>
                go Top
                <Sort width={30} height={30}></Sort>
              </IconWrapper>
            </div>
          )}
        </Files>
      </FileList>
    </Container>
  );
};

Template.propTypes = {
  isFolded: PropTypes.bool.isRequired,
  setIsFolded: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSubmittedFiles: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape(PropTypes.object.isRequired)).isRequired,
  isAccepting: PropTypes.bool.isRequired,
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
};
export default Template;
