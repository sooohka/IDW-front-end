import { Form, Formik, FormikErrors } from "formik";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import HelperText from "../common/HelperText";
import PageSpinner from "../common/PageSpinner";
import RadioField from "../common/RadioField";
import Text from "../common/Text";
import globalTheme from "../../style/theme";
import CategoryContext from "../../utils/contexts/CategoryContext";
import api from "../../api/api";
import NewFileUploadField from "./FileUploadField";

const Input = styled.input`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  font-size: ${({ theme }) => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  font-size: ${({ theme }) => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const FieldContainer = styled.div<{ width?: string }>`
  margin: 0 0 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${({ width }) => width || "100%"};
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
  font-size: ${({ theme }) => theme.fonts.label};
`;
interface MyFieldProps {
  label: string;
  children: React.ReactNode;
}

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
interface FormValue {
  title: string;
  desc: string;
  category: number;
  files: { url: string; name: string }[];
}

const initialValues: FormValue = {
  title: "",
  desc: "",
  category: 1,
  files: [],
};

const CreateForm = () => {
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleEl.current) titleEl.current.focus();
  }, []);

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
      if (process.env.NODE_ENV !== "development") {
        const res = await api.postWorldCup(data);
        alert("업로드 성공!");
        console.log(res);
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      console.log(e);
      throw new Error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const validate = useCallback((v) => {
    const errors: FormikErrors<FormValue> = {};
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

  const { categories } = useContext(CategoryContext);

  return (
    <>
      {isSubmitting ? (
        <PageSpinner />
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            isSubmitting: isFileSubmitting,
            isValid,
          }) => (
            <StyledForm>
              <Text
                bold
                fontSize={globalTheme.fonts.heading}
                text='IDW Creation'
                margin='0 0 3rem 0'
              />

              {/* title */}
              <FieldContainer>
                <Field label='제목'>
                  <Input
                    ref={titleEl}
                    tabIndex={0}
                    name='title'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </Field>
                <HelperText
                  hasError={Boolean(touched.title && errors.title)}
                  text={(touched.title && errors.title) as string}
                />
              </FieldContainer>

              {/* desc */}
              <FieldContainer>
                <Field label='설명'>
                  <TextArea
                    tabIndex={0}
                    name='desc'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.desc}
                  />
                </Field>
                <HelperText
                  hasError={Boolean(touched.desc && errors.desc)}
                  text={(touched.desc && errors.desc) as string}
                />
              </FieldContainer>

              {/* radio */}
              <FieldContainer>
                <Field label='카테고리'>
                  <RadioFieldContainer>
                    {categories.map((v) => (
                      <RadioField
                        key={v.id}
                        id={v.id.toString()}
                        name='category'
                        checked={values.category === v.id}
                        onChange={() => setFieldValue("category", v.id)}
                        value={v.id}
                        label={v.name}
                      />
                    ))}
                  </RadioFieldContainer>
                </Field>
              </FieldContainer>

              {/* files */}
              <FieldContainer>
                <Field label='파일'>
                  <NewFileUploadField setIsFileUploading={setIsFileUploading} formikName='files' />
                </Field>
                <HelperText
                  hasError={Boolean(touched.files && errors.files)}
                  text={(touched.files && errors.files) as string}
                />
              </FieldContainer>

              <FieldContainer width='10%'>
                <Button
                  label='submit'
                  disabled={isFileUploading || !touched.title || isFileSubmitting || !isValid}
                  type='submit'
                />
                {/* <HelperText hasError={Boolean(errors.title || errors.desc || errors.files)} text={errors.title || errors.desc || errors.files}></HelperText> */}
              </FieldContainer>
            </StyledForm>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateForm;
