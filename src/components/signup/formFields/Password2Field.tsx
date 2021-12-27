import { useFormikContext } from "formik";
import React from "react";
import HelperText from "../../common/HelperText";
import Input from "../../common/Input";
import Text from "../../common/Text";

interface IProps {
  name: keyof SignUpFormValues;
}

const Password2Field: React.FC<IProps> = ({ name }) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<SignUpFormValues>();
  return (
    <>
      <Text bold fontSize='strongBody'>
        비밀번호 확인
      </Text>
      <Input
        value={values[name]}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        width='15rem'
        type='password'
        tabIndex={0}
      />
      <HelperText hasError={Boolean(touched[name] && errors[name])}>
        {(touched[name] && (errors[name] || "패스워드가 일치합니다")) as string}
      </HelperText>
    </>
  );
};

export default Password2Field;
