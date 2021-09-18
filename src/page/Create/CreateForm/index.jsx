import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Template from "./template";
import useFetch from "../../../utils/hooks/useFetch";
import PageSpinner from "../../../components/common/PageSpinner";

const CreateForm = ({ categories }) => {
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonEl = useRef(null);

  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    console.log(`%c createform rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });

  const handleSubmit = useCallback((v) => {
    console.log(v);
    setIsSubmitting(true);
    axios
      .post("http://13.125.23.168:8080/worldcups", {
        category: sd, // TODO:카테고리 변경
        desc: v.desc,
        files: v.files,
        title: v.title,
      })
      .then((res) => {
        setIsSubmitting(false);
        alert("업로드 성공!");
        console.log(res);
      });
  }, []);

  const validate = useCallback((v) => {
    const errors = {};
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

  const initialValues = {
    title: "",
    desc: "",
    category: "연예인",
    files: [],
  };

  return (
    <>
      {isSubmitting ? (
        <PageSpinner></PageSpinner>
      ) : (
        <Template
          ref={{ buttonEl }}
          setIsFileUploading={setIsFileUploading}
          isFileUploading={isFileUploading}
          initialValues={initialValues}
          categories={categories}
          handleSubmit={handleSubmit}
          validate={validate}
        ></Template>
      )}
    </>
  );
};
CreateForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })).isRequired,
};

export default CreateForm;
