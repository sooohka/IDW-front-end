import { Form as FormikForm, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import PageSpinner from "../common/PageSpinner";
import Text from "../common/Text";
import EmailField from "./formFields/EmailField";
import GenderField from "./formFields/GenderField";
import Password2Field from "./formFields/Password2Field";
import PasswordField from "./formFields/PasswordField";
import YearOfBirthField from "./formFields/YearOfBirthField";

const formWidth = "60rem";

const FieldContainer = styled.div<{ width?: string }>`
  margin: 0 auto 1rem;
  display: flex;
  width: ${({ width }) => width || "100%"};
  align-items: center;
  & > * {
    &:first-child {
      width: 10rem;
    }
  }
`;

const Form = styled(FormikForm)`
  width: ${() => formWidth};
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 2rem;
  & > * {
    &:last-child {
      margin-top: 3rem;
    }
  }
`;

const initialValues: SignUpFormValues = {
  email: "",
  emailHost: "",
  gender: "male",
  yearOfBirth: new Date().getFullYear(),
  password: "",
  password2: "",
};

const SignUpForm = () => {
  const handleSubmit = (
    values: SignUpFormValues,
    formikHelpers: FormikHelpers<SignUpFormValues>,
  ) => {
    console.log(formikHelpers);
    alert(JSON.stringify(values, null, 2));
  };

  const validate = (values: SignUpFormValues) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    console.log(values);
    const errors: FormikErrors<SignUpFormValues> = {};
    // email check
    if (!emailRegex.test(`${values.email}@${values.emailHost}`)) {
      errors.email = "이메일이 이상합니다";
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = "비밀번호는 알파벳,숫자,특수문자를 최소하나씩을 포함해야합니다";
      if (values.password.length < 8 || values.password.length > 15) {
        errors.password = "비밀번호는 최소 8자 최대 15자까지 가능합니다";
      }
    }
    if (!(values.password === values.password2)) {
      errors.password2 = "비밀번호가 일치하지 않습니다";
    }
    return errors;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ isValid, isSubmitting }: FormikProps<SignUpFormValues>) => (
        <>
          {isSubmitting ? (
            <PageSpinner />
          ) : (
            <Form onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}>
              <Text bold fontSize='heading' text='IDW SignUp' margin='0 0 3rem 0' />
              {/* 이메일 */}
              <FieldContainer>
                <EmailField />
              </FieldContainer>
              {/* 비밀번호 */}
              <FieldContainer>
                <PasswordField name='password' />
              </FieldContainer>
              {/* 비밀번호 확인 */}
              <FieldContainer>
                <Password2Field name='password2' />
              </FieldContainer>
              {/* 출생연도 */}
              <FieldContainer>
                <YearOfBirthField name='yearOfBirth' />
              </FieldContainer>
              {/* 성별 */}
              <FieldContainer>
                <GenderField name='gender' />
              </FieldContainer>
              <Button disabled={isValid} type='submit' label='제출' size='medium' />
            </Form>
          )}
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
