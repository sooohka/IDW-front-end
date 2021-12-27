import { FormikErrors } from "formik";
import React, { useCallback } from "react";
import HelperText from "../../../common/HelperText";
import FileUploadField from "./FileUploadField";
import FileUploadProvider from "./FileUploadProvider";
import * as S from "./Style";

interface IProps {
  name: keyof CreateFormValues;
  isFileUploading: boolean;
  setIsFileUploading: React.Dispatch<React.SetStateAction<boolean>>;
  error?:
    | string
    | string[]
    | FormikErrors<{
        url: string;
        name: string;
      }>[];
  handleFilesChange: (name: string) => (value: CreateFormValues["files"]) => void;
}

const FilesField: React.FC<IProps> = ({
  handleFilesChange: filesChange,
  error,
  name,
  isFileUploading,
  setIsFileUploading,
}) => {
  const handleFilesChange = useCallback(
    (value: CreateFormValues["files"]) => {
      return filesChange(name)(value);
    },
    [filesChange, name],
  );
  return (
    <>
      <S.Field>
        <S.FieldTitle>파일</S.FieldTitle>
        <FileUploadProvider>
          <FileUploadField
            isFileUploading={isFileUploading}
            handleFilesChange={handleFilesChange}
            setIsFileUploading={setIsFileUploading}
          />
        </FileUploadProvider>
      </S.Field>
      <HelperText hasError={Boolean(error)}>{error as string}</HelperText>
    </>
  );
};

export default FilesField;
