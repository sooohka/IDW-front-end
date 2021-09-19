import { Formik, Form } from "formik";
import React, { forwardRef, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RadioField from "../../../../components/common/RadioField";
import FileUploadField from "../../FileUploadField";
import HelperText from "../../../../components/common/HelperText";
import Text from "../../../../components/common/Text";
import { theme } from "../../../../style/theme";
import Button from "../../../../components/common/Button";
import CategoryContext from "../../../../utils/contexts/CategoryContext";

const Input = styled.input`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${() => theme.colors.secondary};
  padding: 1rem;
  font-size: ${() => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${() => theme.colors.secondary};
  padding: 1rem;
  font-size: ${() => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const FieldContainer = styled.div`
  margin: 0 0 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldTitle = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: ${() => theme.fonts.label};
`;

const Field = ({ label, children }) => {
  return (
    <StyledField>
      <FieldTitle>{label}</FieldTitle>
      {children}
    </StyledField>
  );
};

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

const Template = forwardRef(({ isFileUploading, setIsFileUploading, initialValues, handleSubmit, validate }, { buttonEl }) => {
  const { categories } = useContext(CategoryContext);
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {/* TODO: 1.style FieldContainer, RadioContainer, Form */}
      {({ values, errors, touched, handleBlur, handleChange, setFieldValue, isSubmitting, isValid }) => (
        <Form style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <Text bold fontSize={theme.fonts.heading} text="IDW Creation" margin="0 0 3rem 0"></Text>

          {/* title */}
          <FieldContainer>
            <Field label="제목">
              <Input tabIndex={0} name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title}></Input>
            </Field>
            <HelperText hasError={Boolean(touched.title && errors.title)} text={errors.title} />
          </FieldContainer>

          {/* desc */}
          <FieldContainer>
            <Field label="설명">
              <TextArea tabIndex={0} name="desc" onChange={handleChange} onBlur={handleBlur} value={values.desc}></TextArea>
            </Field>
            <HelperText hasError={Boolean(touched.desc && errors.desc)} text={errors.desc} />
          </FieldContainer>

          {/* radio */}
          <FieldContainer>
            <Field label="카테고리">
              <RadioFieldContainer>
                {categories.map((v) => (
                  <RadioField
                    key={v.id}
                    id={v.name}
                    name="category"
                    checked={values.category === v.id}
                    onChange={() => setFieldValue("category", v.id)}
                    value={v.name}
                  ></RadioField>
                ))}
              </RadioFieldContainer>
            </Field>
          </FieldContainer>

          {/* files */}
          <FieldContainer>
            <Field label="파일">
              <FileUploadField buttonEl={buttonEl} setIsFileUploading={setIsFileUploading} name="files"></FileUploadField>
            </Field>
            <HelperText hasError={Boolean(errors.files)} text={errors.files} />
          </FieldContainer>

          <FieldContainer>
            <div ref={buttonEl} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <Button label="submit" disabled={isFileUploading || !touched.title || isSubmitting || !isValid} type="submit" />
              {/* <HelperText hasError={Boolean(errors.title || errors.desc || errors.files)} text={errors.title || errors.desc || errors.files}></HelperText> */}
            </div>
          </FieldContainer>
        </Form>
      )}
    </Formik>
  );
});

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Template.propTypes = {
  isFileUploading: PropTypes.bool.isRequired,
  setIsFileUploading: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    category: PropTypes.number.isRequired,
    files: PropTypes.array.isRequired,
  }).isRequired,
};
export default Template;
