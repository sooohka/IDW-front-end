import { Formik, Form } from "formik";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RadioField from "../../../../components/common/RadioField";
import FileUploadField from "../../FileUploadField";
import HelperText from "../../../../components/common/HelperText";

const Input = styled.input``;

const TextArea = styled.textarea`
  border: 1px solid black;
`;

const FieldContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Template = ({ handleSubmit, validate }) => {
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
      onSubmit={handleSubmit}
      validate={validate}
    >
      {/* TODO: 1.style FieldContainer, RadioContainer, Form */}
      {({ values, errors, touched, handleBlur, handleChange, setFieldValue, isSubmitting, isValid }) => (
        <Form style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <h1>IDW Creation</h1>
          {/* title */}
          <FieldContainer>
            <div>
              <div>제목: </div>
              <Input name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title}></Input>
            </div>
            <HelperText hasError={touched.title && errors.title}>{errors.title}</HelperText>
          </FieldContainer>
          {/* desc */}
          <FieldContainer>
            <div>
              <div>설명: </div>
              <TextArea name="desc" onChange={handleChange} onBlur={handleBlur} value={values.desc}></TextArea>
            </div>
            <HelperText hasError={touched.desc && errors.desc}>{errors.desc}</HelperText>
          </FieldContainer>
          {/* radio */}
          <FieldContainer>
            <div>
              <div>카테고리:</div>
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
            </div>
          </FieldContainer>
          {/* files */}
          <FieldContainer>
            <div>
              <div>파일:</div>
              <FileUploadField name="files"></FileUploadField>
            </div>
          </FieldContainer>

          <FieldContainer>
            <button disabled={isSubmitting || !isValid} type="submit">
              submit
            </button>
            <HelperText hasError={errors.files}>{errors.files}</HelperText>
          </FieldContainer>
          {JSON.stringify(values, null, 2)}
        </Form>
      )}
    </Formik>
  );
};

Template.propTypes = {
  validate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default Template;
