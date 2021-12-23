import React, { useEffect } from "react";
import DropZone from "../DropZone";
import * as S from "../DropZone/Style";
import FileList from "../FileList";
import { useFileUploadContext } from "../FileUploadProvider";
import FileUploadWithProgress from "../FileUploadWIthProgress";

interface IProps {
  isFileUploading: boolean;
  setIsFileUploading: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilesChange: (
    value: {
      url: string;
      name: string;
    }[],
  ) => void;
}
const FileUploadField: React.FC<IProps> = ({
  isFileUploading,
  setIsFileUploading,
  handleFilesChange,
}) => {
  const { files, handleFileDelete } = useFileUploadContext();

  useEffect(() => {
    if (isFileUploading) return;
    if (files.some((file) => !file.isSubmitted || file.errors.length > 0)) return;
    const formedFiles = files.map((imageFile) => ({
      name: imageFile.file.name,
      url: imageFile.url,
    }));
    handleFilesChange(formedFiles);
  }, [files, handleFilesChange, isFileUploading]);
  return (
    <S.FileUploadField>
      <DropZone />
      <FileList>
        {files.map((file) => (
          <FileUploadWithProgress
            setIsFileUploading={setIsFileUploading}
            imageFile={file}
            key={file.id}
          />
        ))}
      </FileList>
    </S.FileUploadField>
  );
};
export default FileUploadField;
