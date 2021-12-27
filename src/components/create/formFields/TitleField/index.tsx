import React, { useEffect, useRef } from "react";
import HelperText from "../../../common/HelperText";
import Input from "../../../common/Input";
import * as S from "./Style";

interface IProps {
  name: keyof CreateFormValues;
  handleBlur: React.FocusEventHandler;
  handleChange: React.ChangeEventHandler;
  value: string;
  error?: string;
  touched?: boolean;
}
const TitleField: React.FC<IProps> = ({
  name,
  handleChange,
  handleBlur,
  value,
  touched,
  error,
}) => {
  const titleEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleEl.current) titleEl.current.focus();
  }, []);

  return (
    <>
      <S.Field>
        <S.FieldTitle>제목</S.FieldTitle>
        <Input
          ref={titleEl}
          tabIndex={0}
          name={name}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </S.Field>
      <HelperText hasError={Boolean(touched && error)}>{(touched && error) as string}</HelperText>
    </>
  );
};

export default TitleField;
