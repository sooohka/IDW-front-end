import { Form, Formik } from "formik";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import Button from "../common/Button";
import HelperText from "../common/HelperText";
import PageSpinner from "../common/PageSpinner";
import RadioField from "../common/RadioField";
import Text from "../common/Text";
import FileUploadField from "./FileUploadField";
import theme from "../../style/theme";
import CategoryContext from "../../utils/contexts/CategoryContext";

const Input = styled.input`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${() => theme.colors.primary};
  padding: 1rem;
  font-size: ${() => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${() => theme.colors.primary};
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

const Field = ({ label, children }) => (
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
const CreateForm = () => {
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonEl = useRef(null);
  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    console.log(`%c createform rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });

  const handleSubmit = useCallback(async (v) => {
    console.log(v);
    setIsSubmitting(true);
    try {
      const data = {
        category: v.category, // TODO:카테고리 변경
        desc: v.desc,
        files: v.files,
        title: v.title,
      };
      if (process.env.REACT_APP_ENV !== "local") {
        // TODO:데이터 file에 bad 400 800 url모두 보내주자
        const res = await axios.post("worldcups", data);
        alert("업로드 성공!");
        console.log(res);
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const validate = useCallback((v) => {
    const errors = {};
    if (!v.title) {
      errors.title = "제목을 입력해주세요.";
    }
    if (v.files.length < 4) {
      errors.files = "이미지는 최소 4장이상 업로드 해야합니다.";
    } else if (v.files.length > 50) {
      errors.files = "이미지는 최대 50장 까지 업로드 가능합니다.";
    }
    // alert(errors.title || errors.desc || errors.files);
    // console.log("errors");
    console.log(errors);
    return errors;
  }, []);

  const initialValues = {
    title: "",
    desc: "",
    category: 0,
    files: [],
  };
  const { categories } = useContext(CategoryContext);

  return (
    <>
      {isSubmitting ? (
        <PageSpinner />
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {/* TODO: 1.style FieldContainer, RadioContainer, Form */}
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, isSubmitting: isFileSubmitting, isValid }) => (
            <Form style={{ display: "flex", flexDirection: "column", flex: "1" }}>
              <Text bold fontSize={theme.fonts.heading} text="IDW Creation" margin="0 0 3rem 0" />

              {/* title */}
              <FieldContainer>
                <Field label="제목">
                  <Input tabIndex={0} name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                </Field>
                <HelperText hasError={Boolean(touched.title && errors.title)} text={errors.title} />
              </FieldContainer>

              {/* desc */}
              <FieldContainer>
                <Field label="설명">
                  <TextArea tabIndex={0} name="desc" onChange={handleChange} onBlur={handleBlur} value={values.desc} />
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
                        id={v.id}
                        name="category"
                        checked={values.category === v.id}
                        onChange={() => setFieldValue("category", v.id)}
                        value={v.name}
                      />
                    ))}
                  </RadioFieldContainer>
                </Field>
              </FieldContainer>

              {/* files */}
              <FieldContainer>
                <Field label="파일">
                  <FileUploadField buttonEl={buttonEl} setIsFileUploading={setIsFileUploading} formikName="files" />
                </Field>
                <HelperText hasError={Boolean(errors.files)} text={errors.files} />
              </FieldContainer>

              <FieldContainer>
                <div ref={buttonEl} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                  <Button label="submit" disabled={isFileUploading || !touched.title || isFileSubmitting || !isValid} type="submit" />
                  {/* <HelperText hasError={Boolean(errors.title || errors.desc || errors.files)} text={errors.title || errors.desc || errors.files}></HelperText> */}
                </div>
              </FieldContainer>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
CreateForm.propTypes = {};

export default CreateForm;
