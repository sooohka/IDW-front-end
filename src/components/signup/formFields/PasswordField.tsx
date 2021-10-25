import { useFormikContext } from "formik";
import React from "react";
import HelperText from "../../common/HelperText";
import Input from "../../common/Input";
import Text from "../../common/Text";

interface IProps {
  name: keyof SignUpFormValues;
}

const PasswordField: React.FC<IProps> = ({ name }) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<SignUpFormValues>();
  return (
    <>
      <Text bold fontSize='strongBody' text='비밀번호' />
      <Input
        value={values[name]}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        width='15rem'
        type='password'
        tabIndex={0}
      />
      <HelperText
        hasError={Boolean(touched[name] && errors[name])}
        text={(touched[name] && (errors[name] || "가능한 패스워드입니다")) as string}
      />
    </>
  );
};

export default PasswordField;
