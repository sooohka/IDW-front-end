import { useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import HelperText from "../../common/HelperText";
import Input from "../../common/Input";
import Text from "../../common/Text";

const emailHosts = [
  { value: "naver.com", label: "naver.com" },
  { value: "google.com", label: "google.com" },
  { value: "daum.net", label: "daum.net" },
  { value: "hotmail.com", label: "hotmail.com" },
  { value: "kakao.com", label: "kakao.com" },
];
const EmailField = () => {
  const { setFieldValue, values, touched, errors, handleChange, handleBlur } =
    useFormikContext<SignUpFormValues>();
  const emailInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputEl.current?.focus();
  }, []);
  return (
    <>
      <Text bold fontSize='strongBody'>
        이메일
      </Text>
      <Input
        ref={emailInputEl}
        autoComplete='off'
        value={values.email}
        name='email'
        onChange={handleChange}
        onBlur={handleBlur}
        width='15rem'
        type='text'
        tabIndex={0}
      />
      <Text margin='0 .5rem' bold fontSize='strongBody'>
        @
      </Text>
      <Input
        autoComplete='off'
        value={values.emailHost}
        name='emailHost'
        onChange={handleChange}
        onBlur={handleBlur}
        width='15rem'
        type='text'
        tabIndex={0}
      />
      <HelperText hasError={Boolean(touched.email && errors.email)}>
        {(touched.email && (errors.email || "가능한 이메일입니다")) as string}
      </HelperText>
    </>
  );
};

export default EmailField;

// TODO: REFACTOR!!!!!!!!!
