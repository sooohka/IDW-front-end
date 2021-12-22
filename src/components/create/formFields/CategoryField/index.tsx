import React from "react";
import RadioField from "../../../common/RadioField";
import * as S from "./Style";

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
    <S.Field>
      <S.FieldTitle>카테고리</S.FieldTitle>
      <S.RadioFieldContainer>
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
      </S.RadioFieldContainer>
    </S.Field>
  );
};

export default CategoryField;
