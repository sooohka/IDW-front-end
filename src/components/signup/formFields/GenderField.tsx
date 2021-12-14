import { useFormikContext } from "formik";
import React from "react";
import styled from "styled-components";
import RadioField from "../../common/RadioField";
import Text from "../../common/Text";

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

const genders = [
  { value: "male", text: "남자" },
  { value: "female", text: "여자" },
];

interface IProps {
  name: keyof SignUpFormValues;
}

const GenderField: React.FC<IProps> = ({ name }) => {
  const { values, setFieldValue } = useFormikContext<SignUpFormValues>();
  return (
    <>
      <Text bold fontSize='strongBody' text='성별' />
      <RadioFieldContainer>
        {genders.map((v) => (
          <RadioField
            key={v.text}
            id={v.text}
            name={name}
            isChecked={values[name] === v.value}
            onChange={() => setFieldValue(name, v.value)}
            value={v.value}
          />
        ))}
      </RadioFieldContainer>
    </>
  );
};

export default GenderField;
