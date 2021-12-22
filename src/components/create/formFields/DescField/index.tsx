import React from "react";
import styled from "styled-components";
import HelperText from "../../../common/HelperText";

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

const TextArea = styled.textarea`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  font-size: ${({ theme }) => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

interface IProps {
  name: keyof CreateFormValues;
  handleBlur: React.FocusEventHandler;
  handleChange: React.ChangeEventHandler;
  value: string;
  error?: string;
  touched?: boolean;
}

const DescField: React.FC<IProps> = ({ name, handleChange, handleBlur, value, touched, error }) => {
  return (
    <>
      <StyledField>
        <FieldTitle>설명</FieldTitle>
        <TextArea
          tabIndex={0}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </StyledField>
      <HelperText hasError={Boolean(touched && error)} text={(touched && error) as string} />
    </>
  );
};

export default DescField;
