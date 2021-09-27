import axios from "axios";
import { useField } from "formik";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useMount from "../../../utils/hooks/useMount";
import Template from "./template";

const FileUploadField = ({ formikName, setIsFileUploading, buttonEl }) => {
  const [, , helpers] = useField(formikName);
  const [files, setFiles] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const { isMount } = useMount();
  const [isFolded, setIsFolded] = useState(true);

  const handleUpload = useCallback(async (file, setProgress) => {
    const { lastModified, lastModifiedDate, name, path, size, type } = file;

    try {
      const fileDataUri = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => res(reader.result);
        reader.onabort = (e) => rej(e);
      });
      const request = { file: { name: file.name, contentType: file.type, dataUri: fileDataUri } };
      if (process.env.REACT_APP_ENV === "local") {
        alert("env=local입니다.");
        return { hasError: false, message: "env=local", file: { name, lastModified, lastModifiedDate, path, size, type }, url: "" };
      }
      const response = await axios.post("https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1", request, {
        onUploadProgress: (prog) => setProgress(Math.round(prog.loaded * 100) / prog.total),
      });

      const {
        message,
        result: { url, ContentType, bucketUrl, locations },
      } = response.data;
      // 요청을 1초에 하나씩 들어갈 수 있도록
      setSubmittedFiles((prev) => [...prev, { name, url }]);
      return {
        hasError: false,
        message: message || "submitted",
        file: { name, lastModified, lastModifiedDate, path, size, type },
        url: `${bucketUrl}${locations.small}`,
      };
    } catch (err) {
      console.error(err.message);
      // TODO: fileUploadWithProgress error handling
      const message = err.response?.data?.error?.message || err.message || "something went wrong😅 ";
      return { hasError: true, message, file: { name, lastModified, lastModifiedDate, path, size, type } };
    }
  }, []);

  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [buttonEl, isFolded]);

  useEffect(() => {
    setIsFileUploading(true);
  }, [files, setIsFileUploading]);

  useEffect(() => {
    if (isMount) return;
    console.log(`%c state submittedFiles in FileUploadField changed`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
    if (submittedFiles.length === files.length) setIsFileUploading(false);
    else helpers.setError("파일이 업로드중입니다.");
    helpers.setValue(submittedFiles, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedFiles]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // TODO: 에러메시지 개선
    if (rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      const rejected = rejectedFiles.map((v) => ({ name: v.file.name, errors: v.errors[0].message }));
      alert(JSON.stringify({ rejectedFiles: rejected }, null, 2));
    }
    const formedAcceptedFiles = acceptedFiles.map((file) => file);
    setFiles((prev) => [...prev, ...formedAcceptedFiles]);
    setIsAccepting(false);
  }, []);

  const onDragEnter = useCallback(() => setIsAccepting(true), []);
  const onDragLeave = useCallback(() => setIsAccepting(false), []);

  const handleValidation = useCallback(
    (_file) => {
      if (files.find((file) => file.name === _file.name && file.lastModified === _file.lastModified)) return { message: "같은 파일은 업로드불가능합니다." };
      if (_file.size >= 5000000) return { message: "파일은 최대 4.9MB까지 업로드 가능합니다." };
      if (files.length > 50) return { message: "파일은 최대 50장 업로드 가능합니다." };

      return null;
    },
    [files]
  );

  const handleDelete = useCallback(
    (fileName) => () => {
      setFiles((prev) => prev.filter((file) => file.name !== fileName));
      setSubmittedFiles((prev) => prev.filter((file) => file.name !== fileName));
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 50,
    onDrop,
    onDragEnter,
    onDragLeave,
    validator: handleValidation,
  });

  return (
    <Template
      isFolded={isFolded}
      setIsFolded={setIsFolded}
      handleDelete={handleDelete}
      handleUpload={handleUpload}
      files={files}
      isAccepting={isAccepting}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
    />
  );
};
FileUploadField.propTypes = {
  buttonEl: PropTypes.shape({ current: PropTypes.object }).isRequired,
  setIsFileUploading: PropTypes.func.isRequired,
  formikName: PropTypes.string.isRequired,
};
FileUploadField.defaultProps = {};

export default FileUploadField;
