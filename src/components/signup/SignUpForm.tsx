import { Form as FormikForm, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import globalTheme from "../../style/theme";
import Button from "../common/Button";
import HelperText from "../common/HelperText";
import PageSpinner from "../common/PageSpinner";
import RadioField from "../common/RadioField";
import Text from "../common/Text";

const formWidth = "60rem";
const Input = styled.input<{ width?: string }>`
  border: 2px solid;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  height: fit-content;
  font-size: ${({ theme }) => theme.fonts.body};
  width: ${({ width }) => width};
  /* letter-spacing: 0.5px; */
`;

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

const Select = styled.select`
  border: 2px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  height: fit-content;
  font-size: ${({ theme }) => theme.fonts.body};
  /* letter-spacing: 0.5px; */
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

const DropDown = styled.ul<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  /* transform: translateY(-3px); */
  border: 2px solid black;
  border-top: none;
  width: 100%;
  z-index: 1000;
  background-color: #fff;

  & > li {
    padding: 0 0.5rem;
    &:not(&:last-child) {
      border-bottom: 1px solid black;
    }
    &:focus {
      background-color: rgba(1, 1, 1, 0.3);
      outline: none;
    }
    &:hover {
      background-color: rgba(1, 1, 1, 0.3);
    }
  }
`;

const genders = [
  { value: "male", text: "남자" },
  { value: "female", text: "여자" },
];

interface EmailHost {
  value: string;
  id: number;
  ref: React.RefObject<HTMLLIElement>;
}
const emailHosts: EmailHost[] = [
  { value: "naver.com", id: 1, ref: createRef<HTMLLIElement>() },
  { value: "google.com", id: 2, ref: createRef<HTMLLIElement>() },
  { value: "daum.net", id: 3, ref: createRef<HTMLLIElement>() },
  { value: "hotmail.com", id: 4, ref: createRef<HTMLLIElement>() },
  { value: "kakao.com", id: 5, ref: createRef<HTMLLIElement>() },
];

interface FormValues {
  email: string;
  emailHost: string;
  gender: "male" | "female";
  password: string;
  password2: string;
  yearOfBirth: number | undefined;
}

const initialValues: FormValues = {
  email: "",
  emailHost: "",
  gender: "male",
  yearOfBirth: new Date().getFullYear(),
  password: "",
  password2: "",
};

const getYears = () => {
  const date = new Date();
  const arr = [];
  for (let i = date.getFullYear(); i >= 1920; i -= 1) arr.push(i);
  return arr;
};

const years = getYears();

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredHosts, setFilteredHosts] = useState(emailHosts);
  const [currentLiEl, setCurrentLiEl] = useState<React.RefObject<HTMLLIElement> | null>(null);
  const [showHostLists, setShowHostLists] = useState(false);
  const emailHostInputEl = useRef<HTMLInputElement>(null);

  const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    console.log(formikHelpers);
    alert(values);
  };

  const validate = (values: FormValues) => {
    console.log(values);

    // TODO:
    const errors: FormikErrors<FormValues> = {};
    if (values.email.length > 3) errors.email = "에러발생";
    return errors;
  };

  const handleEmailHostChange =
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setFieldValue("emailHost", value);
      setFilteredHosts(emailHosts.filter((host) => host.value.includes(value)));
    };

  const handleEmailHostBlur = () => {
    setShowHostLists(false);
  };

  const handleEmailHostFocus = () => {
    setShowHostLists(true);
  };

  const handleEmailHostClick =
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) =>
    (e: React.MouseEvent<HTMLLIElement>) => {
      const value = e.currentTarget.textContent;
      setFieldValue("emailHost", value);
      handleEmailHostBlur();
    };

  const handleEmailHostKeyDown = useCallback(
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const hostLength = filteredHosts.length;
        handleEmailHostFocus();
        if (!hostLength) return;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          if (currentLiEl?.current == null) {
            setCurrentLiEl(filteredHosts[0].ref);
          } else {
            for (let i = 0; i < hostLength; i += 1) {
              if (filteredHosts[i].ref === currentLiEl) {
                if (i !== hostLength - 1) setCurrentLiEl(filteredHosts[i + 1].ref);
                // else setCurrentLiEl(filteredHosts[0].ref);
                else {
                  setCurrentLiEl(null);
                  emailHostInputEl.current?.focus();
                }
              }
            }
          }
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          if (currentLiEl?.current == null) {
            setCurrentLiEl(filteredHosts[hostLength - 1].ref);
          } else {
            for (let i = hostLength - 1; i >= 0; i -= 1) {
              if (filteredHosts[i].ref === currentLiEl) {
                if (i !== 0) setCurrentLiEl(filteredHosts[i - 1].ref);
                else {
                  setCurrentLiEl(null);
                  emailHostInputEl.current?.focus();
                }
              }
            }
          }
        } else if (e.key === "Enter" || e.key === "Escape") {
          if (currentLiEl?.current) setFieldValue("emailHost", currentLiEl.current.textContent);
          handleEmailHostBlur();
        }
      },
    [currentLiEl, filteredHosts],
  );

  useEffect(() => {
    if (currentLiEl?.current) currentLiEl.current.focus();
  }, [currentLiEl]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      handleEmailHostBlur();
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [emailHostInputEl.current?.value]);
  return (
    <>
      {isSubmitting ? (
        <PageSpinner />
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {({
            values,
            touched,
            errors,
            isValid,
            handleBlur,
            handleChange,
            setFieldValue,
          }: FormikProps<FormValues>) => (
            <Form onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
              <Text
                bold
                fontSize={globalTheme.fonts.heading}
                text='IDW SignUp'
                margin='0 0 3rem 0'
              />
              {/* 이메일 */}
              <FieldContainer>
                <Text bold fontSize={globalTheme.fonts.strongBody} text='이메일' />
                <Input
                  autoComplete='off'
                  value={values.email}
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  width='15rem'
                  type='text'
                  tabIndex={0}
                />
                <Text margin='0 .5rem' bold fontSize={globalTheme.fonts.strongBody} text='@' />
                {/* TODO:dropdown list 만들기 */}
                <div
                  role='presentation'
                  onKeyDown={handleEmailHostKeyDown(setFieldValue)}
                  style={{ position: "relative" }}
                >
                  <Input
                    ref={emailHostInputEl}
                    autoComplete='off'
                    value={values.emailHost}
                    name='emailHost'
                    onChange={handleEmailHostChange(setFieldValue)}
                    onFocus={handleEmailHostFocus}
                    width='15rem'
                    type='text'
                    tabIndex={0}
                  />
                  <DropDown visible={showHostLists}>
                    {filteredHosts.map((host) => (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <li
                        onClick={handleEmailHostClick(setFieldValue)}
                        onKeyDown={() => {}}
                        ref={host.ref}
                        tabIndex={-1}
                        key={host.id}
                      >
                        {host.value}
                      </li>
                    ))}
                  </DropDown>
                </div>
                <HelperText
                  hasError={Boolean(touched.email && errors.email)}
                  text={(touched.email && (errors.email || "가능한 이메일입니다")) as string}
                />
              </FieldContainer>
              {/* 비밀번호 */}
              <FieldContainer>
                <Text bold fontSize={globalTheme.fonts.strongBody} text='비밀번호' />
                <Input
                  value={values.password}
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  width='15rem'
                  type='password'
                  tabIndex={0}
                />
                <HelperText
                  hasError={Boolean(touched.password && errors.password)}
                  text={
                    (touched.password && (errors.password || "가능한 패스워드입니다")) as string
                  }
                />
              </FieldContainer>
              {/* 비밀번호 확인 */}
              <FieldContainer>
                <Text bold fontSize={globalTheme.fonts.strongBody} text='비밀번호 확인' />
                <Input
                  value={values.password2}
                  name='password2'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  width='15rem'
                  type='password'
                  tabIndex={0}
                />
                <HelperText
                  hasError={Boolean(touched.password2 && errors.password2)}
                  text={
                    (touched.password2 && (errors.password2 || "패스워드가 일치합니다")) as string
                  }
                />
              </FieldContainer>
              {/* 출생연도 */}
              <FieldContainer>
                <Text bold fontSize={globalTheme.fonts.strongBody} text='출생연도' />
                <Select
                  name='yearOfBirth'
                  value={values.yearOfBirth}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {years.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </Select>
              </FieldContainer>
              {/* 성별 */}
              <FieldContainer>
                <Text bold fontSize={globalTheme.fonts.strongBody} text='성별' />
                <RadioFieldContainer>
                  {genders.map((v) => (
                    <RadioField
                      key={v.text}
                      id={v.text}
                      name='gender'
                      checked={values.gender === v.value}
                      onChange={() => setFieldValue("gender", v.value)}
                      value={v.value}
                    />
                  ))}
                </RadioFieldContainer>
              </FieldContainer>
              <Button type='submit' label='제출' size='medium' />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SignUpForm;
