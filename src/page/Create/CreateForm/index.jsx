import React, { useCallback } from "react";
import Template from "./template";

const CreateForm = () => {
  const handleSubmit = useCallback((v) => {
    console.log(v);
  }, []);

  const validate = useCallback((v) => {
    const errors = {
      // title: null,
      // desc: null,
      // category: null,
      // dateOfCreation: null,
      // files: null,
    };

    if (!v.title) {
      errors.title = "제목을 입력해주세요.";
    }
    if (!v.desc) {
      errors.desc = "설명을 적어주세요";
    }
    if (v.files.length < 4) {
      errors.files = "이미지는 최소 4장이상 업로드 해야합니다.";
    } else if (v.files.length > 50) {
      errors.files = "이미지는 최대 50장 까지 업로드 가능합니다.";
    }
    // alert(errors.title || errors.desc || errors.files);
    console.log(errors);

    return errors;
  }, []);
  return <Template handleSubmit={handleSubmit} validate={validate}></Template>;
};

export default CreateForm;
