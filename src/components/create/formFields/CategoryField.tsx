import { useFormikContext } from "formik";
import React, { useContext } from "react";

import styled from "styled-components";
import CategoryContext from "../../../utils/contexts/CategoryContext";
import RadioField from "../../common/RadioField";

interface MyFieldProps {
  label: string;
  children: React.ReactNode;
}
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
const Field: React.FC<MyFieldProps> = ({ label, children }) => (
  <StyledField>
    <FieldTitle>{label}</FieldTitle>
    {children}
  </StyledField>
);

const RadioFieldContainer = styled.div`
  display: flex;
  height: 5rem;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: start;
  & > * {
    padding: 0 3rem 0 0;
  }
`;

interface IProps {
  name: keyof CreateFormValues;
}
const CategoryField: React.FC<IProps> = ({ name }) => {
  const { categories } = useContext(CategoryContext);
  const { values, setFieldValue } = useFormikContext<CreateFormValues>();
  return (
    <StyledField>
      <FieldTitle>카테고리</FieldTitle>
      <RadioFieldContainer>
        {categories.map((v) => (
          <RadioField
            key={v.id}
            id={v.id.toString()}
            name={name}
            checked={values[name] === v.id}
            onChange={() => setFieldValue("name", v.id)}
            value={v.id}
            label={v.name}
          />
        ))}
      </RadioFieldContainer>
    </StyledField>
  );
};

export default CategoryField;
