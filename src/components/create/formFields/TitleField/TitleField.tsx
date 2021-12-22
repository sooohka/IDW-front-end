import { useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import HelperText from "../../../common/HelperText";
import Input from "../../../common/Input";

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
  handleBlur: React.FocusEventHandler;
  handleChange: React.ChangeEventHandler;
  value: string;
  error?: string;
  touched?: boolean;
}
const TitleField: React.FC<IProps> = ({
  name,
  handleChange,
  handleBlur,
  value,
  touched,
  error,
}) => {
  const titleEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleEl.current) titleEl.current.focus();
  }, []);

  return (
    <>
      <StyledField>
        <FieldTitle>제목</FieldTitle>
        <Input
          ref={titleEl}
          tabIndex={0}
          name={name}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </StyledField>
      <HelperText hasError={Boolean(touched && error)} text={(touched && error) as string} />
    </>
  );
};

export default TitleField;
