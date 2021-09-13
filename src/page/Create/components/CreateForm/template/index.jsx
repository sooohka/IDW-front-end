import React from "react";
import { Formik } from "formik";
import styled, { css } from "styled-components";
import RadioField from "../../../../../components/common/RadioField";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Input = styled.input``;

const TextArea = styled.textarea`
  border: 1px solid black;
`;
const FieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const RadioContainer = styled.div``;

const Template = () => {
  const radioArray = ["연예인", "음식"];
  return (
    <Formik
      initialValues={{
        title: "",
        desc: "",
        category: "연예인",
        dateOfCreation: "",
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      {/* TODO: 1.style FieldContainer, RadioContainer, Form */}
      {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
        <StyledForm>
          <h1>IDW Creation</h1>
          {/* title */}
          <FieldContainer>
            <Input name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title}></Input>
          </FieldContainer>
          {/* desc */}
          <FieldContainer>
            <TextArea name="desc" onChange={handleChange} onBlur={handleBlur} value={values.desc}></TextArea>
          </FieldContainer>
          {/* radio */}
          <RadioContainer>
            {radioArray.map((v) => (
              <RadioField id={v} name="category" checked={values.category === v} onChange={() => setFieldValue("category", v)} value={v}></RadioField>
            ))}
          </RadioContainer>
          <button type="submit"> submit</button>
          {JSON.stringify(values, null, 2)}
        </StyledForm>
      )}
    </Formik>
  );
};

export default Template;
