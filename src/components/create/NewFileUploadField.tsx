import React, { forwardRef, SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useField } from "formik";

import Dropzone, { FileRejection, useDropzone } from "react-dropzone";
import * as uuid from "uuid";
import styled, { css } from "styled-components";
import theme from "../../style/theme";
import useMount from "../../utils/hooks/useMount";
import { readAsDataUrl } from "../../utils/lib/file";
import { ReactComponent as UploadIcon } from "../../assets/icons/cloud-upload-alt-solid.svg";
import { ReactComponent as Sort } from "../../assets/icons/sort-up-solid.svg";
import FileUploadWithProgress from "./FileUploadWithProgress";
import api from "../../api/api";
import NewFileUploadWithProgress from "./NewFileUploadWithProgress";

const Container = styled.div`
  min-height: 150%;
`;

const DropZone = styled.div<{ isAccepting: boolean }>`
  border: 3px dashed;
  border-color: ${() => theme.colors.primary};
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
    color: ${() => theme.colors.primary};
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
  formikName: string;
  setIsFileUploading: React.Dispatch<React.SetStateAction<boolean>>;
  buttonEl: React.MutableRefObject<HTMLDivElement>;
}

const NewFileUploadField: React.FC<IProps> = ({ formikName, setIsFileUploading, buttonEl }) => {
  const [imageFiles, setImageFiles] = useState<AwsImageFile[]>([]);
  const [isAccepting, setIsAccepting] = useState(false);

  const handleDelete = (id: string) => () => {
    setImageFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const onDragEnter = () => setIsAccepting(true);

  const onDragLeave = () => setIsAccepting(false);

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const accFiles = acceptedFiles.map((acceptedFile) => ({
      file: acceptedFile,
      errors: [],
      id: uuid.v4(),
      isSubmitted: false,
      url: "",
    }));

    const rejFiles = rejectedFiles.map((rejectedFile) => ({
      ...rejectedFile,
      id: uuid.v4(),
      isSubmitted: false,
      url: "",
    }));

    setImageFiles((prevFiles) => [
      ...prevFiles.filter((prevFile) => prevFile.errors.length === 0),
      ...accFiles,
      ...prevFiles.filter((prevFile) => prevFile.errors.length > 0),
      ...rejFiles,
    ]);
    setIsAccepting(false);
  };

  useEffect(() => {
    console.log(imageFiles);
  }, [imageFiles]);

  const handleValidation = () => {
    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 50,
    onDrop,
    onDragEnter,
    onDragLeave,
    validator: handleValidation,
  });

  return (
    <Container>
      <DropZone {...getRootProps()} isAccepting={isAccepting}>
        <input {...getInputProps()} />
        <UploadIcon fill={theme.colors.primary} width={50} height={50} />
        <p>Drag and Drop or click here to upload</p>
      </DropZone>
      {JSON.stringify(imageFiles, null, 4)}
      {imageFiles.map((imageFile) => (
        <NewFileUploadWithProgress
          imageFile={imageFile}
          key={imageFile.id}
          handleDelete={handleDelete}
          setImageFiles={setImageFiles}
        />
      ))}
      {/* ListFiles */}

      {/* 
      <FileList>
        <FileListHeader onClick={() => setIsFolded((prev) => !prev)}>
          <FileListTitle>파일들</FileListTitle>
          <IconWrapper isFolded={isFolded}>
            <Sort width={30} height={30} />
          </IconWrapper>
        </FileListHeader>
        <Files isFolded={isFolded}>
          {files.map((file) => (
            <FileUploadWithProgress
              handleUpload={handleUpload}
              handleDelete={handleDelete}
              file={file}
              key={file.id}
            />
          ))}
          {files.length > 5 && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconWrapper onClick={() => setIsFolded(true)} isFolded={isFolded}>
                go Top
                <Sort width={30} height={30} />
              </IconWrapper>
            </div>
          )}
        </Files>
      </FileList> */}
    </Container>
  );
};

export default NewFileUploadField;
