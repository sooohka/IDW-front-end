import React, { useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import styled from "styled-components";
import * as uuid from "uuid";
import { ReactComponent as UploadIcon } from "../../assets/icons/cloud-upload-alt-solid.svg";
import defaultTheme from "../../style/theme";
import FileList from "./FileList";

const Container = styled.div`
  min-height: 150%;
`;

const DropZone = styled.div<{ isAccepting: boolean }>`
  border: 3px dashed;
  border-color: ${({ theme }) => theme.colors.primary};
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
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface IProps {
  setIsFileUploading: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilesChange: (value: CreateFormValues["files"]) => void;
}

const FileUploadField: React.FC<IProps> = ({ setIsFileUploading, handleFilesChange }) => {
  const [imageFiles, setImageFiles] = useState<TargetFile[]>([]);

  /* drag and drop필드에 접근했을때 */
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
    if (imageFiles.every((imageFile) => imageFile.isSubmitted && !imageFile.errors.length)) {
      const formedFiles: CreateFormValues["files"] = imageFiles.map((imageFile) => ({
        name: imageFile.file.name,
        url: imageFile.url,
      }));
      handleFilesChange(formedFiles);
      setIsFileUploading(false);
    } else {
      setIsFileUploading(true);
    }
  }, [handleFilesChange, imageFiles, setIsFileUploading]);

  const handleValidation = (file: File) => {
    if (imageFiles.find((imageFile) => imageFile.file.name === file.name)) {
      return {
        code: "duplicate-file",
        message: "중복된 파일은 허용이 안됩니다.",
      };
    }
    if (file.size / 1024 / 1024 > 5)
      return {
        code: "file-too-large",
        message: `파일은 5mb를 넘을 수 없습니다`,
      };
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
        <UploadIcon fill={defaultTheme.colors.primary} width={50} height={50} />
        <p>Drag and Drop or click here to upload</p>
      </DropZone>
      {/* ListFiles */}
      <FileList imageFiles={imageFiles} handleDelete={handleDelete} setImageFiles={setImageFiles} />
    </Container>
  );
};

export default FileUploadField;
