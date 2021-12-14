import { Form, Formik, FormikErrors } from "formik";
import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { WorldCupApi } from "../../api";
import CategoryContext from "../../utils/contexts/CategoryContext";
import Button from "../common/Button";
import PageSpinner from "../common/PageSpinner";
import Text from "../common/Text";
import CategoryField from "./formFields/CategoryField";
import DescField from "./formFields/DescField";
import FilesField from "./formFields/FilesField";
import TitleField from "./formFields/TitleField";

const FieldContainer = styled.div<{ width?: string }>`
  margin: 0 0 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${({ width }) => width || "100%"};
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const initialValues: CreateFormValues = {
  title: "",
  desc: "",
  category: 1,
  files: [],
};

const CreateForm = () => {
  const [isFileUploading, setIsFileUploading] = useState(true);
  const { categories } = useContext(CategoryContext);
  const handleCategoryChange =
    (setFieldValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void) =>
    (name: string, value: number) =>
    () => {
      setFieldValue(name, value);
    };
  const handleSubmit = useCallback(async (v) => {
    try {
      const data = {
        category: v.category,
        desc: v.desc,
        files: v.files,
        title: v.title,
      };
      if (process.env.NODE_ENV !== "development") {
        const res = await WorldCupApi.postWorldCup(data);
        if (res.data) alert("업로드 성공!");
        else throw new Error("무언가 잘못됨");
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }, []);

  const validate = useCallback((v) => {
    const errors: FormikErrors<CreateFormValues> = {};
    console.log(v);

    if (!v.title) {
      errors.title = "제목을 입력해주세요.";
    }
    if (v.files.length < 4) {
      errors.files = "이미지는 최소 4장이상 업로드 해야합니다.";
    } else if (v.files.length > 50) {
      errors.files = "이미지는 최대 50장 까지 업로드 가능합니다.";
    }
    return errors;
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({
        isSubmitting,
        isValid,
        values,
        setFieldValue,
        handleBlur,
        handleChange,
        errors,
        touched,
      }) => (
        <>
          {isSubmitting ? (
            <PageSpinner />
          ) : (
            <StyledForm>
              <Text bold fontSize='heading' text='IDW Creation' margin='0 0 3rem 0' />
              {/* title */}
              <FieldContainer>
                <TitleField
                  error={errors.title}
                  touched={touched.title}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.title}
                  name='title'
                />
              </FieldContainer>
              {/* desc */}
              <FieldContainer>
                <DescField
                  error={errors.desc}
                  touched={touched.desc}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.desc}
                  name='desc'
                />
              </FieldContainer>
              {/* radio */}
              <FieldContainer>
                <CategoryField
                  handleCategoryChange={handleCategoryChange(setFieldValue)}
                  categories={categories}
                  curValue={values.category}
                  name='category'
                />
              </FieldContainer>
              {/* files */}
              <FieldContainer>
                <FilesField name='files' setIsFileUploading={setIsFileUploading} />
              </FieldContainer>
              <FieldContainer width='10%'>
                <Button label='submit' disabled={isFileUploading || !isValid} type='submit' />
                {/* <HelperText hasError={Boolean(errors.title || errors.desc || errors.files)} text={errors.title || errors.desc || errors.files}></HelperText> */}
              </FieldContainer>
            </StyledForm>
          )}
        </>
      )}
    </Formik>
  );
};

export default CreateForm;
