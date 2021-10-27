import { useFormikContext } from "formik";
import React from "react";
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
}

const FilesField: React.FC<IProps> = ({ name, setIsFileUploading }) => {
  const { errors } = useFormikContext<CreateFormValues>();
  return (
    <>
      <StyledField>
        <FieldTitle>파일</FieldTitle>
        <FileUploadField setIsFileUploading={setIsFileUploading} formikName='files' />
      </StyledField>
      <HelperText hasError={Boolean(errors[name])} text={errors[name] as string} />
    </>
  );
};

export default FilesField;
