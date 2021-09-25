import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";
import PageSpinner from "../../../components/common/PageSpinner";
import Template from "./template";

const CreateForm = () => {
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonEl = useRef(null);
  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    console.log(`%c createform rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });

  const handleSubmit = useCallback(async (v) => {
    console.log(v);
    setIsSubmitting(true);
    try {
      const data = {
        category: v.category, // TODO:카테고리 변경
        desc: v.desc,
        files: v.files,
        title: v.title,
      };
      if (process.env.REACT_APP_ENV === "production") {
        // TODO:데이터 file에 bad 400 800 url모두 보내주자
        const res = await axios.post("worldcups", data);
        alert("업로드 성공!");
        console.log(res);
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    } finally {
      setIsSubmitting(false);
    }
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
    category: 0,
    files: [],
  };

  return (
    <>
      {isSubmitting ? (
        <PageSpinner />
      ) : (
        <Template
          ref={{ buttonEl }}
          setIsFileUploading={setIsFileUploading}
          isFileUploading={isFileUploading}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validate={validate}
        />
      )}
    </>
  );
};
CreateForm.propTypes = {};

export default CreateForm;
