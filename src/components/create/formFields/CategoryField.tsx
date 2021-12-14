import React from "react";
import styled from "styled-components";
import RadioField from "../../common/RadioField";
import GlobalTheme from "../../../style/theme";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldTitle = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fonts?.label || GlobalTheme.fonts.label};
`;

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
  categories: Category[];
  curValue: number;
  name: keyof CreateFormValues;
  handleCategoryChange: (
    name: string,
    value: number,
  ) => (e: React.ChangeEvent | React.KeyboardEvent) => void;
}
const CategoryField: React.FC<IProps> = ({ name, categories, curValue, handleCategoryChange }) => {
  return (
    <StyledField>
      <FieldTitle>카테고리</FieldTitle>
      <RadioFieldContainer>
        {categories.map((v) => (
          <RadioField
            key={v.id}
            id={v.id.toString()}
            name={name}
            isChecked={curValue === v.id}
            onChange={handleCategoryChange(name, v.id)}
            value={v.id}
            label={v.name}
          />
        ))}
      </RadioFieldContainer>
    </StyledField>
  );
};

export default CategoryField;
