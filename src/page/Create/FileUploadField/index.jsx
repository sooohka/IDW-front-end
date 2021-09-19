import { useField } from "formik";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useMount from "../../../utils/hooks/useMount";
import Template from "./template";

const FileUploadField = ({ name, setIsFileUploading, buttonEl }) => {
  const [, , helpers] = useField(name);
  const [files, setFiles] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const { isMount } = useMount();
  const [isFolded, setIsFolded] = useState(true);

  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [buttonEl, isFolded]);

  useEffect(() => {
    console.log(`%c fileUploadField rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  }, []);

  useEffect(() => {
    console.log(`%c state isAccepting in FileUploadField change`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
    console.log(isAccepting);
  }, [isAccepting]);

  useEffect(() => {
    console.log(`%c state files in FileUploadField change`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
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
    if (rejectedFiles.length > 0) console.log(rejectedFiles);
    if (rejectedFiles.length > 0) alert(rejectedFiles[0].errors[0].message);
    const formedAcceptedFiles = acceptedFiles.map((file) => file);
    setFiles((prev) => [...prev, ...formedAcceptedFiles]);
    setIsAccepting(false);
  }, []);

  const onDragEnter = useCallback(() => setIsAccepting(true), []);
  const onDragLeave = useCallback(() => setIsAccepting(false), []);

  const handleSubmittedFiles = useCallback((submittedFile) => {
    setSubmittedFiles((prev) => [...prev, submittedFile]);
  }, []);

  const handleValidation = useCallback(
    (_file) => {
      // if (!_file.type.startsWith("image")) return { message: "jpg,png,gif파일만 업로드하겠습니다." };
      if (files.find((file) => file.name === _file.name)) {
        return { message: "같은 이름의 파일은 업로드불가능합니다." };
      }
      if (files.length > 50) return { message: "파일은 최대 50장 업로드 가능합니다." };

      // TODO: file size validation
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
      handleSubmittedFiles={handleSubmittedFiles}
      handleValidation={handleValidation}
      files={files}
      isAccepting={isAccepting}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
    ></Template>
  );
};
FileUploadField.propTypes = {
  buttonEl: PropTypes.shape({ current: PropTypes.object }).isRequired,
  setIsFileUploading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
FileUploadField.defaultProps = {};

export default FileUploadField;
