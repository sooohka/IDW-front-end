import { FormikErrors } from "formik";
import React, { memo, useCallback } from "react";
import styled from "styled-components";
import HelperText from "../../common/HelperText";
import FileUploadField from "../FileUploadField";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldTitle = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fonts.label};
`;

interface IProps {
  name: keyof CreateFormValues;
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

const FilesField: React.FC<IProps> = ({ handleFilesChange, error, name, setIsFileUploading }) => {
  return (
    <>
      <StyledField>
        <FieldTitle>파일</FieldTitle>
        <FileUploadField
          handleFilesChange={useCallback(() => handleFilesChange(name), [handleFilesChange, name])}
          setIsFileUploading={setIsFileUploading}
        />
      </StyledField>
      <HelperText hasError={Boolean(error)} text={error as string} />
    </>
  );
};

export default FilesField;
