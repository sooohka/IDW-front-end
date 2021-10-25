import { useFormikContext } from "formik";
import React from "react";
import styled from "styled-components";
import Text from "../../common/Text";

const Select = styled.select`
  border: 2px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  height: fit-content;
  font-size: ${({ theme }) => theme.fonts.body};
  /* letter-spacing: 0.5px; */
`;
const getYears = () => {
  const date = new Date();
  const arr = [];
  for (let i = date.getFullYear(); i >= 1920; i -= 1) arr.push(i);
  return arr;
};

const years = getYears();

interface IProps {
  name: keyof SignUpFormValues;
}

const YearOfBirthField: React.FC<IProps> = ({ name }) => {
  const { handleChange, handleBlur, values } = useFormikContext<SignUpFormValues>();
  return (
    <>
      <Text bold fontSize='strongBody' text='출생연도' />
      <Select name={name} value={values[name]} onBlur={handleBlur} onChange={handleChange}>
        {years.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
    </>
  );
};

export default YearOfBirthField;
