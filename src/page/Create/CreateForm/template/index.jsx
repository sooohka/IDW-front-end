import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import RadioField from "../../../../components/common/RadioField";
import FileUploadField from "../../FileUploadField";

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
  const radioArray = [
    { name: "연예인", id: 1 },
    { name: "음식", id: 2 },
  ];
  return (
    <Formik
      initialValues={{
        title: "",
        desc: "",
        category: "연예인",
        dateOfCreation: "",
        files: [],
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
            <span>제목: </span>
            <Input name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title}></Input>
          </FieldContainer>
          {/* desc */}
          <FieldContainer>
            <span>설명: </span>
            <TextArea name="desc" onChange={handleChange} onBlur={handleBlur} value={values.desc}></TextArea>
          </FieldContainer>
          {/* radio */}
          <RadioContainer>
            {radioArray.map((v) => (
              <RadioField
                key={v.id}
                id={v.name}
                name="category"
                checked={values.category === v.name}
                onChange={() => setFieldValue("category", v.name)}
                value={v.name}
              ></RadioField>
            ))}
          </RadioContainer>
          {/* files */}
          <FileUploadField name="files"></FileUploadField>
          <FieldContainer>
            <button type="submit"> submit</button>
          </FieldContainer>
          {JSON.stringify(values, null, 2)}
        </StyledForm>
      )}
    </Formik>
  );
};

export default Template;
