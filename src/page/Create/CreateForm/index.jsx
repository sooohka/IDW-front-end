import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import Template from "./template";

const CreateForm = () => {
  const [isImgUploading, setIsImgUploading] = useState(false);
  const {} = useFormik();
  useEffect(() => {
    console.log(`%c createform rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });

  const handleSubmit = useCallback((v) => {
    console.log(v);
  }, []);

  const handleCategoryChange = useCallback(
    (e) => (v) => {
      setFieldValue("category", v.name);
    },
    []
  );

  const handleFilesChange = useCallback((e) => {}, []);

  const validate = useCallback((v) => {
    const errors = {};
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

  const categories = [
    { name: "연예인", id: 1 },
    { name: "음식", id: 2 },
    { name: "음식1", id: 3 },
    { name: "음식2", id: 4 },
    { name: "음식3", id: 5 },
    { name: "음식4", id: 6 },
    { name: "음식5", id: 7 },
  ];

  const initialValue = {
    title: "",
    desc: "",
    category: "연예인",
    files: [],
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      <Template
        handleCategoryChange={handleCategoryChange}
        handleFilesChange={handleFilesChange}
        handleImgUploading={setIsImgUploading}
        initialValues={initialValue}
        categories={categories}
        handleSubmit={handleSubmit}
        validate={validate}
      ></Template>
    </Formik>
  );
};

export default CreateForm;
