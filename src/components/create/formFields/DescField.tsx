import { useFormikContext } from "formik";
import React from "react";
import styled from "styled-components";
import HelperText from "../../common/HelperText";

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
}

const DescField: React.FC<IProps> = ({ name }) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<CreateFormValues>();
  return (
    <>
      <StyledField>
        <FieldTitle>설명</FieldTitle>
        <TextArea
          tabIndex={0}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.desc}
        />
      </StyledField>
      <HelperText
        hasError={Boolean(touched[name] && errors[name])}
        text={(touched[name] && errors[name]) as string}
      />
    </>
  );
};

export default DescField;
